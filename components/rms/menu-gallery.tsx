import Image from "next/image"

const dishes = [
  {
    name: "Hyderabadi Dum Biryani",
    description: "Fragrant saffron basmati slow-cooked with tender meat, fried onions and mint",
    image: "/food/dum-biryani.png",
    tag: "Signature",
    tagColor: "bg-amber-500",
    price: "₹420",
  },
  {
    name: "Butter Chicken",
    description: "Creamy tomato gravy with charred tandoori chicken, served with butter naan",
    image: "/food/butter-chicken.png",
    tag: "Chef's Pick",
    tagColor: "bg-rose-500",
    price: "₹380",
  },
  {
    name: "Gulab Jamun & Kulfi",
    description: "Warm syrup-soaked dumplings with saffron kulfi and pistachio crumble",
    image: "/food/gulab-jamun.png",
    tag: "Dessert",
    tagColor: "bg-violet-500",
    price: "₹180",
  },
]

const lifestyle = [
  {
    name: "In-Room Dining",
    description: "Royal thali service delivered to your suite",
    image: "/food/room-dining.png",
    accent: "from-emerald-500/85",
  },
  {
    name: "Doorstep Delivery",
    description: "Sealed hot, packed fresh, at your door in 30 minutes",
    image: "/food/takeaway-delivery.png",
    accent: "from-sky-500/85",
  },
]

export function MenuGallery() {
  return (
    <section aria-labelledby="menu-heading" className="animate-rise space-y-6 [animation-delay:300ms]">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            From The Kitchen
          </span>
          <h2 id="menu-heading" className="mt-1 font-display text-2xl tracking-tight text-foreground sm:text-3xl">
            Signature Specialties
          </h2>
        </div>
      </div>

      {/* Dish cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dishes.map((dish) => (
          <article
            key={dish.name}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={dish.image || "/placeholder.svg"}
                alt={dish.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className={`absolute left-3 top-3 rounded-full ${dish.tagColor} px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow`}
              >
                {dish.tag}
              </span>
            </div>
            <div className="space-y-2 p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg text-foreground">{dish.name}</h3>
                <span className="shrink-0 rounded-lg bg-primary/10 px-2.5 py-1 text-sm font-bold text-primary">
                  {dish.price}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{dish.description}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Lifestyle tiles */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {lifestyle.map((tile) => (
          <article
            key={tile.name}
            className="group relative aspect-[16/9] overflow-hidden rounded-2xl border border-border shadow-sm"
          >
            <Image
              src={tile.image || "/placeholder.svg"}
              alt={tile.name}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${tile.accent} via-black/20 to-transparent`} />
            <div className="absolute bottom-0 left-0 p-5 text-white">
              <h3 className="font-display text-xl">{tile.name}</h3>
              <p className="mt-1 text-sm text-white/85">{tile.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
