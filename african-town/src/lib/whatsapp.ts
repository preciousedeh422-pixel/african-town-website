import { restaurant } from '../data/restaurantData'
import type { OrderType } from '../data/restaurantData'
import { formatLAK } from './format'

export interface CartLine {
  id: string
  name: string
  quantity: number
  price: number
  protein?: string
}

interface OrderDetails {
  orderType: OrderType
  name: string
  phone: string
  address?: string
  notes?: string
}

export function buildWhatsAppOrderUrl(lines: CartLine[], details: OrderDetails): string {
  const itemsText = lines
    .map((l) => `• ${l.quantity}x ${l.name}${l.protein ? ` (${l.protein})` : ''} — ${formatLAK(l.price * l.quantity)}`)
    .join('\n')

  const total = lines.reduce((sum, l) => sum + l.price * l.quantity, 0)

  const message = [
    `Hi African Town! I'd like to place a ${details.orderType} order.`,
    '',
    itemsText,
    '',
    `Total: ${formatLAK(total)}`,
    '',
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    details.orderType === 'DELIVERY' && details.address ? `Delivery address: ${details.address}` : '',
    details.notes ? `Notes: ${details.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  return `https://wa.me/${restaurant.whatsappE164}?text=${encodeURIComponent(message)}`
}

export function buildWhatsAppReservationUrl(details: {
  name: string
  phone: string
  date: string
  time: string
  guests: string
}): string {
  const message = [
    `Hi African Town, I'd like to reserve a table.`,
    '',
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `Date: ${details.date}`,
    `Time: ${details.time}`,
    `Guests: ${details.guests}`,
  ].join('\n')

  return `https://wa.me/${restaurant.whatsappE164}?text=${encodeURIComponent(message)}`
}

export function buildWhatsAppGeneralUrl(text: string): string {
  return `https://wa.me/${restaurant.whatsappE164}?text=${encodeURIComponent(text)}`
}
