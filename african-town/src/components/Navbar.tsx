import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { restaurant } from '../data/restaurantData'
import { useCart } from '../hooks/useCart'

const LINKS = [
  { label: 'Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalCount, open } = useCart()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ease-luxe sm:px-10 ${
            scrolled ? 'rounded-full border border-gold/20 bg-ink/70 py-2 backdrop-blur-md' : ''
          }`}
        >
          <a href="#top" className="font-display text-xl tracking-wide text-ivory sm:text-2xl" data-cursor="">
            {restaurant.name}
            <span className="ml-2 align-middle text-[0.55rem] font-sans uppercase tracking-widest2 text-gold">
              Vientiane
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="eyebrow text-[0.68rem] text-ivory/80 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={open}
              className="relative hidden items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-[0.68rem] uppercase tracking-widest2 text-gold transition-colors hover:bg-gold hover:text-ink md:flex"
              data-cursor="View"
            >
              <ShoppingBag size={14} />
              Order
              {totalCount > 0 && (
                <span className="ml-1 rounded-full bg-terracotta px-1.5 py-0.5 text-[0.6rem] text-ivory">
                  {totalCount}
                </span>
              )}
            </button>
            <a
              href="#reserve"
              className="hidden rounded-full bg-gold px-5 py-2 text-[0.68rem] uppercase tracking-widest2 text-ink transition-transform duration-200 hover:scale-[0.98] sm:inline-block"
            >
              Reserve a Table
            </a>
            <button
              className="text-ivory md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink px-8 py-8 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl text-ivory">{restaurant.name}</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="text-ivory">
                <X size={26} />
              </button>
            </div>

            <nav className="mt-16 flex flex-1 flex-col gap-8">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-4xl text-ivory"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 pb-6">
              <button
                onClick={() => {
                  open()
                  setMobileOpen(false)
                }}
                className="rounded-full border border-gold/40 px-5 py-3 text-center text-xs uppercase tracking-widest2 text-gold"
              >
                Order ({totalCount})
              </button>
              <a
                href="#reserve"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-gold px-5 py-3 text-center text-xs uppercase tracking-widest2 text-ink"
              >
                Reserve a Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
