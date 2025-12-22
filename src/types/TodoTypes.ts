//todo 아이템의 상태를 나타내는 enum
export enum TodoStatus {
    ALL = "all",
    ACTIVE = "active",
    COMPLETED = "completed",
}

//todo 아이템의 우선 순위
export enum TodoPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}

//todo 아이템 인터페이스
export interface Todo {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority: TodoPriority;
    createdAt: Date;
    updatedAt: Date;
}

//로컬스토리지에서 가져올 저장된 todo
export interface StoredTodo {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority: TodoPriority;
    createdAt: string;
    updatedAt: string;
}

//todo 생성 시 필요한 데이터(id, 날짜 제외)
export type CreateTodoInput = Omit<Todo, "id" | "createdAt" | "updatedAt">;

//todo 수정 시 필요한 데이터(부분 업데이트 가능)
export type UpdateTodoInput = Partial<Omit<Todo, "id" | "createdAt">>;

//필터 관련 타입
export interface TodoFilter {
    status: TodoStatus;
    priority?: TodoPriority;
    searchQuery?: string;
}
