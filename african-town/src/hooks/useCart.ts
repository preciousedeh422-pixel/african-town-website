import { createContext, useContext, useMemo, useState, ReactNode, createElement } from 'react'
import type { Dish } from '../data/menuData'

export interface CartItem {
  dish: Dish
  quantity: number
  protein?: string
}

interface CartContextValue {
  items: CartItem[]
  addItem: (dish: Dish, quantity: number, protein?: string) => void
  removeItem: (dishId: string, protein?: string) => void
  updateQuantity: (dishId: string, protein: string | undefined, quantity: number) => void
  clear: () => void
  isOpen: boolean
  open: () => void
  close: () => void
  totalCount: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  function addItem(dish: Dish, quantity: number, protein?: string) {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.dish.id === dish.id && i.protein === protein)
      if (idx > -1) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity }
        return next
      }
      return [...prev, { dish, quantity, protein }]
    })
    setIsOpen(true)
  }

  function removeItem(dishId: string, protein?: string) {
    setItems((prev) => prev.filter((i) => !(i.dish.id === dishId && i.protein === protein)))
  }

  function updateQuantity(dishId: string, protein: string | undefined, quantity: number) {
    setItems((prev) =>
      prev
        .map((i) => (i.dish.id === dishId && i.protein === protein ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0)
    )
  }

  function clear() {
    setItems([])
  }

  const totalCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.quantity * i.dish.price, 0), [items])

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    totalCount,
    totalPrice,
  }

  return createElement(CartContext.Provider, { value }, children)
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
