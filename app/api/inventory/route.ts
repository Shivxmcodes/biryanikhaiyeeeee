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
