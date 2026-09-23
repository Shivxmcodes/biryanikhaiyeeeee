const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Waiters requested by user
  const waiters = [
    { name: 'Soham', role: 'WAITER' },
    { name: 'Kunal', role: 'WAITER' },
    { name: 'Neha', role: 'WAITER' },
    { name: 'Isha', role: 'WAITER' },
    { name: 'Nisha', role: 'WAITER' },
    { name: 'Rohan', role: 'WAITER' }
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
  const soham = await prisma.staff.findFirst({ where: { name: 'Soham' } })
  const kunal = await prisma.staff.findFirst({ where: { name: 'Kunal' } })
  const neha = await prisma.staff.findFirst({ where: { name: 'Neha' } })
  const isha = await prisma.staff.findFirst({ where: { name: 'Isha' } })
  const nisha = await prisma.staff.findFirst({ where: { name: 'Nisha' } })

  const t08 = await prisma.table.findUnique({ where: { number: 'T-08' } })
  const t03 = await prisma.table.findUnique({ where: { number: 'T-03' } })
  const t15 = await prisma.table.findUnique({ where: { number: 'T-15' } })
  const t21 = await prisma.table.findUnique({ where: { number: 'T-21' } })
  const t06 = await prisma.table.findUnique({ where: { number: 'T-06' } })

  if (soham && t08) await prisma.order.create({ data: { orderId: '#1042', tableId: t08.id, waiterId: soham.id, status: 'Cooking', elapsed: '12 min' } })
  if (kunal && t03) await prisma.order.create({ data: { orderId: '#1041', tableId: t03.id, waiterId: kunal.id, status: 'Ready', elapsed: '18 min' } })
  if (neha && t15) await prisma.order.create({ data: { orderId: '#1040', tableId: t15.id, waiterId: neha.id, status: 'Pending', elapsed: '3 min' } })
  if (isha && t21) await prisma.order.create({ data: { orderId: '#1039', tableId: t21.id, waiterId: isha.id, status: 'Cooking', elapsed: '9 min' } })
  if (nisha && t06) await prisma.order.create({ data: { orderId: '#1038', tableId: t06.id, waiterId: nisha.id, status: 'Ready', elapsed: '22 min' } })

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
