import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { formatLAK } from '../lib/format'
import { buildWhatsAppOrderUrl } from '../lib/whatsapp'
import type { OrderType } from '../data/restaurantData'

const ORDER_TYPES: OrderType[] = ['DINE-IN', 'TAKEAWAY', 'DELIVERY']

export default function OrderCart() {
  const { items, isOpen, open, close, updateQuantity, totalCount, totalPrice } = useCart()
  const [orderType, setOrderType] = useState<OrderType>('DINE-IN')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')

  const canCheckout = items.length > 0 && name.trim() && phone.trim() && (orderType !== 'DELIVERY' || address.trim())

  function handleCheckout() {
    const url = buildWhatsAppOrderUrl(
      items.map((i) => ({ id: i.dish.id, name: i.dish.name, quantity: i.quantity, price: i.dish.price, protein: i.protein })),
      { orderType, name, phone, address, notes }
    )
    window.open(url, '_blank')
  }

  return (
    <>
      {/* Mobile sticky bar */}
      {totalCount > 0 && !isOpen && (
        <button
          onClick={open}
          className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full bg-gold px-6 py-4 text-ink shadow-xl md:hidden"
        >
          <span className="flex items-center gap-2 text-xs uppercase tracking-widest2">
            <ShoppingBag size={16} />
            {totalCount} item{totalCount > 1 ? 's' : ''}
          </span>
          <span className="text-sm font-semibold">{formatLAK(totalPrice)}</span>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex justify-end bg-ink/70 backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-full w-full max-w-md flex-col bg-charcoal"
            >
              <div className="flex items-center justify-between border-b border-gold/10 px-6 py-5">
                <h3 className="font-display text-2xl text-ivory">Your Order</h3>
                <button onClick={close} aria-label="Close cart">
                  <X size={20} className="text-ivory/60" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5">
                {items.length === 0 ? (
                  <p className="mt-10 text-center text-sm text-ivory/40">
                    Your basket is empty. Explore the menu to add a dish.
                  </p>
                ) : (
                  <div className="space-y-5">
                    {items.map((item) => (
                      <div key={`${item.dish.id}-${item.protein ?? ''}`} className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm text-ivory">{item.dish.name}</p>
                          {item.protein && <p className="text-xs text-ivory/40">{item.protein}</p>}
                          <p className="mt-1 text-xs text-gold">{formatLAK(item.dish.price)}</p>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-ivory/15 px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.dish.id, item.protein, item.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center text-ivory/70 hover:text-gold"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-4 text-center text-xs text-ivory">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.dish.id, item.protein, item.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center text-ivory/70 hover:text-gold"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="space-y-4 border-t border-gold/10 px-6 py-6">
                  <div className="flex justify-between text-sm text-ivory">
                    <span className="text-ivory/50">Total</span>
                    <span className="text-gold">{formatLAK(totalPrice)}</span>
                  </div>

                  <div className="flex gap-2">
                    {ORDER_TYPES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setOrderType(t)}
                        className={`flex-1 rounded-full border px-2 py-2 text-[0.65rem] uppercase tracking-widest2 transition-colors ${
                          orderType === t ? 'border-gold bg-gold text-ink' : 'border-ivory/15 text-ivory/60'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full rounded-lg border border-ivory/15 bg-ink/40 px-4 py-3 text-sm text-ivory placeholder:text-ivory/35 focus:border-gold/50"
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full rounded-lg border border-ivory/15 bg-ink/40 px-4 py-3 text-sm text-ivory placeholder:text-ivory/35 focus:border-gold/50"
                  />
                  {orderType === 'DELIVERY' && (
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Delivery address"
                      className="w-full rounded-lg border border-ivory/15 bg-ink/40 px-4 py-3 text-sm text-ivory placeholder:text-ivory/35 focus:border-gold/50"
                    />
                  )}
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Additional notes (optional)"
                    rows={2}
                    className="w-full resize-none rounded-lg border border-ivory/15 bg-ink/40 px-4 py-3 text-sm text-ivory placeholder:text-ivory/35 focus:border-gold/50"
                  />

                  <button
                    disabled={!canCheckout}
                    onClick={handleCheckout}
                    className="w-full rounded-full bg-gold py-3.5 text-xs uppercase tracking-widest2 text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Send Order on WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
