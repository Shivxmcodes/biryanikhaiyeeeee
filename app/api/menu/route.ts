import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()

export async function GET() {
  try {
    const menu = await prisma.menuItem.findMany({
      orderBy: { category: 'asc' }
    })
    return NextResponse.json(menu)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 })
  }
}
