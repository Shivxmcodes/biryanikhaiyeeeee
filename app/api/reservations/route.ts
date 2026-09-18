import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      include: { table: true },
      orderBy: { date: 'asc' }
    })
    return NextResponse.json(reservations)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customer, date, guests, tableId } = body

    const reservation = await prisma.reservation.create({
      data: {
        customer,
        date: new Date(date),
        guests: parseInt(guests),
        tableId
      },
      include: { table: true }
    })
    return NextResponse.json(reservation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 })
  }
}
