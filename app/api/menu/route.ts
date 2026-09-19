import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()

async function seedMenuItemsIfNeeded() {
  const count = await prisma.menuItem.count();
  if (count < 5) { // Assuming if there are less than 5 items, we need to seed
    const newItems = [
      { name: 'Chilli Chicken', category: 'Starters', price: 250, available: true },
      { name: 'Diet Coke', category: 'Drinks', price: 60, available: true },
      { name: 'Sprite', category: 'Drinks', price: 50, available: true },
      { name: 'Vanilla Ice Cream', category: 'Dessert', price: 90, available: true },
      { name: 'Chocolate Brownie Sundae', category: 'Dessert', price: 180, available: true },
      { name: 'Strawberry Scoop', category: 'Dessert', price: 95, available: true },
      { name: 'Butterscotch Delight', category: 'Dessert', price: 110, available: true },
      { name: 'Hyderabadi Dum Biryani', category: 'Main Course', price: 450, available: true },
      { name: 'Butter Chicken', category: 'Main Course', price: 380, available: true },
      { name: 'Gulab Jamun & Kulfi', category: 'Dessert', price: 150, available: true },
    ];
    
    for (const item of newItems) {
      await prisma.menuItem.upsert({
        where: { id: item.name }, // using name as id is hacky, but prisma needs unique. Wait, name is not unique in schema?
        // Let's just create them if they don't exist by finding first
        create: undefined, update: undefined
      });
    }
  }
}

// better seeding logic:
async function seedMissingItems() {
  const itemsToEnsure = [
    { name: 'Chilli Chicken', category: 'Starters', price: 250 },
    { name: 'Tandoori Chicken', category: 'Starters', price: 320 },
    { name: 'Paneer Tikka', category: 'Starters', price: 220 },
    { name: 'Crispy Corn', category: 'Starters', price: 180 },
    { name: 'Diet Coke', category: 'Drinks', price: 60 },
    { name: 'Sprite', category: 'Drinks', price: 50 },
    { name: 'Vanilla Ice Cream', category: 'Dessert', price: 90 },
    { name: 'Chocolate Brownie Sundae', category: 'Dessert', price: 180 },
    { name: 'Strawberry Scoop', category: 'Dessert', price: 95 },
    { name: 'Butterscotch Delight', category: 'Dessert', price: 110 },
    { name: 'Chicken Dum Biryani', category: 'Main Course', price: 350 },
    { name: 'Mutton Biryani', category: 'Main Course', price: 420 },
    { name: 'Veg Biryani', category: 'Main Course', price: 280 },
    { name: 'Hyderabadi Dum Biryani', category: 'Main Course', price: 450 },
    { name: 'Butter Chicken', category: 'Main Course', price: 380 },
    { name: 'Dal Makhani', category: 'Main Course', price: 260 },
  ];

  for (const item of itemsToEnsure) {
    const exists = await prisma.menuItem.findFirst({ where: { name: item.name } });
    if (!exists) {
      await prisma.menuItem.create({ data: { ...item, available: true } });
    }
  }
}


export async function GET() {
  try {
    await seedMissingItems();
    const menu = await prisma.menuItem.findMany({
      orderBy: { category: 'asc' }
    })
    return NextResponse.json(menu)
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 })
  }
}
