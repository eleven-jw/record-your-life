'use server'
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { API_BASE_URL } from './env';

const TodoSchema = z.object({
    id: z.string(),
    content: z.string().min(2).max(100, {
        message: '待办内容长度应在2到100个字符之间',
    }),
    completed: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string()
});

const AddTodoItem = TodoSchema.omit({id: true, completed: true, createdAt: true, updatedAt: true});

export type Todo = z.infer<typeof TodoSchema>;

export type State = {
    errors?: {
        content?: string[];
    };
      message?: string | null;
}

const url = `${API_BASE_URL}/api/todos`;
console.log('API URL:', url);

export async function addTodoItem(preState: State | undefined, formData: FormData): Promise<State | undefined> {
    console.log('preState', preState);
    console.log('formData', formData);
    const parsed = AddTodoItem.safeParse({
        content: formData.get('todo')
    });
    console.log('Parsed Result:', parsed);
    if (!parsed.success) {
        return {
          errors: parsed.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Todo.',
      };
    }
    const { content } = parsed.data;
    console.log('Validated Content:', content);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        });

        if (!response.ok) throw new Error('添加失败');

        revalidatePath('/todos');

        return {
            errors: {},
            message: '待办添加成功',
        };
    } catch (error) {
        console.error('添加待办失败:', error);
        return {
            errors: { content: ['添加失败，请重试'] },
            message: '添加失败',
        };
    }
}

// deleteTodoItem, toggleTodoItem can be added similarly
export async function deleteTodoItem(id: string) {
    await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ id })

    })
    revalidatePath('/todos')
}   
export async function toggleTodoItem(id: string, completed: boolean) {
    await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed })
    })
    revalidatePath('/todos')
}

export async function getTodoItems() {
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json()
}

export async function updateTodoItem(id: string, updates: Partial<Todo>) {
    await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
    })
    revalidatePath('/todos')
}
