import "./App.css";
import TodoFilter from "./components/TodoFilter";
import TodoForm from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

function App() {
    const {
        todos,
        filter,
        setFilter,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        clearCompleted,
        stats,
    } = useTodos();
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* 헤더 */}
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo List</h1>
                    <p className="text-gray-600">
                        타입스크립트, tailwind를 활용한 투두리스트 만들기
                    </p>
                </header>

                {/* 할 일 추가 폼 */}
                <TodoForm onSubmit={addTodo} />

                {/* 필터 및 통계 */}
                <TodoFilter
                    filter={filter}
                    onFilterChange={setFilter}
                    stats={stats}
                    onClearCompleted={clearCompleted}
                />

                {/* 할 일 목록 */}
                <TodoList
                    todos={todos}
                    onToggle={toggleTodo}
                    onUpdate={updateTodo}
                    onDelete={deleteTodo}
                />
            </div>
        </div>
    );
}

export default App;
