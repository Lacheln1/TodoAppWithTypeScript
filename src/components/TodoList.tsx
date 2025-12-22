import { Todo, UpdatedTodoInput } from "../types/TodoTypes";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onUpdate: (id: string, input: UpdatedTodoInput) => void;
    onDelete: (id: string) => void;
}

export const TodoList = ({ todos, onToggle, onUpdate, onDelete }: TodoListProps) => {
    if (todos.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-gray-400 mb-2">
                    <svg
                        className="w-16 h-16 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                    </svg>
                </div>
                <p className="text-gray-500 text-lg font-medium">할 일이 없습니다</p>
                <p className="text-gray-400 text-sm mt-1">새로운 할 일을 추가해보세요!</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};
