import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'
import { restaurant } from '../data/restaurantData'
import { buildWhatsAppGeneralUrl } from '../lib/whatsapp'

export default function Contact() {
  return (
    <section id="contact" className="relative bg-ink py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow">Contact</span>
            <h2 className="mt-5 font-display text-4xl font-light text-ivory sm:text-5xl">
              Find us in <span className="italic text-gold">Vientiane.</span>
            </h2>

            <div className="mt-9 space-y-5 text-sm text-ivory/70">
              <a href={restaurant.googleMapsUrl} target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-gold">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
                {restaurant.address}
              </a>
              <a href={`tel:${restaurant.phoneDisplay.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-gold">
                <Phone size={18} className="shrink-0 text-gold" />
                {restaurant.phoneDisplay} · {restaurant.phoneSecondary}
              </a>
              <a href={`mailto:${restaurant.email}`} className="flex items-center gap-3 hover:text-gold">
                <Mail size={18} className="shrink-0 text-gold" />
                {restaurant.email}
              </a>
              <div className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  {restaurant.hours.map((h) => (
                    <p key={h.days}>
                      {h.days}: {h.time}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href={restaurant.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 hover:border-gold hover:text-gold"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={restaurant.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 hover:border-gold hover:text-gold"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={buildWhatsAppGeneralUrl('Hi African Town, I have a question.')}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 items-center gap-2 rounded-full border border-gold/40 px-4 text-xs uppercase tracking-widest2 text-gold hover:bg-gold hover:text-ink"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="overflow-hidden rounded-sm border border-gold/15"
          >
            <iframe
              title="African Town on Google Maps"
              src={restaurant.googleMapsEmbedSrc}
              className="h-full min-h-[320px] w-full grayscale invert-[0.92] contrast-[1.1]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gold/10 pt-8 text-xs text-ivory/35 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {restaurant.fullName}. All rights reserved.
          </span>
          <span>{restaurant.branch} · Vientiane, Laos</span>
        </div>
      </div>
    </section>
  )
}
