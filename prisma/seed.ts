const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Waiters requested by user
  const waiters = [
    { name: 'Priya', role: 'WAITER' },
    { name: 'Shravani', role: 'WAITER' },
    { name: 'Shubhra', role: 'WAITER' },
    { name: 'Samruddhi', role: 'WAITER' },
    { name: 'Aashika', role: 'WAITER' }
  ]

  for (const waiter of waiters) {
    await prisma.staff.create({ data: waiter })
  }

  // Sample tables
  const tables = [
    { number: 'T-03', capacity: 4 },
    { number: 'T-06', capacity: 2 },
    { number: 'T-08', capacity: 4 },
    { number: 'T-15', capacity: 6 },
    { number: 'T-21', capacity: 2 }
  ]

  for (const table of tables) {
    await prisma.table.create({ data: table })
  }

  // Sample Menu
  const menuItems = [
    { name: 'Hyderabadi Dum Biryani', category: 'Main Course', price: 450 },
    { name: 'Butter Chicken', category: 'Main Course', price: 380 },
    { name: 'Gulab Jamun & Kulfi', category: 'Dessert', price: 150 }
  ]

  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item })
  }

  // Sample Inventory
  const inventory = [
    { item: 'Basmati Rice', quantity: 50, unit: 'kg', minLevel: 10, status: 'OK' },
    { item: 'Chicken', quantity: 20, unit: 'kg', minLevel: 15, status: 'OK' },
    { item: 'Saffron', quantity: 5, unit: 'g', minLevel: 10, status: 'LOW STOCK' }
  ]

  console.log('Creating sample orders...')
  const priya = await prisma.staff.findFirst({ where: { name: 'Priya' } })
  const shravani = await prisma.staff.findFirst({ where: { name: 'Shravani' } })
  const shubhra = await prisma.staff.findFirst({ where: { name: 'Shubhra' } })
  const samruddhi = await prisma.staff.findFirst({ where: { name: 'Samruddhi' } })
  const aashika = await prisma.staff.findFirst({ where: { name: 'Aashika' } })

  const t08 = await prisma.table.findUnique({ where: { number: 'T-08' } })
  const t03 = await prisma.table.findUnique({ where: { number: 'T-03' } })
  const t15 = await prisma.table.findUnique({ where: { number: 'T-15' } })
  const t21 = await prisma.table.findUnique({ where: { number: 'T-21' } })
  const t06 = await prisma.table.findUnique({ where: { number: 'T-06' } })

  if (priya && t08) await prisma.order.create({ data: { orderId: '#1042', tableId: t08.id, waiterId: priya.id, status: 'Cooking', elapsed: '12 min' } })
  if (shravani && t03) await prisma.order.create({ data: { orderId: '#1041', tableId: t03.id, waiterId: shravani.id, status: 'Ready', elapsed: '18 min' } })
  if (shubhra && t15) await prisma.order.create({ data: { orderId: '#1040', tableId: t15.id, waiterId: shubhra.id, status: 'Pending', elapsed: '3 min' } })
  if (samruddhi && t21) await prisma.order.create({ data: { orderId: '#1039', tableId: t21.id, waiterId: samruddhi.id, status: 'Cooking', elapsed: '9 min' } })
  if (aashika && t06) await prisma.order.create({ data: { orderId: '#1038', tableId: t06.id, waiterId: aashika.id, status: 'Ready', elapsed: '22 min' } })

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
