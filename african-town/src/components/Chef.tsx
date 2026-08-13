import { motion } from 'framer-motion'
import { videoData } from '../data/restaurantData'
import { useEffect, useRef } from 'react'

export default function Chef() {
  const vidRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const v = vidRef.current
    if (!v) return
    // attempt to play programmatically; muted allows autoplay in most browsers
    v.muted = true
    v.play().catch(() => {
      // ignore play errors — browser may still block until user interaction
    })
  }, [])
  return (
    <section id="experience" className="relative bg-ink py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-sm"
        >
          <video
            ref={vidRef}
            className="h-full w-full object-cover"
            src={videoData.chef.src}
            poster={videoData.chef.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            data-cursor="Watch"
          />
        </motion.div>

        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            The Craft
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 font-display text-4xl font-light leading-[1.05] text-ivory sm:text-5xl"
          >
            The craft behind
            <br />
            <span className="italic text-gold">the table.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 space-y-5 text-base font-light leading-relaxed text-ivory/65"
          >
            <p>
              Every soup is built from scratch, every spice blend ground in-house. Our kitchen treats
              Nigerian, Lao and Thai cooking with the same respect — fresh ingredients, patient
              technique, and recipes passed down rather than shortcuts taken.
            </p>
            <p className="text-ivory/45">
              {/* Editable placeholder — replace with the real chef's story once supplied. */}
              This section is ready for your chef's biography and photo whenever you'd like to add it.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
