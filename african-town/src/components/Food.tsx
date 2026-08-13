import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { videoData } from '../data/restaurantData'
import { cuisineMeta } from '../data/menuData'

export default function Food() {
  const ref = useRef<HTMLDivElement>(null)
  const vidRef = useRef<HTMLVideoElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.3'] })

  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])
  const clip = useTransform(scrollYProgress, [0, 1], ['12% 0% 12% 0%', '0% 0% 0% 0%'])

  useEffect(() => {
    const v = vidRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])

  return (
    <section ref={ref} className="relative bg-ink pb-28 pt-8 sm:pb-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <span className="eyebrow">Taste</span>
          <h2 className="mt-5 font-display text-5xl font-light leading-[0.95] text-ivory sm:text-7xl">
            Flavour without
            <br />
            <span className="italic text-gold">borders.</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ scale, opacity, clipPath: clip }}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-sm sm:aspect-[16/8]"
        >
          <video
            ref={vidRef}
            className="h-full w-full object-cover"
            src={videoData.food.src}
            poster={videoData.food.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            data-cursor="Watch"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        </motion.div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-gold/15 sm:grid-cols-3">
          {(Object.keys(cuisineMeta) as Array<keyof typeof cuisineMeta>).map((key, i) => {
            const meta = cuisineMeta[key]
            return (
              <motion.a
                key={key}
                href="#menu"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group flex flex-col items-center justify-center gap-3 bg-charcoal px-6 py-14 text-center transition-colors duration-300 hover:bg-charcoal/60"
                data-cursor="Explore"
              >
                <span className="text-3xl">{meta.flag}</span>
                <span className="font-display text-2xl text-ivory">{meta.label}</span>
                <span className="eyebrow text-ivory/40 transition-colors group-hover:text-gold">
                  View dishes
                </span>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
