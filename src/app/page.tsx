import TodoForm from "../app/components/TodoForm";
import TodoList from "@/app/components/TodoList";
import { Suspense } from "react";
import { getTodoItems } from "./lib/actions";

export default async function Home() {

  const todos =  await getTodoItems();
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
            Todo List
          </h1>

        <TodoForm />
        {/* <Suspense fallback={<div>Loading...</div>}> */}
          <TodoList todos={todos} />
        {/* </Suspense> */}
      </div>
    </div>
  )
}