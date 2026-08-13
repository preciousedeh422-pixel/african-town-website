import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus } from 'lucide-react'
import type { Dish } from '../data/menuData'
import { formatLAK } from '../lib/format'
import { useCart } from '../hooks/useCart'
import DishArt from './DishArt'

export default function DishModal({ dish, onClose }: { dish: Dish | null; onClose: () => void }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [protein, setProtein] = useState<string | undefined>(dish?.proteinOptions?.[0])

  if (!dish) return null

  function handleAdd() {
    if (!dish) return
    addItem(dish, quantity, protein)
    onClose()
    setQuantity(1)
  }

  return (
    <AnimatePresence>
      {dish && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/80 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="grid max-h-[92vh] w-full max-w-3xl grid-rows-[auto_1fr] overflow-y-auto rounded-t-2xl bg-charcoal sm:grid-cols-2 sm:grid-rows-1 sm:rounded-sm"
          >
            <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full">
              <DishArt dish={dish} className="h-full w-full object-cover" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-ivory backdrop-blur"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-5 p-7 sm:p-9">
              <div>
                {dish.signature && <span className="eyebrow text-gold">Signature Dish</span>}
                <h3 className="mt-2 font-display text-3xl text-ivory">{dish.name}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-ivory/60">{dish.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-ivory/50">
                <span className="rounded-full border border-gold/20 px-3 py-1">{dish.category}</span>
                {dish.spiceLevel > 0 && (
                  <span className="rounded-full border border-terracotta/40 px-3 py-1 text-terracotta">
                    {'Spice '.concat('●'.repeat(dish.spiceLevel))}
                  </span>
                )}
                {dish.dietaryTags.map((tag) => (
                  <span key={tag} className="rounded-full border border-gold/20 px-3 py-1 capitalize">
                    {tag}
                  </span>
                ))}
              </div>

              {dish.proteinOptions && (
                <div>
                  <p className="eyebrow mb-2">Protein</p>
                  <div className="flex flex-wrap gap-2">
                    {dish.proteinOptions.map((p) => (
                      <button
                        key={p}
                        onClick={() => setProtein(p)}
                        className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                          protein === p
                            ? 'border-gold bg-gold text-ink'
                            : 'border-ivory/20 text-ivory/70 hover:border-gold/50'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto flex items-center justify-between gap-4 border-t border-gold/10 pt-6">
                <div className="flex items-center gap-3 rounded-full border border-ivory/15 px-2 py-1.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-7 w-7 items-center justify-center text-ivory/70 hover:text-gold"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-4 text-center text-sm text-ivory">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-7 w-7 items-center justify-center text-ivory/70 hover:text-gold"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 rounded-full bg-gold py-3 text-xs uppercase tracking-widest2 text-ink transition-transform hover:scale-[0.99]"
                >
                  Add {formatLAK(dish.price * quantity)}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
