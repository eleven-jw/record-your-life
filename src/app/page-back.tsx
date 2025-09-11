'use client'

import { useState, useEffect } from 'react'

type Todo = {
  id: string
  content: string
  completed: boolean
  createdAt: Date
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoContent, setNewTodoContent] = useState('')

  // 加载待办列表
  const loadTodos = async () => {
    const res = await fetch('/api/todos')
    const data = await res.json()
    setTodos(data)
  }

  useEffect(() => {
    loadTodos()
  }, [])

  // 添加待办
  const addTodo = async () => {
    if (!newTodoContent.trim()) return
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newTodoContent })
    })
    const newTodo = await res.json()
    setTodos(prev => [newTodo, ...prev])
    setNewTodoContent('')
  }

  // 切换完成状态
  const toggleComplete = async (id: string, currentCompleted: boolean) => {
    const res = await fetch('/api/todos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed: !currentCompleted })
    })
    const updatedTodo = await res.json()
    setTodos(prev => prev.map(todo => 
      todo.id === id ? updatedTodo : todo
    ))
  }

  // 删除待办
  const deleteTodo = async (id: string) => {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Todo List</h1>

        {/* 输入框 */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={newTodoContent}
            onChange={(e) => setNewTodoContent(e.target.value)}
            placeholder="输入新待办..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            添加
          </button>
        </div>

        {/* 待办列表 */}
        <div className="space-y-2">
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
      </div>
    </div>
  )
}