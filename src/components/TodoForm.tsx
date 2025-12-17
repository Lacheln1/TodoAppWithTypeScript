import { ChangeEvent, FormEvent, useState } from "react";
import { CreateTodoInput, TodoPriority } from "../types/TodoTypes";
import { PRIORITY_LABELS } from "../constants/TodoConstants";

interface TodoFormProps {
    onSubmit: (todo: CreateTodoInput) => void;
}

const TodoForm = ({ onSubmit }: TodoFormProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<TodoPriority>(TodoPriority.MEDIUM);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim()) return;

        const newTodo: CreateTodoInput = {
            title: title.trim(),
            description: description.trim() || undefined,
            completed: false,
            priority,
        };

        onSubmit(newTodo);

        //폼 초기화
        setTitle("");
        setDescription("");
        setPriority(TodoPriority.MEDIUM);
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value as TodoPriority);
    };
    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        할 일 제목
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="할 일을 입력하세요"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue500 focus:border-transparent outline-none transition"
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        설명 (선택)
                    </label>
                    <textarea
                        name=""
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="상세 설명을 입력하세요"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                    ></textarea>
                </div>
                <div>
                    <label
                        htmlFor="priority"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        우선순위
                    </label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={handlePriorityChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    >
                        {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={!title.trim()}
                >
                    추가하기
                </button>
            </div>
        </form>
    );
};

export default TodoForm;
