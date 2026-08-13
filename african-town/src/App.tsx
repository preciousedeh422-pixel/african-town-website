import { CartProvider } from './hooks/useCart'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Story from './components/Story'
import Food from './components/Food'
import Menu from './components/Menu'
import Chef from './components/Chef'
import Finale from './components/Finale'
import Reservation from './components/Reservation'
import Contact from './components/Contact'
import OrderCart from './components/OrderCart'

export default function App() {
  return (
    <CartProvider>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Food />
        <Menu />
        <Chef />
        <Finale />
        <Reservation />
        <Contact />
      </main>
      <OrderCart />
    </CartProvider>
  )
}
