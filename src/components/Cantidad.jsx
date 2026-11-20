import './Cantidad.css';

/** Selector − n + para cambiar la cantidad de un producto. */
function Cantidad({ valor, onCambiar, nombre }) {
  return (
    <div className="cantidad" role="group" aria-label={`Cantidad de ${nombre}`}>
      <button
        type="button"
        className="cantidad__boton"
        onClick={() => onCambiar(valor - 1)}
        aria-label={valor === 1 ? `Quitar ${nombre} del carrito` : `Quitar uno de ${nombre}`}
      >
        −
      </button>
      <span className="cantidad__valor" aria-live="polite">
        {valor}
      </span>
      <button
        type="button"
        className="cantidad__boton"
        onClick={() => onCambiar(valor + 1)}
        aria-label={`Agregar uno de ${nombre}`}
      >
        +
      </button>
    </div>
  );
}

export default Cantidad;
