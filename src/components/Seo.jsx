import { Helmet } from 'react-helmet-async';

const SITIO = 'Chawpa';
const DESCRIPCION_DEFECTO =
  'Pan de yuca sin gluten con receta manabita. Visita Chawpa Café en La Cerámica, Quito, o pide nuestros panes de yuca congelados y premezcla por WhatsApp.';

// Título, descripción y datos estructurados por página.
// Las etiquetas Open Graph son fijas en index.html porque los bots de redes sociales no ejecutan JS.
function Seo({ titulo, descripcion = DESCRIPCION_DEFECTO, jsonLd, noindex = false }) {
  const tituloCompleto = titulo ? `${titulo} | ${SITIO}` : `${SITIO} – Pan de yuca y café en Quito`;
  return (
    <Helmet>
      <title>{tituloCompleto}</title>
      <meta name="description" content={descripcion} />
      {noindex && <meta name="robots" content="noindex" />}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}

export default Seo;
