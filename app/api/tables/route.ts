import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

async function seedTablesIfNeeded() {
  const count = await prisma.table.count();
  if (count < 10) {
    const defaultTables = Array.from({ length: 12 }, (_, i) => ({
      number: `T-${i + 1}`,
      capacity: [2, 4, 6, 8][Math.floor(Math.random() * 4)],
      status: ["AVAILABLE", "OCCUPIED", "RESERVED"][Math.floor(Math.random() * 3)] as any
    }));
    
    for (const t of defaultTables) {
      const exists = await prisma.table.findUnique({ where: { number: t.number } });
      if (!exists) {
        await prisma.table.create({ data: t });
      }
    }
  }
}

export async function GET() {
  try {
    await seedTablesIfNeeded();
    const tables = await prisma.table.findMany({
      orderBy: {
        number: 'asc',
      },
    })
    
    return NextResponse.json(tables)
  } catch (error) {
    console.error("Error fetching tables:", error)
    return NextResponse.json(
      { error: "Failed to fetch tables" },
      { status: 500 }
    )
  }
}
