import { useCallback, useEffect, useState } from "react";
import {
    CreateTodoInput,
    Todo,
    TodoFilter,
    TodoStatus,
    UpdatedTodoInput,
} from "../types/TodoTypes";
import { getTodosFromStorage, saveTodosToStorage } from "../utils/StorageUtils";
import { filterTodos, generateId } from "../utils/TodoUtils";

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<TodoFilter>({ status: TodoStatus.ALL });

    //초기 로드
    useEffect(() => {
        const storedTodos = getTodosFromStorage();
        setTodos(storedTodos);
    }, []);

    //todo 변경 시 저장
    useEffect(() => {
        saveTodosToStorage(todos);
    }, [todos]);

    //todo 추가
    const addTodo = useCallback((input: CreateTodoInput) => {
        const newTodo: Todo = {
            id: generateId(),
            ...input,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setTodos((prev) => [newTodo, ...prev]);
    }, []);

    //todo 수정
    const updateTodo = useCallback((id: string, input: UpdatedTodoInput) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, ...input, updatedAt: new Date() } : todo
            )
        );
    }, []);

    //todo 삭제
    const deleteTodo = useCallback((id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }, []);

    //todo 완료 토글
    const toggleTodo = useCallback((id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
                    : todo
            )
        );
    }, []);

    //완료된 todo 모두 삭제
    const clearCompleted = useCallback(() => {
        setTodos((prev) => prev.filter((todo) => !todo.completed));
    }, []);

    //필터링된 todos
    const filteredTodos = filterTodos(todos, filter);

    //통계
    const stats = {
        total: todos.length,
        active: todos.filter((todo) => !todo.completed).length,
        completed: todos.filter((todo) => todo.completed).length,
    };

    return {
        todos: filteredTodos,
        filter,
        setFilter,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        clearCompleted,
        stats,
    };
};
