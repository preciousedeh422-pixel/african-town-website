import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { videoData } from '../data/restaurantData'

export default function Finale() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.18])
  const overlay = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 0.55, 0.8])

  return (
    <section ref={ref} className="relative h-[85vh] w-full overflow-hidden bg-ink sm:h-[95vh]">
      <motion.video
        style={{ scale }}
        className="absolute inset-0 h-full w-full object-cover"
        src={videoData.finale.src}
        poster={videoData.finale.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <motion.div style={{ opacity: overlay }} className="absolute inset-0 bg-ink" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="eyebrow mb-6"
        >
          The Table
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl font-light italic text-ivory sm:text-8xl"
        >
          Come to the table.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-sm text-sm font-light text-ivory/60"
        >
          Good food brings people together.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#reserve"
            className="rounded-full bg-gold px-8 py-3 text-xs uppercase tracking-widest2 text-ink transition-transform hover:scale-[0.98]"
          >
            Reserve a Table
          </a>
          <a
            href="#menu"
            className="rounded-full border border-ivory/30 px-8 py-3 text-xs uppercase tracking-widest2 text-ivory hover:border-gold hover:text-gold"
          >
            Explore the Menu
          </a>
        </motion.div>
      </div>
    </section>
  )
}
