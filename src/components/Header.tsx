// =================== src/components/Header.tsx ===================
import type { CartItem } from '../types'

import { useState } from 'react'

// Props para el componente Header
type HeaderProps = {
  cart: CartItem[]
  removeFromCart: (id: number) => void
  decreaseQuantity: (id: number) => void
  increaseQuantity: (id: number) => void
  clearCart: () => void
  cartTotal: number
}

export default function Header({
  cart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
  cartTotal,
}: HeaderProps) {
  const isEmpty = cart.length === 0
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  return (
    <header className="py-3 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="/">
              <img
                className="img-fluid"
                src="/img/Mustang-LOGO.svg"
                alt="imagen logo"
                style={{ maxHeight: '50px' }}
              />
            </a>
          </div>

          <nav className="col-md-6 mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito-container position-relative">
              <div className="carrito" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                <img
                  className="img-fluid"
                  src="/img/carrito.png"
                  alt="imagen carrito"
                  style={{ width: '40px' }}
                />
              </div>

              {isDropdownOpen && (
                <div
                  id="carrito-content"
                  className="carrito-content bg-white border rounded shadow p-3 position-absolute end-0 mt-2"
                  style={{ minWidth: '320px', zIndex: 1000 }}
                >
                  {isEmpty ? (
                    <p className="text-center">El carrito está vacío</p>
                  ) : (
                    <>
                      <table className="w-100 table">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((item) => (
                            <tr key={item.id}>
                              <td className="align-middle">
                                <img
                                  className="img-fluid"
                                  src={`/img/${item.image}.jpg`}
                                  alt={item.name}
                                  style={{ width: '50px', height: 'auto' }}
                                />
                              </td>
                              <td className="align-middle">{item.name}</td>
                              <td className="fw-bold align-middle">${item.price.toLocaleString()}</td>
                              <td className="align-middle">
                                <div className="d-flex align-items-center gap-2">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-dark"
                                    onClick={() => decreaseQuantity(item.id)}
                                  >
                                    -
                                  </button>
                                  <span>{item.quantity}</span>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-dark"
                                    onClick={() => increaseQuantity(item.id)}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="align-middle">
                                <button
                                  type="button"
                                  className="btn-close"
                                  aria-label="Eliminar"
                                  onClick={() => removeFromCart(item.id)}
                                ></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <p className="text-end">Total a pagar: <span className="fw-bold">${cartTotal.toLocaleString()}</span></p>

                      <button
                        className="btn btn-dark w-100 mt-3 p-2"
                        onClick={clearCart}
                      >
                        Vaciar Carrito
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}