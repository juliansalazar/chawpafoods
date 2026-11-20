import { useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import ProductCard from '../components/ProductCard';
import { categorias, products } from '../data/products';
import './Paginas.css';

const FILTROS = [{ id: 'todos', texto: 'Todos' }].concat(
  Object.entries(categorias).map(([id, texto]) => ({ id, texto })),
);

function Productos() {
  // El filtro vive en la URL (?categoria=congelado) para poder compartir el enlace.
  const [params, setParams] = useSearchParams();
  const filtro = params.get('categoria') || 'todos';
  const lista = filtro === 'todos' ? products : products.filter((p) => p.categoria === filtro);

  const elegir = (id) => setParams(id === 'todos' ? {} : { categoria: id }, { replace: true });

  return (
    <>
      <Seo
        titulo="Productos – Pan de yuca congelado y mezcla"
        descripcion="Pan de yuca congelado listo para hornear (natural, caprese, finas hierbas, Nutella, manjar) y mezcla para pan de yuca. Pide por WhatsApp en Quito."
      />

      <section className="pagina-hero">
        <div className="contenedor">
          <span className="eyebrow">Para hornear en casa</span>
          <h1>Nuestros productos</h1>
          <p>
            Pan de yuca artesanal congelado, listo para hornear, y nuestra mezcla para prepararlo tú
            mismo. Pídelos por WhatsApp o encuéntralos en Chawpa Café, Tipti, Supermaxi, Megamaxi e Italdeli.
          </p>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <div className="filtros" role="group" aria-label="Filtrar por categoría">
            {FILTROS.map((f) => (
              <button
                key={f.id}
                className={`boton ${filtro === f.id ? '' : 'boton--secundario'}`}
                aria-pressed={filtro === f.id}
                onClick={() => elegir(f.id)}
              >
                {f.texto}
              </button>
            ))}
          </div>
          <div className="grilla">
            {lista.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Productos;
