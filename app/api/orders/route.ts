import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Use a global variable to avoid multiple instances in development
const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        table: true,
        waiter: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tableId, waiterId, status } = body
    
    // Auto-generate order ID for simplicity (e.g., #1043)
    const orderCount = await prisma.order.count()
    const nextOrderId = `#${1000 + orderCount + 1}`

    const newOrder = await prisma.order.create({
      data: {
        orderId: nextOrderId,
        tableId,
        waiterId,
        status: status || 'PENDING',
        elapsed: '0 min'
      },
      include: {
        table: true,
        waiter: true,
      }
    })
    
    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}
