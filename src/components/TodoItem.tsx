import { ChangeEvent, useState } from "react";
import { Todo, TodoPriority, UpdateTodoInput } from "../types/TodoTypes";
import { PRIORITY_COLORS, PRIORITY_LABELS } from "../constants/TodoConstants";
import { formatDate } from "../utils/TodoUtils";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onUpdate: (id: string, input: UpdateTodoInput) => void;
    onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescription, setEditDescription] = useState(todo.description || "");
    const [editPriority, setEditPriority] = useState(todo.priority);

    const handleSave = () => {
        if (!editTitle.trim()) return;

        onUpdate(todo.id, {
            title: editTitle.trim(),
            description: editDescription.trim() || undefined,
            priority: editPriority,
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(todo.title);
        setEditDescription(todo.description || "");
        setEditPriority(todo.priority);
        setIsEditing(false);
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditTitle(e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEditDescription(e.target.value);
    };

    const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setEditPriority(e.target.value as TodoPriority);
    };

    if (isEditing) {
        return (
            <div className="bg-white rounded-lg shadow-md p-4 border-2 border-blue-500">
                <div className="space-y-3">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={handleTitleChange}
                        className="w-fulll px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <textarea
                        name=""
                        id=""
                        value={editDescription}
                        onChange={handleDescriptionChange}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 founded  focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    />
                    <select name="" id="" value={editPriority} onChange={handlePriorityChange}>
                        {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                            <option value={value} key={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
                        >
                            저장
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded transition"
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-lg ${
                todo.completed ? "opacity-60" : ""
            }`}
        >
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="mt-1 w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3
                            className={`text-lg font-semibold ${
                                todo.completed ? "line-through text-gray-500" : "text-gray-800"
                            }`}
                        >
                            {todo.title}
                        </h3>
                        <span
                            className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                                PRIORITY_COLORS[todo.priority]
                            }`}
                        >
                            {PRIORITY_LABELS[todo.priority]}
                        </span>
                    </div>

                    {todo.description && (
                        <p
                            className={`text-sm mb-2 ${
                                todo.completed ? "line-through text-gray-400" : "text-gray-600"
                            }`}
                        >
                            {todo.description}
                        </p>
                    )}

                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{formatDate(todo.createdAt)}</span>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-sm text-blue-500 hover:text-blue-700 font-medium transition"
                                disabled={todo.completed}
                            >
                                수정
                            </button>
                            <button
                                onClick={() => onDelete(todo.id)}
                                className="text-sm text-red-500 hover:text-red-700 font-medium transition"
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
