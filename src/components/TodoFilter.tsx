import { ChangeEvent } from "react";
import { TodoFilter as TodoFilterType, TodoPriority, TodoStatus } from "../types/TodoTypes";
import { FILTER_OPTIONS, PRIORITY_LABELS } from "../constants/TodoConstants";
interface TodoFilterProps {
    filter: TodoFilterType;
    onFilterChange: (filter: TodoFilterType) => void;
    stats: {
        total: number;
        active: number;
        completed: number;
    };
    onClearCompleted: () => void;
}

const TodoFilter = ({ filter, onFilterChange, stats, onClearCompleted }: TodoFilterProps) => {
    const handleStatusChange = (status: TodoStatus) => {
        onFilterChange({ ...filter, status });
    };

    const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        onFilterChange({
            ...filter,
            priority: value ? (value as TodoPriority) : undefined,
        });
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        onFilterChange({
            ...filter,
            searchQuery: e.target.value || undefined,
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="space-y-4">
                {/* 통계 */}
                <div className="flex gap-4 text-sm">
                    <span className="text-gray-600">
                        전체: <span className="font-semibold text-gray-800">{stats.total}</span>
                    </span>
                    <span className="text-gray-600">
                        진행중: <span className="font-semibold text-blue-600">{stats.active}</span>
                    </span>
                    <span className="text-gray-600">
                        완료:{" "}
                        <span className="font-semibold text-green-600">{stats.completed}</span>
                    </span>
                </div>

                {/* 검색 */}
                <div>
                    <input
                        type="text"
                        value={filter.searchQuery || ""}
                        onChange={handleSearchChange}
                        placeholder="검색어를 입력하세요..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                </div>

                {/* 필터 버튼들 */}
                <div className="flex flex-wrap gap-2">
                    {FILTER_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleStatusChange(option.value)}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                filter.status === option.value
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                {/* 우선순위 필터 */}
                <div className="flex items-center gap-3">
                    <label htmlFor="priority-filter" className="text-sm font-medium text-gray-700">
                        우선순위:
                    </label>
                    <select
                        id="priority-filter"
                        value={filter.priority || ""}
                        onChange={handlePriorityChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    >
                        <option value="">전체</option>
                        {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 완료된 항목 삭제 */}
                {stats.completed > 0 && (
                    <button
                        onClick={onClearCompleted}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
                    >
                        완료된 항목 삭제 ({stats.completed})
                    </button>
                )}
            </div>
        </div>
    );
};

export default TodoFilter;
