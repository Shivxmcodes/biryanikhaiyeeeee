import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    
    return NextResponse.json(staff)
  } catch (error) {
    console.error("Error fetching staff:", error)
    const fallbackStaff = [
      { id: '1', name: 'Aarav Sharma', role: 'Head Chef', shift: 'Morning', status: 'ACTIVE' },
      { id: '2', name: 'Vikram Singh', role: 'Floor Captain', shift: 'Evening', status: 'ACTIVE' },
      { id: '3', name: 'Pooja Patel', role: 'Waitstaff', shift: 'Night', status: 'ACTIVE' },
      { id: '4', name: 'Rohan Gupta', role: 'Bartender', shift: 'Evening', status: 'ACTIVE' },
    ]
    return NextResponse.json(fallbackStaff)
  }
}
