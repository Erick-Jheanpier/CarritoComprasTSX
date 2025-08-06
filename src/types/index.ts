// types/index.ts paso 1

export type Automovil = {
  id: number
  name: string
  brand: string
  image: string
  year: number
  topSpeed: string
  price: number
}

export type CartItem = Automovil & {
  quantity: number
}