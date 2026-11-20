import { Link } from 'react-router-dom';
import { cafe, direccionCompleta, comoLlegarUrl } from '../data/cafe';
import { redes, whatsappUrl } from '../data/contacto';
import { track } from '../lib/analytics';
import HorarioCafe from './HorarioCafe';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="contenedor footer__grilla">
        <div>
          <img src="/logo.png" alt="Chawpa" width="64" height="64" className="footer__logo" />
          <p>
            Pan de yuca artesanal con receta manabita, elaborado con ingredientes de la mitad del
            mundo.
          </p>
        </div>

        <div>
          <h3>{cafe.nombre}</h3>
          <p>{direccionCompleta()}</p>
          {cafe.referencia && <p>{cafe.referencia}.</p>}
          <HorarioCafe compacto />
          <a
            href={comoLlegarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('click_como_llegar', { ubicacion: 'footer' })}
          >
            Cómo llegar →
          </a>
        </div>

        <div>
          <h3>Explora</h3>
          <ul className="footer__enlaces">
            <li><Link to="/cafe">Chawpa Café</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/como-hornear">Cómo hornear</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/donde-comprar">Dónde comprar</Link></li>
          </ul>
        </div>

        <div>
          <h3>Contacto</h3>
          <ul className="footer__enlaces">
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('click_whatsapp', { ubicacion: 'footer' })}
              >
                WhatsApp
              </a>
            </li>
            {redes.facebook && (
              <li><a href={redes.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
            )}
            {redes.instagram && (
              <li><a href={redes.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            )}
          </ul>
        </div>
      </div>

      <p className="footer__legal">
        &copy; {new Date().getFullYear()} Chawpa. Todos los derechos reservados.
      </p>
    </footer>
  );
}

export default Footer;
