const fs = require('fs')
const path = require('path')

const pages = [
  'pos', 'live-orders', 'table-map', 'kitchen', 'inventory', 'staff', 'menu', 'reservations', 'delivery'
]

const baseDir = path.join(__dirname, 'app')

pages.forEach(p => {
  const dir = path.join(baseDir, p)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  
  const content = `
export default function ${p.replace('-', '')}Page() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 pt-32">
      <h1 className="text-4xl font-bold capitalize text-primary">${p.replace('-', ' ')}</h1>
      <p className="text-muted-foreground">This feature is currently under active development.</p>
      <a href="/" className="rounded-xl bg-primary px-6 py-2.5 font-medium text-primary-foreground hover:brightness-110 transition-all">
        Back to Dashboard
      </a>
    </div>
  )
}
  `
  fs.writeFileSync(path.join(dir, 'page.tsx'), content.trim())
})

console.log("Skeleton pages created successfully!")
