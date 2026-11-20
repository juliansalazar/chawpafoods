import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import './Paginas.css';

function NoEncontrado() {
  return (
    <>
      <Seo titulo="Página no encontrada" noindex />
      <section className="seccion">
        <div className="contenedor seccion__encabezado">
          <span className="eyebrow">Error 404</span>
          <h1>Esta página se nos quemó en el horno</h1>
          <p>No encontramos lo que buscabas. Vuelve al inicio o mira nuestros productos.</p>
          <div className="acciones acciones--centro">
            <Link to="/" className="boton">Ir al inicio</Link>
            <Link to="/productos" className="boton boton--secundario">Ver productos</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default NoEncontrado;
