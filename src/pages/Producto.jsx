import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import ProductCard from '../components/ProductCard';
import BotonAgregar from '../components/BotonAgregar';
import { useCarrito } from '../lib/carrito';
import NoEncontrado from './NoEncontrado';
import {
  categorias,
  formatoPrecio,
  getProducto,
  preparacionCongelado,
  products,
} from '../data/products';
import { track } from '../lib/analytics';
import './Paginas.css';

function Producto() {
  const { slug } = useParams();
  const producto = getProducto(slug);
  const { cantidadDe } = useCarrito();

  if (!producto) return <NoEncontrado />;

  const pasos = producto.preparacion || preparacionCongelado;
  const otros = products.filter((p) => p.slug !== producto.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Pan de yuca ${producto.name}`,
    image: new URL(producto.image, window.location.origin).href,
    description: producto.description_es,
    brand: { '@type': 'Brand', name: 'Chawpa' },
    offers: {
      '@type': 'Offer',
      price: producto.precio.toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <Seo
        titulo={`${producto.name} – Pan de yuca`}
        descripcion={producto.description_es}
        jsonLd={jsonLd}
      />

      <section className="seccion">
        <div className="contenedor">
          <nav className="migas" aria-label="Ruta de navegación">
            <Link to="/productos">Productos</Link> /{' '}
            <Link to={`/productos?categoria=${producto.categoria}`}>
              {categorias[producto.categoria]}
            </Link>{' '}
            / <span>{producto.name}</span>
          </nav>

          <div className="producto-detalle">
            <img
              src={producto.image}
              alt={producto.name}
              width="600"
              height="600"
            />
            <div>
              {producto.nuevo && <span className="etiqueta-nuevo etiqueta-nuevo--linea">Nuevo</span>}
              <span className="eyebrow">{producto.presentation}</span>
              <h1>{producto.name}</h1>
              <p className="producto-detalle__precio">
                {formatoPrecio(producto.precio)} <small>+ envío</small>
              </p>
              <p>{producto.description_es}</p>
              {producto.disponibleEnCafe && (
                <p className="producto-detalle__nota">
                  ☕ También disponible en <Link to="/cafe">Chawpa Café</Link>.
                </p>
              )}

              <h3>Preparación</h3>
              <ol className="producto-detalle__pasos">
                {pasos.map((paso) => (
                  <li key={paso}>{paso}</li>
                ))}
              </ol>
              <p>
                <Link to="/como-hornear" className="enlace-guia">
                  Guía completa: air fryer, wafflera, sanduchera, pizza y más →
                </Link>
              </p>

              <div className="acciones">
                <BotonAgregar
                  producto={producto}
                  ubicacion={`detalle:${producto.slug}`}
                  texto="Agregar al carrito"
                />
                {producto.tipti && (
                  <a
                    href={producto.tipti}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="boton boton--tipti"
                    onClick={() => track('click_tienda', { tienda: 'Tipti', producto: producto.slug })}
                  >
                    Comprar en Tipti
                  </a>
                )}
                {cantidadDe(producto.slug) > 0 && (
                  <Link to="/carrito" className="boton boton--secundario">
                    Ver carrito
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion seccion--blanca">
        <div className="contenedor">
          <h2>También te puede gustar</h2>
          <div className="grilla">
            {otros.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Producto;
