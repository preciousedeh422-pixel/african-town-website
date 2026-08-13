import { motion } from 'framer-motion'
import { restaurant } from '../data/restaurantData'
import Meridian from './Meridian'

export default function Story() {
  return (
    <section id="story" className="relative bg-ink py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] text-ivory sm:text-5xl">
              Where Africa meets{' '}
              <span className="italic text-gold">Southeast Asia.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 text-base font-light leading-relaxed text-ivory/70 lg:col-span-6 lg:col-start-7"
          >
            <p>
              {restaurant.fullName} carries the flavour of home to {restaurant.city}. Every dish begins
              with the cooking of Nigeria — its soups, its swallows, its grills — and shares the table
              with the food of Laos and Thailand, the cuisines that surround us here.
            </p>
            <p>
              This is not a fusion of convenience. It is two food cultures, cooked properly, side by
              side: Nigerian jollof next to Lao larb, Thai tom yum next to peppered goat. One roof, one
              table, three culinary worlds.
            </p>
            <p className="text-ivory/50">
              We built this table for the African community living in Laos, and for every Vientiane
              local curious enough to pull up a chair.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mt-24">
        <Meridian label="Lagos — Vientiane" />
      </div>
    </section>
  )
}
