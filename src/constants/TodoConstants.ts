import { TodoPriority, TodoStatus } from "../types/TodoTypes";

//로컬 스토리지 키
export const LOCAL_STORAGE_KEY = "todos";

//우선순위 라벨
export const PRIORITY_LABELS: Record<TodoPriority, string> = {
    [TodoPriority.LOW]: "낮음",
    [TodoPriority.MEDIUM]: "보통",
    [TodoPriority.HIGH]: "높음",
};

//우선순위 색상
export const PRIORITY_COLORS: Record<TodoPriority, string> = {
    [TodoPriority.LOW]: "bg-green-100 text-green-800",
    [TodoPriority.MEDIUM]: "bg-yellow-100 text-yellow-800",
    [TodoPriority.HIGH]: "bg-red-100 text-red-800",
};

//필터 옵션
export const FILTER_OPTIONS = [
    { value: TodoStatus.ALL, label: "전체" },
    { value: TodoStatus.ACTIVE, label: "진행중" },
    { value: TodoStatus.COMPLETED, label: "완료" },
];
