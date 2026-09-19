import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Dummy data seeding function
async function seedDummyReviewsIfNeeded() {
  const count = await prisma.review.count();
  if (count === 0) {
    await prisma.review.createMany({
      data: [
        { customerName: 'Aarav Sharma', rating: 5, comment: 'The best Biryani I have had in town! Highly recommend the Special Chicken Biryani.' },
        { customerName: 'Priya Patel', rating: 4, comment: 'Great atmosphere and excellent service. Food was delicious but slightly spicy for my taste.' },
        { customerName: 'Rahul Verma', rating: 5, comment: 'Absolutely phenomenal. The flavors are authentic and the staff is very welcoming.' },
      ]
    });
  }
}

export async function GET() {
  try {
    await seedDummyReviewsIfNeeded();

    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json(reviews)
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customerName, rating, comment } = body
    
    if (rating === undefined || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const newReview = await prisma.review.create({
      data: {
        customerName: customerName || 'Anonymous',
        rating,
        comment,
      }
    })
    
    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    )
  }
}
