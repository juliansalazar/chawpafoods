import Seo from '../components/Seo';
import HorarioCafe from '../components/HorarioCafe';
import MenuSection from '../components/MenuSection';
import MapaCafe from '../components/MapaCafe';
import WhatsAppBoton from '../components/WhatsAppBoton';
import { cafe, direccionCompleta } from '../data/cafe';
import './Paginas.css';

const DIAS_SCHEMA = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Datos estructurados para Google (solo incluye los campos que tienen valor).
function jsonLdCafe() {
  const datos = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: cafe.nombre,
    description: cafe.descripcion,
    image: cafe.fotos.map((f) => new URL(f.src, window.location.origin).href),
    servesCuisine: ['Ecuatoriana', 'Café', 'Pan de yuca'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: cafe.direccion || undefined,
      addressLocality: cafe.ciudad,
      postalCode: cafe.codigoPostal || undefined,
      addressCountry: cafe.pais,
    },
    telephone: cafe.telefono || undefined,
    priceRange: cafe.rangoPrecios || undefined,
    sameAs: [cafe.instagram, cafe.facebook].filter(Boolean),
    hasMap: cafe.googleMapsUrl || undefined,
    geo: cafe.geo
      ? { '@type': 'GeoCoordinates', latitude: cafe.geo.lat, longitude: cafe.geo.lng }
      : undefined,
    openingHoursSpecification: cafe.horarios.flatMap((h) =>
      h.turnos.map(([abre, cierra]) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DIAS_SCHEMA[h.dia],
        opens: abre,
        closes: cierra,
      })),
    ),
  };
  return JSON.parse(JSON.stringify(datos)); // elimina los campos undefined
}

function Cafe() {
  return (
    <>
      <Seo
        titulo={`${cafe.nombre} – Pan de yuca y café en Quito`}
        descripcion={`${cafe.descripcion} ${direccionCompleta()}.`}
        jsonLd={jsonLdCafe()}
      />

      <section className="pagina-hero">
        <div className="contenedor">
          <span className="eyebrow">Nuestro primer local</span>
          <h1>{cafe.nombre}</h1>
          <p>{cafe.descripcion}</p>
        </div>
      </section>

      {cafe.fotos.length > 0 && (
        <section className="seccion seccion--blanca">
          <div className="contenedor galeria">
            {cafe.fotos.map((f) => (
              <img key={f.src} src={f.src} alt={f.alt} loading="lazy" />
            ))}
          </div>
        </section>
      )}

      <section className="seccion">
        <div className="contenedor">
          <div className="seccion__encabezado">
            <span className="eyebrow">Menú</span>
            <h2>¿Qué hay en Chawpa Café?</h2>
            <p>
              Pan de yuca sin gluten recién horneado, opciones saludables y café ecuatoriano. La
              mayoría de productos para consumir aquí cuestan entre {cafe.rangoPrecios}.
            </p>
          </div>
          <MenuSection />
        </div>
      </section>

      <section className="seccion seccion--blanca">
        <div className="contenedor">
          <div className="seccion__encabezado">
            <span className="eyebrow">El lugar</span>
            <h2>Ven solo, en familia o con tu perro</h2>
          </div>
          <ul className="caracteristicas">
            {cafe.caracteristicas.map((c) => (
              <li key={c.texto}>
                <span aria-hidden="true">{c.icono}</span> {c.texto}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="seccion" id="visitanos">
        <div className="contenedor dos-columnas">
          <div>
            <span className="eyebrow">Visítanos</span>
            <h2>Horarios y ubicación</h2>
            <p className="cafe-destacado__dato">📍 {direccionCompleta()}</p>
            {cafe.referencia && <p className="cafe-referencia">{cafe.referencia}.</p>}
            {cafe.telefono && (
              <p>
                📞{' '}
                <a className="cafe-telefono" href={`tel:${cafe.telefono.replace(/\s/g, '')}`}>
                  {cafe.telefono}
                </a>
              </p>
            )}
            <HorarioCafe />
            {cafe.notaHorarios && <p className="placeholder-nota">{cafe.notaHorarios}</p>}
            {(cafe.instagram || cafe.facebook) && (
              <p>
                Síguenos:{' '}
                {cafe.instagram && (
                  <a href={cafe.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram {cafe.instagramUsuario}
                  </a>
                )}
                {cafe.instagram && cafe.facebook && ' · '}
                {cafe.facebook && (
                  <a href={cafe.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                )}
              </p>
            )}
            <div className="acciones">
              <WhatsAppBoton
                ubicacion="cafe"
                mensaje="Hola Chawpa Café! Quisiera hacer un pedido para llevar."
              >
                Pedir para llevar por WhatsApp
              </WhatsAppBoton>
            </div>
          </div>
          <MapaCafe />
        </div>
      </section>
    </>
  );
}

export default Cafe;
