import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { redes } from '../data/contacto';
import { fichaMezcla, formasDeHornear, ideas, pasosCongelados, pasosMezcla } from '../data/guia';
import { track } from '../lib/analytics';
import './Paginas.css';
import './ComoHornear.css';

function ComoHornear() {
  const usuario = redes.usuario;

  return (
    <>
      <Seo
        titulo="Cómo hornear pan de yuca"
        descripcion="Guía para preparar la Mezcla y los panes de yuca congelados Chawpa en horno o air fryer, más ideas: wafflera, sanduchera, base de pizza y más."
      />

      <section className="pagina-hero">
        <div className="contenedor">
          <span className="eyebrow">Ayuda</span>
          <h1>Cómo hornear tu pan de yuca</h1>
          <p>Paso a paso para la Mezcla y los congelados, y muchas ideas para disfrutarlos.</p>
          <nav className="guia-indice" aria-label="Secciones de la guía">
            <a href="#mezcla">Mezcla</a>
            <a href="#congelados">Congelados y Bites</a>
            <a href="#ideas">Ideas</a>
          </nav>
        </div>
      </section>

      {/* Mezcla */}
      <section className="seccion" id="mezcla">
        <div className="contenedor">
          <div className="seccion__encabezado">
            <span className="eyebrow">Mezcla para pan de yuca</span>
            <h2>1. Forma los panes</h2>
            <p>Solo necesitas agua. Rinde 16 panes.</p>
          </div>
          <ol className="pasos">
            {pasosMezcla.map((p, i) => (
              <li key={p.titulo} className="tarjeta pasos__item">
                <span className="pasos__numero">{i + 1}</span>
                <span className="pasos__icono" aria-hidden="true">{p.icono}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ol>

          <div className="seccion__encabezado guia-subtitulo">
            <h2>2. Hornéalos</h2>
          </div>
          <div className="hornear">
            {formasDeHornear.map((f) => (
              <div key={f.titulo} className="tarjeta hornear__item">
                <span className="pasos__icono" aria-hidden="true">{f.icono}</span>
                <h3>{f.titulo}</h3>
                <div className="hornear__datos">
                  <span>🌡️ {f.temperatura}</span>
                  <span>⏱️ {f.tiempo}</span>
                </div>
                <p>{f.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Congelados */}
      <section className="seccion seccion--blanca" id="congelados">
        <div className="contenedor dos-columnas">
          <div>
            <span className="eyebrow">Congelados y Bites</span>
            <h2>Del congelador al horno</h2>
            <ol className="producto-detalle__pasos">
              {pasosCongelados.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
            <Link to="/productos?categoria=congelado" className="boton boton--secundario">
              Ver congelados
            </Link>
          </div>
          <img
            src="/congelado.webp"
            alt="Pan de yuca congelado Chawpa"
            width="300"
            height="300"
            loading="lazy"
            className="imagen-redondeada"
          />
        </div>
      </section>

      {/* Versatilidad */}
      <section className="seccion" id="ideas">
        <div className="contenedor">
          <div className="seccion__encabezado">
            <span className="eyebrow">Un producto, mil formas</span>
            <h2>No solo en bolitas</h2>
            <p>
              La masa de pan de yuca es súper versátil: pruébala en la wafflera, la sanduchera, la air
              fryer o como base de pizza.
            </p>
          </div>
          <div className="ideas">
            {ideas.map((idea) => (
              <div key={idea.titulo} className="tarjeta ideas__item">
                <span className="ideas__icono" aria-hidden="true">{idea.icono}</span>
                <h3>{idea.titulo}</h3>
                <p>{idea.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Redes */}
      <section className="seccion seccion--verde">
        <div className="contenedor seccion__encabezado">
          <span className="eyebrow guia-eyebrow-claro">Comparte y gana</span>
          <h2>¿Cómo usas tu Chawpa?</h2>
          <p>
            Comenta en redes cómo preparas tu pan de yuca
            {usuario ? (
              <>
                {' '}y etiquétanos en <strong>{usuario}</strong>
              </>
            ) : (
              ' y etiquétanos'
            )}
            . ¡Participa por premios y beneficios!
          </p>
          <div className="acciones acciones--centro">
            {redes.instagram && (
              <a
                href={redes.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="boton boton--claro"
                onClick={() => track('click_redes', { red: 'instagram', ubicacion: 'guia' })}
              >
                Instagram
              </a>
            )}
            {redes.facebook && (
              <a
                href={redes.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={`boton ${redes.instagram ? 'boton--contorno-claro' : 'boton--claro'}`}
                onClick={() => track('click_redes', { red: 'facebook', ubicacion: 'guia' })}
              >
                Facebook
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Ficha */}
      <section className="seccion">
        <div className="contenedor">
          <details className="tarjeta ficha">
            <summary>Información de la Mezcla: ingredientes y conservación</summary>
            <dl>
              <dt>Ingredientes</dt>
              <dd>{fichaMezcla.ingredientes}</dd>
              <dt>Alérgenos</dt>
              <dd>{fichaMezcla.alergenos}</dd>
              <dt>Conservación</dt>
              <dd>{fichaMezcla.conservacion}</dd>
              <dt>Registro</dt>
              <dd>{fichaMezcla.registro}</dd>
            </dl>
          </details>
        </div>
      </section>
    </>
  );
}

export default ComoHornear;
