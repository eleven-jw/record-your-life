'use client';
import type { Todo } from "../lib/actions"
import { toggleTodoItem, deleteTodoItem } from "../lib/actions"

export default function TodoList({todos}: {todos: Todo[]}) {

  const toggleComplete = async (id: string, completed: boolean) => {
    await toggleTodoItem(id, !completed);
  };

  const deleteTodo = async (id: string) => {
    await deleteTodoItem(id);
  };
  if (todos.length === 0) {
    return (
        <p className="text-lg">No todos now，Press the Add button!</p>
    );
  }
  return (
    <div className="space-y-2 mt-4">
          {todos.map(todo => (
            <div
              key={todo.id}
              className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm ${
                todo.completed ? 'bg-green-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id, todo.completed)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span
                  className={`${
                    todo.completed ? 'text-gray-400 line-through' : 'text-gray-900'
                  }`}
                >
                  {todo.content}
                </span>
              </div>
              <small className="text-gray-500">
                {new Date(todo.createdAt).toLocaleDateString()}
              </small>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
  );
}