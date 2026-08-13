import type { Dish } from '../data/menuData'

const SPICE_GLYPH = '●'

export default function DishArt({ dish, className = '' }: { dish: Dish; className?: string }) {
  if (dish.image) {
    return <img src={dish.image} alt={dish.imageAlt} className={className} loading="lazy" />
  }

  return (
    <div className={`dish-plate flex items-center justify-center ${className}`}>
      <div className="relative z-10 px-6 text-center">
        <p className="font-display text-lg italic text-gold-soft/90 sm:text-xl">{dish.name}</p>
        {dish.spiceLevel > 0 && (
          <p className="mt-2 text-[0.6rem] tracking-widest text-terracotta">
            {SPICE_GLYPH.repeat(dish.spiceLevel)}
          </p>
        )}
      </div>
    </div>
  )
}
