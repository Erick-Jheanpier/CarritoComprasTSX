// src/hooks/useCart.tsx

import { useState, useEffect, useMemo } from "react"
import { db } from "../db/db"
import type { Automovil, CartItem } from "../types"

export function useCart() {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MIN_ITEMS = 1
  const MAX_ITEMS = 5 // Ajustado a un número más realista

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  function addToCart(item: Automovil) {
    const itemExists = cart.findIndex((automovil) => automovil.id === item.id)
    if (itemExists >= 0) { // El item ya existe en el carrito
      if (cart[itemExists].quantity >= MAX_ITEMS) return // Evitar exceder el máximo
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else { // El item no existe
      const newItem: CartItem = { ...item, quantity: 1 }
      setCart([...cart, newItem])
    }
  }

  function removeFromCart(id: Automovil['id']) {
    setCart(prevCart => prevCart.filter(automovil => automovil.id !== id))
  }

  function decreaseQuantity(id: Automovil['id']) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function increaseQuantity(id: Automovil['id']) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  // State Derivado
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    cartTotal
  }
}