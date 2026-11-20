import { tiendas } from '../data/contacto';
import { track } from '../lib/analytics';
import './LogosTiendas.css';

/**
 * Logos de las tiendas que venden Chawpa.
 * `detalle`: muestra también tipo y descripción (página Dónde comprar).
 */
function LogosTiendas({ detalle = false }) {
  return (
    <ul className={`tiendas ${detalle ? 'tiendas--detalle' : ''}`}>
      {tiendas.map((t) => (
        <li key={t.nombre}>
          <a
            href={t.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tiendas__item"
            onClick={() => track('click_tienda', { tienda: t.nombre })}
          >
            <span className="tiendas__logo" style={t.fondo ? { background: t.fondo } : undefined}>
              {t.logo ? (
                <img src={t.logo} alt={t.nombre} loading="lazy" />
              ) : (
                <span className="tiendas__texto">{t.nombre}</span>
              )}
            </span>
            {detalle && (
              <span className="tiendas__info">
                <strong>{t.nombre}</strong>
                <small>{t.tipo}</small>
                <span>{t.descripcion}</span>
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default LogosTiendas;
