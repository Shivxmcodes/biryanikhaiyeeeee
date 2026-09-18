import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    
    const { quantity } = body
    
    if (quantity === undefined) {
      return NextResponse.json({ error: "Quantity is required" }, { status: 400 })
    }

    const item = await prisma.inventory.findUnique({ where: { id } })
    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 })

    const status = quantity <= item.minLevel ? "LOW STOCK" : "OK"

    const updatedItem = await prisma.inventory.update({
      where: { id },
      data: { quantity: parseInt(quantity), status }
    })
    
    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error("Error updating inventory:", error)
    return NextResponse.json({ error: "Failed to update inventory" }, { status: 500 })
  }
}
