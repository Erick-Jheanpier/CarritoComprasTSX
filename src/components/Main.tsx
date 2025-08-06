// src/components/Main.tsx

import type { Automovil } from "../types"

type MainProps = {
  automovil: Automovil
  addToCart: (item: Automovil) => void
}

export default function Main({ automovil, addToCart }: MainProps) {
  const { name, image, brand, price, topSpeed, year } = automovil

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-12">
        <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen automóvil" />
      </div>
      <div className="col-12">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p><b>Marca:</b> {brand}</p>
        <p><b>Velocidad Máxima:</b> {topSpeed}</p>
        <p><b>Año:</b> {year}</p>
        <p className="fw-black text-primary fs-3">${price.toLocaleString()}</p>
        <button
          type="button"
          className="btn btn-dark w-100"
          onClick={() => addToCart(automovil)}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  )
}