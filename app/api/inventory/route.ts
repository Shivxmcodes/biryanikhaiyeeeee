import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()

async function seedInventoryIfNeeded() {
  const count = await prisma.inventory.count();
  if (count < 6) { // Make sure we have a good amount of items
    const newItems = [
      { item: 'Basmati Rice', quantity: 50, unit: 'kg', minLevel: 10 },
      { item: 'Chicken', quantity: 20, unit: 'kg', minLevel: 15 },
      { item: 'Saffron', quantity: 5, unit: 'g', minLevel: 10 },
      { item: 'Onions', quantity: 30, unit: 'kg', minLevel: 10 },
      { item: 'Tomatoes', quantity: 25, unit: 'kg', minLevel: 8 },
      { item: 'Ghee', quantity: 12, unit: 'L', minLevel: 5 },
      { item: 'Garlic Paste', quantity: 8, unit: 'kg', minLevel: 3 },
    ];
    
    for (const item of newItems) {
      const exists = await prisma.inventory.findFirst({ where: { item: item.item } });
      if (!exists) {
        await prisma.inventory.create({ data: item });
      }
    }
  }
}

export async function GET() {
  try {
    await seedInventoryIfNeeded();
    const inventory = await prisma.inventory.findMany({
      orderBy: { item: 'asc' }
    })
    return NextResponse.json(inventory)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { item, quantity, unit, minLevel } = body
    
    if (!item || quantity === undefined || !unit || minLevel === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newItem = await prisma.inventory.create({
      data: {
        item,
        quantity: parseInt(quantity) || 0,
        unit,
        minLevel: parseInt(minLevel) || 0,
      }
    })
    
    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create inventory item" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 })
    }

    await prisma.inventory.delete({
      where: { id: id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to delete inventory item" }, { status: 500 })
  }
}
