import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { restaurant, videoData } from '../data/restaurantData'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section id="top" ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <motion.video
        style={{ scale: videoScale }}
        className="absolute inset-0 h-full w-full object-cover"
        src={videoData.hero.src}
        poster={videoData.hero.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-transparent" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="eyebrow mb-6"
        >
          {restaurant.fullName} · {restaurant.city}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[15vw] font-light leading-[0.95] text-ivory sm:text-[9vw] lg:text-[7.5vw]"
        >
          Africa
          <br />
          <span className="italic text-gold">meets</span> Asia.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-8 max-w-md text-sm font-light tracking-wide text-ivory/75 sm:text-base"
        >
          {restaurant.supportingLine}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#menu"
            data-cursor="Explore"
            className="rounded-full bg-gold px-8 py-3 text-xs uppercase tracking-widest2 text-ink transition-transform duration-200 hover:scale-[0.98]"
          >
            Explore the Menu
          </a>
          <a
            href="#reserve"
            data-cursor="Reserve"
            className="rounded-full border border-ivory/30 px-8 py-3 text-xs uppercase tracking-widest2 text-ivory transition-colors duration-200 hover:border-gold hover:text-gold"
          >
            Reserve a Table
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="text-ivory/60"
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  )
}
