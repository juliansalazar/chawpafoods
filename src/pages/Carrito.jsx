import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Cantidad from '../components/Cantidad';
import { useCarrito } from '../lib/carrito';
import { formatoPrecio } from '../data/products';
import { PEDIDO_MINIMO, zonas } from '../data/pedido';
import './Pedido.css';

const envioDesde = Math.min(...zonas.filter((z) => !z.retiro).map((z) => z.costo));

function Carrito() {
  const { items, subtotal, fijar } = useCarrito();
  const falta = PEDIDO_MINIMO - subtotal;

  if (items.length === 0) return <CarritoVacio />;

  return (
    <>
      <Seo titulo="Tu carrito" noindex />
      <section className="seccion">
        <div className="contenedor">
          <h1>Tu carrito</h1>

          <div className="pedido-layout">
            <ul className="carrito-lista tarjeta">
              {items.map(({ producto, cantidad }) => (
                <li key={producto.slug} className="carrito-item">
                  <Link to={`/productos/${producto.slug}`} className="carrito-item__imagen">
                    <img src={producto.image} alt="" width="80" height="80" />
                  </Link>
                  <div className="carrito-item__info">
                    <Link to={`/productos/${producto.slug}`} className="carrito-item__nombre">
                      {producto.name}
                    </Link>
                    <span className="carrito-item__detalle">
                      {producto.presentation} · {formatoPrecio(producto.precio)} c/u
                    </span>
                    <button
                      type="button"
                      className="enlace-boton"
                      onClick={() => fijar(producto.slug, 0)}
                    >
                      Quitar
                    </button>
                  </div>
                  <div className="carrito-item__acciones">
                    <Cantidad
                      valor={cantidad}
                      nombre={producto.name}
                      onCambiar={(n) => fijar(producto.slug, n)}
                    />
                    <strong>{formatoPrecio(producto.precio * cantidad)}</strong>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="resumen tarjeta">
              <h2>Resumen</h2>
              <dl className="resumen__filas">
                <dt>Subtotal</dt>
                <dd>{formatoPrecio(subtotal)}</dd>
                <dt>Envío</dt>
                <dd className="resumen__suave">desde {formatoPrecio(envioDesde)}</dd>
              </dl>
              <p className="resumen__nota">
                El envío depende de tu zona y lo calculas en el siguiente paso. También puedes
                retirar gratis en nuestro café.
              </p>

              {falta > 0 ? (
                <>
                  <p className="aviso" role="status">
                    El pedido mínimo es {formatoPrecio(PEDIDO_MINIMO)}. Te faltan{' '}
                    <strong>{formatoPrecio(falta)}</strong>.
                  </p>
                  <Link to="/productos" className="boton boton--ancho">
                    Agregar más productos
                  </Link>
                </>
              ) : (
                <Link to="/pedido" className="boton boton--ancho">
                  Continuar con el pedido
                </Link>
              )}
              <Link to="/productos" className="resumen__seguir">
                ← Seguir comprando
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export function CarritoVacio() {
  return (
    <>
      <Seo titulo="Tu carrito" noindex />
      <section className="seccion">
        <div className="contenedor seccion__encabezado">
          <span className="eyebrow">Carrito</span>
          <h1>Tu carrito está vacío</h1>
          <p>Elige tus panes de yuca favoritos y arma tu pedido en un par de minutos.</p>
          <div className="acciones acciones--centro">
            <Link to="/productos" className="boton">
              Ver productos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Carrito;
