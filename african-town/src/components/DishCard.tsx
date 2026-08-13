import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Dish } from '../data/menuData'
import { formatLAK } from '../lib/format'
import DishArt from './DishArt'

export default function DishCard({ dish, onOpen }: { dish: Dish; onOpen: (dish: Dish) => void }) {
  return (
    <motion.button
      layout
      onClick={() => onOpen(dish)}
      data-cursor="View"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col overflow-hidden rounded-sm border border-gold/10 bg-charcoal/60 text-left transition-colors duration-300 hover:border-gold/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <DishArt
          dish={dish}
          className="h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.08]"
        />
        {dish.signature && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[0.55rem] uppercase tracking-widest2 text-ink">
            Signature
          </span>
        )}
        <div className="absolute right-3 top-3 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-ink/70 text-ivory opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={14} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight text-ivory">{dish.name}</h3>
          <span className="whitespace-nowrap pt-1 text-sm text-gold">{formatLAK(dish.price)}</span>
        </div>
        <p className="line-clamp-2 text-sm font-light leading-relaxed text-ivory/55">{dish.description}</p>
      </div>
    </motion.button>
  )
}
