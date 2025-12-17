import { LOCAL_STORAGE_KEY } from "../constants/TodoConstants";
import { StoredTodo, Todo } from "../types/TodoTypes";

//로컬 스토리지에서 todo 가져오기
export const getTodosFromStorage = (): Todo[] => {
    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!stored) return [];

        const parsed: StoredTodo[] = JSON.parse(stored);
        //Date 객체로 변환
        return parsed.map((todo) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
            updatedAt: new Date(todo.updatedAt),
        }));
    } catch (error) {
        console.log("스토리지에서 todo 가져오기 실패", error);
        return [];
    }
};

//로컬 스토리지에 todo 저장하기
export const saveTodosToStorage = (todos: Todo[]) => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
        console.log("스토리지에 todo 저장 실패", error);
    }
};
