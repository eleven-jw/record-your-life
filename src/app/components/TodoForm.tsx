'use client'
import { addTodoItem, State} from "../lib/actions"
import { useActionState } from "react"
export default function TodoForm() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(addTodoItem, initialState)

    return (
        <form action={formAction}>
            <div className="mb-4">
                <input
                    id="todo"
                    name="todo"
                    type="text"
                    placeholder="输入待办内容"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    aria-describedby="todo-error"
                />
                {state?.errors?.content && (
                    <p className="text-red-500 text-xs italic" id="todo-error">
                        {state.errors?.content}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                添加
            </button>
        </form>
    )
}