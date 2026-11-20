import { Link } from 'react-router-dom';
import HeroOrbita from './HeroOrbita';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero">
      <div className="contenedor hero__interior">
        <div className="hero__texto">
          <span className="eyebrow hero__eyebrow">Pan de yuca sin gluten · Quito</span>
          <h1>Sabores de la mitad del mundo</h1>
          <p>
            Pan de yuca con receta manabita, hecho a mano con ingredientes andinos. Ahora también
            puedes disfrutarlo recién horneado en <strong>Chawpa Café</strong>, nuestro primer local
            en La Cerámica.
          </p>
          <div className="acciones">
            <Link to="/cafe" className="boton boton--claro">
              Visita Chawpa Café
            </Link>
            <Link to="/productos" className="boton boton--contorno-claro">
              Ver productos
            </Link>
          </div>
        </div>

        <div className="hero__visual">
          <HeroOrbita />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
