import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import WhatsAppBoton from '../components/WhatsAppBoton';
import './Paginas.css';

const valores = [
  {
    icono: '🌾',
    titulo: 'Ingredientes andinos',
    texto: 'Trabajamos con granos enteros y vegetales andinos, mínimamente procesados.',
  },
  {
    icono: '🤲',
    titulo: 'Hecho a mano',
    texto: 'Cada pan de yuca se elabora artesanalmente, en pequeños lotes.',
  },
  {
    icono: '🏡',
    titulo: 'Empresa familiar',
    texto: 'Somos una familia ecuatoriana que comparte los sabores de la mitad del mundo.',
  },
];

function Nosotros() {
  return (
    <>
      <Seo
        titulo="Nosotros"
        descripcion="Chawpa es una empresa familiar ecuatoriana que elabora pan de yuca artesanal con receta manabita y vegetales andinos."
      />

      <section className="pagina-hero">
        <div className="contenedor">
          <span className="eyebrow">Sobre nosotros</span>
          <h1>Sabores de la mitad del mundo</h1>
          <p>
            Chawpa es una empresa familiar dedicada a producir alimentos saludables, mínimamente
            procesados y elaborados artesanalmente con granos enteros y vegetales andinos.
          </p>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor dos-columnas">
          <div>
            <h2>Nuestra historia</h2>
            {/* TODO: reemplazar con la historia real de la familia y la marca. */}
            <p>
              Todo empezó con la receta manabita de pan de yuca que se horneaba en casa. Quisimos
              compartir ese sabor con más familias, así que empezamos a prepararlo de forma
              artesanal y congelado, listo para hornear.
            </p>
            <p>
              Hoy nuestros panes de yuca llegan a supermercados y hogares en Quito y Cuenca, y en línea a través de Tipti. Además abrimos{' '}
              <Link to="/cafe">Chawpa Café</Link>, nuestro primer local, para que puedas disfrutarlos
              recién salidos del horno.
            </p>
          </div>
          <img
            src="/mezcla2.webp"
            alt="Mezcla para pan de yuca Chawpa"
            width="1080"
            height="1080"
            loading="lazy"
            className="imagen-redondeada"
          />
        </div>
      </section>

      <section className="seccion seccion--blanca">
        <div className="contenedor">
          <div className="seccion__encabezado">
            <h2>Lo que nos mueve</h2>
          </div>
          <div className="puntos">
            {valores.map((v) => (
              <div key={v.titulo} className="tarjeta puntos__item">
                <span className="puntos__icono" aria-hidden="true">{v.icono}</span>
                <h3>{v.titulo}</h3>
                <p>{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion seccion--verde">
        <div className="contenedor seccion__encabezado">
          <h2>Hablemos</h2>
          <p>¿Quieres vender nuestros productos o tienes un evento? Escríbenos.</p>
          <div className="acciones acciones--centro">
            <WhatsAppBoton className="boton boton--claro" ubicacion="nosotros">
              Contáctanos
            </WhatsAppBoton>
          </div>
        </div>
      </section>
    </>
  );
}

export default Nosotros;
