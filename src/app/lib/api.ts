// src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export type Todo = {
  id: string;
  content: string;
  completed: boolean;
  createdAt: string;  // ISO 字符串（前端转 Date）
};

// 获取所有待办
export async function getTodos(): Promise<Todo[]> {
  try {
    const res = await fetch(`${API_URL}/todos`);
    if (!res.ok) throw new Error('获取待办失败');
    return res.json();
  } catch (error) {
    console.error('getTodos 错误:', error);
    throw error;  // 上层组件捕获处理
  }
}

// 创建待办
export async function createTodo(content: string): Promise<Todo> {
  if (!content.trim()) throw new Error('待办内容不能为空');
  try {
    const res = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) throw new Error('创建待办失败');
    return res.json();
  } catch (error) {
    console.error('createTodo 错误:', error);
    throw error;
  }
}

// 更新待办状态
export async function toggleTodo(id: string, completed: boolean): Promise<Todo> {
  try {
    const res = await fetch(`${API_URL}/todos`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed }),
    });
    if (!res.ok) throw new Error('更新待办失败');
    return res.json();
  } catch (error) {
    console.error('toggleTodo 错误:', error);
    throw error;
  }
}

// 删除待办（软删除可选，这里直接物理删除）
export async function deleteTodo(id: string): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/todos`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error('删除待办失败');
  } catch (error) {
    console.error('deleteTodo 错误:', error);
    throw error;
  }
}