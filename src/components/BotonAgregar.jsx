import { useCarrito } from '../lib/carrito';
import Cantidad from './Cantidad';

/** "Agregar" mientras el producto no está en el carrito; luego, el selector de cantidad. */
function BotonAgregar({ producto, ubicacion, texto = 'Agregar' }) {
  const { cantidadDe, agregar, fijar } = useCarrito();
  const cantidad = cantidadDe(producto.slug);

  if (cantidad > 0) {
    return (
      <Cantidad
        valor={cantidad}
        nombre={producto.name}
        onCambiar={(n) => fijar(producto.slug, n)}
      />
    );
  }

  return (
    <button type="button" className="boton" onClick={() => agregar(producto, ubicacion)}>
      {texto}
    </button>
  );
}

export default BotonAgregar;
