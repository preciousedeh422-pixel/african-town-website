import { useState } from 'react'
import { motion } from 'framer-motion'
import { restaurant } from '../data/restaurantData'
import { buildWhatsAppReservationUrl } from '../lib/whatsapp'

export default function Reservation() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState('2')

  const canSubmit = name.trim() && phone.trim() && date && time

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    const url = buildWhatsAppReservationUrl({ name, phone, date, time, guests })
    window.open(url, '_blank')
  }

  return (
    <section id="reserve" className="relative bg-charcoal py-28 sm:py-36">
      <div className="mx-auto max-w-xl px-6 text-center sm:px-10">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
        >
          Reservation
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 font-display text-4xl font-light text-ivory sm:text-5xl"
        >
          Reserve your <span className="italic text-gold">table.</span>
        </motion.h2>
        <p className="mt-4 text-sm font-light text-ivory/50">
          Sent straight to us on WhatsApp — we'll confirm your table personally.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mt-10 space-y-4 text-left"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
            className="w-full rounded-lg border border-ivory/15 bg-ink/40 px-4 py-3.5 text-sm text-ivory placeholder:text-ivory/35 focus:border-gold/50"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            required
            className="w-full rounded-lg border border-ivory/15 bg-ink/40 px-4 py-3.5 text-sm text-ivory placeholder:text-ivory/35 focus:border-gold/50"
          />
          <div className="grid grid-cols-3 gap-3">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="rounded-lg border border-ivory/15 bg-ink/40 px-3 py-3.5 text-sm text-ivory [color-scheme:dark] focus:border-gold/50"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="rounded-lg border border-ivory/15 bg-ink/40 px-3 py-3.5 text-sm text-ivory [color-scheme:dark] focus:border-gold/50"
            />
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="rounded-lg border border-ivory/15 bg-ink/40 px-3 py-3.5 text-sm text-ivory focus:border-gold/50"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} guest{n > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gold py-4 text-xs uppercase tracking-widest2 text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          >
            Reserve Your Table
          </button>
        </motion.form>

        <p className="mt-6 text-xs text-ivory/35">
          Prefer to call? {restaurant.phoneDisplay} · {restaurant.phoneSecondary}
        </p>
      </div>
    </section>
  )
}
