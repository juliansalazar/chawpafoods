import { cafe, comoLlegarUrl, direccionCompleta } from '../data/cafe';
import { track } from '../lib/analytics';
import './Cafe.css';

function MapaCafe() {
  return (
    <div className="mapa">
      {cafe.googleMapsEmbed ? (
        <iframe
          src={cafe.googleMapsEmbed}
          title={`Mapa de ${cafe.nombre}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="mapa__placeholder">
          <p>📍 {direccionCompleta()}</p>
          <p className="placeholder-nota">El mapa aparecerá aquí cuando se agregue la ubicación.</p>
        </div>
      )}
      <a
        href={comoLlegarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="boton"
        onClick={() => track('click_como_llegar', { ubicacion: 'mapa' })}
      >
        Cómo llegar
      </a>
    </div>
  );
}

export default MapaCafe;
