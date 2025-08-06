// src/App.tsx

import Header from './components/Header'
import Main from './components/Main'
import Footers from './components/Footers'
import { useCart } from './hooks/Usecart'


export default function App() {
  const { 
    data, 
    cart, 
    addToCart, 
    removeFromCart, 
    decreaseQuantity, 
    increaseQuantity, 
    clearCart, 
    cartTotal 
  } = useCart()

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Automóviles disponibles</h2>
        <div className="row mt-5">
          {data.map((automovil) => (
            <Main
              key={automovil.id}
              automovil={automovil}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>
      
      <Footers />
    </>
  )
}
