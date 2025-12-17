import { Todo, TodoFilter, TodoStatus } from "../types/TodoTypes";

//id 생성 함수
export const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

//todo 필터링 함수
export const filterTodos = (todos: Todo[], filter: TodoFilter): Todo[] => {
    return todos.filter((todo) => {
        //상태 필터
        const statusMatch =
            filter.status === TodoStatus.ALL ||
            (filter.status === TodoStatus.ACTIVE && !todo.completed) ||
            (filter.status === TodoStatus.COMPLETED && todo.completed);

        //우선순위 필터
        const priorityMatch = !filter.priority || todo.priority === filter.priority;

        //검색어 필터
        const searchMatch =
            !filter.searchQuery ||
            todo.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
            todo.description?.toLowerCase().includes(filter.searchQuery.toLowerCase());

        return statusMatch && priorityMatch && searchMatch;
    });
};

//날짜 포맷팅 함수
export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};
