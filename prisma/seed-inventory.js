const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Adding new inventory items...')

  const inventory = [
    { item: 'Mutton', quantity: 15, unit: 'kg', minLevel: 10, status: 'OK' },
    { item: 'Ghee', quantity: 2, unit: 'kg', minLevel: 5, status: 'LOW STOCK' },
    { item: 'Paneer', quantity: 8, unit: 'kg', minLevel: 5, status: 'OK' },
    { item: 'Cardamom', quantity: 0, unit: 'g', minLevel: 200, status: 'CRITICAL' },
    { item: 'Onions', quantity: 30, unit: 'kg', minLevel: 15, status: 'OK' }
  ]

  for (const inv of inventory) {
    await prisma.inventory.create({ data: inv })
  }

  console.log('Added 5 new items!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
