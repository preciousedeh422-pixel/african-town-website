// ============================================================================
// RESTAURANT DATA — edit everything about the business from this one file.
// Nothing here touches UI components.
// ============================================================================

export const restaurant = {
  name: 'African Town',
  fullName: 'African Town Bar & Restaurant',
  branch: 'Branch 2',
  tagline: 'Africa meets Asia.',
  supportingLine: 'An African table in the heart of Vientiane.',
  city: 'Vientiane',
  country: 'Laos',

  // TODO: replace with the exact street address — only the city is confirmed.
  address: 'Vientiane, Laos',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=African+Town+Bar+%26+Restaurant+Vientiane',
  googleMapsEmbedSrc:
    'https://www.google.com/maps?q=African+Town+Bar+%26+Restaurant+Vientiane&output=embed',

  // Numbers pulled from the storefront sign / menu board photos supplied.
  // Confirm the whatsappE164 country-code formatting before going live.
  phoneDisplay: '020 5474 5501',
  phoneSecondary: '020 9580 8073',
  whatsappE164: '8562054745501', // +856 (Laos) 20 5474 5501 — verify with the restaurant
  whatsappE164Secondary: '8562095808073',
  email: 'hello@africantownvientiane.com', // TODO: replace with the real inbox

  hours: [
    { days: 'Monday — Sunday', time: '11:00 — 23:30' }, // TODO: confirm real hours
  ],

  social: {
    instagram: 'https://instagram.com/africantownvientiane', // TODO
    facebook: 'https://facebook.com/africantownvientiane', // TODO
    tiktok: 'https://tiktok.com/@africantownvientiane', // TODO
  },

  currency: 'LAK',
}

// Order type used across the site
export type OrderType = 'DINE-IN' | 'TAKEAWAY' | 'DELIVERY'

// Google Form integration (optional alternative to the WhatsApp order flow).
// Leave GOOGLE_FORM_ACTION_URL empty to keep WhatsApp as the only order path.
export const googleForm = {
  GOOGLE_FORM_ACTION_URL: '', // e.g. 'https://docs.google.com/forms/d/e/XXXXXXX/formResponse'
  fields: {
    name: 'entry.000000001',
    phone: 'entry.000000002',
    address: 'entry.000000003',
    orderType: 'entry.000000004',
    items: 'entry.000000005',
    notes: 'entry.000000006',
  },
}

// ----------------------------------------------------------------------------
// Video data — the four cinematic scenes that carry the site's story.
// Replace the .mp4 files in /public/videos/ (same filenames) to swap footage,
// or update the paths below to point at new files.
// ----------------------------------------------------------------------------
export const videoData = {
  hero: {
    src: '/videos/hero.mp4',
    poster: '/videos/hero-poster.jpg',
    label: 'Arrival',
  },
  food: {
    src: '/videos/food.mp4',
    poster: '/videos/food-poster.jpg',
    label: 'Taste',
  },
  chef: {
    src: '/videos/chef.mp4',
    poster: '/videos/chef-poster.jpg',
    label: 'Craft',
  },
  finale: {
    src: '/videos/finale.mp4',
    poster: '/videos/finale-poster.jpg',
    label: 'The Table',
  },
}

export const galleryData = [
  {
    id: 'storefront',
    image: '/images/storefront.jpg',
    alt: 'African Town Bar & Restaurant entrance at night, lit walkway leading to the dining room',
    caption: 'The entrance, Branch 2',
    size: 'wide' as const,
  },
  {
    id: 'menu-board',
    image: '/images/menu-board.jpg',
    alt: 'Illustrated menu board showing African and Thai dishes at African Town',
    caption: 'The house menu board',
    size: 'tall' as const,
  },
]
