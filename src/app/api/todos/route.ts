import { PrismaClient } from '@/generated/prisma' 
const prisma = new PrismaClient()

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return Response.json(todos)
  } catch (error) {
    return Response.json({ error: '获取待办失败' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const requestData = await request.json()
    console.log('requestData', requestData);
    const { content } = requestData;
    console.log('content', content);
    if (!content) {
      return Response.json({ error: '内容不能为空' }, { status: 400 })
    }

    const todo = await prisma.todo.create({
      data: {
        content: content,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    return Response.json(todo, { status: 201 })
  } catch (error) {
    return Response.json({ error: '创建待办失败' }, { status: 500 })
  }
}
// 添加 PUT 方法
export async function PUT(request: Request) {
  try {
    const { id, completed } = await request.json()
    const todo = await prisma.todo.update({
      where: { id },
      data: { completed }
    })
    return Response.json(todo)
  } catch (error) {
    return Response.json({ error: '更新待办失败' }, { status: 500 })
  }
}
// 添加 DELETE 方法
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await prisma.todo.delete({
      where: { id }
    })
    return Response.json({ message: '删除成功' })
  } catch (error) {
    return Response.json({ error: '删除待办失败' }, { status: 500 })
  }
}