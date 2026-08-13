import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { cuisineMeta, dishes, type Cuisine, type Dish, type DietaryTag } from '../data/menuData'
import DishCard from './DishCard'
import DishModal from './DishModal'

const FILTERS: DietaryTag[] = ['vegetarian', 'vegan', 'spicy', 'chicken', 'beef', 'goat', 'fish', 'seafood']

export default function MenuExperience() {
  const [cuisine, setCuisine] = useState<Cuisine>('nigerian')
  const [category, setCategory] = useState<string>('All')
  const [query, setQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<DietaryTag[]>([])
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)

  const categories = ['All', ...cuisineMeta[cuisine].categories]

  const filtered = useMemo(() => {
    return dishes.filter((d) => {
      if (d.cuisine !== cuisine) return false
      if (category !== 'All' && d.category !== category) return false
      if (query && !d.name.toLowerCase().includes(query.toLowerCase())) return false
      if (activeFilters.length && !activeFilters.every((f) => d.dietaryTags.includes(f))) return false
      return d.available
    })
  }, [cuisine, category, query, activeFilters])

  function toggleFilter(tag: DietaryTag) {
    setActiveFilters((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <section id="menu" className="relative bg-ink py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow">The Menu</span>
          <h2 className="mt-5 font-display text-5xl font-light text-ivory sm:text-6xl">
            Three culinary <span className="italic text-gold">worlds.</span>
          </h2>
        </motion.div>

        {/* Cuisine tabs */}
        <div className="mb-10 flex justify-center gap-2 sm:gap-3">
          {(Object.keys(cuisineMeta) as Cuisine[]).map((key) => (
            <button
              key={key}
              onClick={() => {
                setCuisine(key)
                setCategory('All')
              }}
              className={`rounded-full border px-5 py-2.5 text-xs uppercase tracking-widest2 transition-colors sm:px-7 sm:py-3 ${
                cuisine === key
                  ? 'border-gold bg-gold text-ink'
                  : 'border-ivory/15 text-ivory/70 hover:border-gold/50'
              }`}
            >
              {cuisineMeta[key].flag} {cuisineMeta[key].label}
            </button>
          ))}
        </div>

        {/* Search + filter trigger */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you craving?"
              className="w-full rounded-full border border-ivory/15 bg-charcoal/50 py-3 pl-11 pr-4 text-sm text-ivory placeholder:text-ivory/35 focus:border-gold/50"
            />
          </div>
          <button
            onClick={() => setFilterDrawerOpen(true)}
            className="flex items-center justify-center gap-2 rounded-full border border-ivory/15 px-5 py-3 text-xs uppercase tracking-widest2 text-ivory/70 hover:border-gold/50"
          >
            <SlidersHorizontal size={14} />
            Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </button>
        </div>

        {/* Category strip */}
        <div className="mb-10 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs transition-colors ${
                category === c ? 'bg-ivory/10 text-gold' : 'text-ivory/45 hover:text-ivory/70'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Dish grid */}
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((dish) => (
              <DishCard key={dish.id} dish={dish} onOpen={setSelectedDish} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-sm text-ivory/40">
            Nothing matches yet — try clearing a filter or searching another dish.
          </p>
        )}
      </div>

      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />

      {/* Mobile filter drawer / desktop reuses same panel */}
      <AnimatePresence>
        {filterDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/80 backdrop-blur-sm sm:items-center"
            onClick={() => setFilterDrawerOpen(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-t-2xl bg-charcoal p-7 sm:rounded-sm"
            >
              <div className="mb-6 flex items-center justify-between">
                <h4 className="font-display text-2xl text-ivory">Filters</h4>
                <button onClick={() => setFilterDrawerOpen(false)} aria-label="Close filters">
                  <X size={18} className="text-ivory/60" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleFilter(tag)}
                    className={`rounded-full border px-4 py-2 text-xs capitalize transition-colors ${
                      activeFilters.includes(tag)
                        ? 'border-gold bg-gold text-ink'
                        : 'border-ivory/15 text-ivory/70'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="mt-8 w-full rounded-full bg-gold py-3 text-xs uppercase tracking-widest2 text-ink"
              >
                Show {filtered.length} dishes
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
