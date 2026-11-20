import { Link } from 'react-router-dom';
import { formatoPrecio } from '../data/products';
import BotonAgregar from './BotonAgregar';
import './ProductCard.css';

function ProductCard({ producto }) {
  return (
    <article className="producto-card">
      <Link to={`/productos/${producto.slug}`} className="producto-card__imagen">
        {producto.nuevo && <span className="etiqueta-nuevo">Nuevo</span>}
        <img
          src={producto.image}
          alt={producto.name}
          width="300"
          height="300"
          loading="lazy"
        />
      </Link>
      <div className="producto-card__cuerpo">
        <span className="producto-card__presentacion">{producto.presentation}</span>
        <h3>
          <Link to={`/productos/${producto.slug}`}>{producto.name}</Link>
        </h3>
        <p>{producto.description_es}</p>
        <div className="producto-card__pie">
          <span className="producto-card__precio">
            {formatoPrecio(producto.precio)} <small>+ envío</small>
          </span>
          <BotonAgregar producto={producto} ubicacion={`tarjeta:${producto.slug}`} />
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
