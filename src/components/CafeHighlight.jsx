import { Link } from 'react-router-dom';
import { cafe, comoLlegarUrl, direccionCompleta } from '../data/cafe';
import { track } from '../lib/analytics';
import HorarioCafe from './HorarioCafe';
import './Cafe.css';

/** Bloque destacado del café para la página de inicio. */
function CafeHighlight() {
  const foto = cafe.fotos[0];

  return (
    <section className="seccion seccion--blanca">
      <div className="contenedor cafe-destacado">
        <div className="cafe-destacado__visual">
          {foto ? (
            <img src={foto.src} alt={foto.alt} loading="lazy" />
          ) : (
            <div className="cafe-destacado__placeholder" aria-hidden="true">
              <img src="/logo.png" alt="" width="120" height="120" />
              <span>Chawpa Café</span>
            </div>
          )}
        </div>
        <div>
          <span className="eyebrow">Nuevo · La Cerámica, Quito</span>
          <h2>Visita {cafe.nombre}</h2>
          <p>{cafe.descripcion}</p>
          <p className="cafe-destacado__dato">📍 {direccionCompleta()}</p>
          {cafe.referencia && <p className="cafe-referencia">{cafe.referencia}.</p>}
          <HorarioCafe compacto />
          <div className="acciones">
            <Link to="/cafe" className="boton">
              Ver menú y horarios
            </Link>
            <a
              href={comoLlegarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="boton boton--secundario"
              onClick={() => track('click_como_llegar', { ubicacion: 'inicio' })}
            >
              Cómo llegar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CafeHighlight;
