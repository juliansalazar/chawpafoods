import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import HeroSection from '../components/HeroSection';
import CafeHighlight from '../components/CafeHighlight';
import ProductCard from '../components/ProductCard';
import WhatsAppBoton from '../components/WhatsAppBoton';
import LogosTiendas from '../components/LogosTiendas';
import { products } from '../data/products';
import { puntosDeVenta } from '../data/contacto';
import './Paginas.css';

function Inicio() {
  const destacados = products.filter((p) => p.destacado);

  return (
    <>
      <Seo />
      <HeroSection />
      <CafeHighlight />

      <section className="seccion">
        <div className="contenedor">
          <div className="seccion__encabezado">
            <span className="eyebrow">Para hornear en casa</span>
            <h2>Nuestros productos</h2>
            <p>Pan de yuca congelado listo para hornear y nuestra mezcla: solo agrega agua.</p>
          </div>
          <div className="grilla">
            {destacados.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
          <div className="acciones acciones--centro" style={{ marginTop: 32 }}>
            <Link to="/productos" className="boton boton--secundario">
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      <section className="seccion seccion--blanca">
        <div className="contenedor">
          <div className="seccion__encabezado">
            <span className="eyebrow">Dónde comprar</span>
            <h2>Encuéntranos en</h2>
          </div>
          <div className="puntos">
            <div className="tarjeta puntos__item">
              <span className="puntos__icono" aria-hidden="true">☕</span>
              <h3>Chawpa Café</h3>
              <p>Pan de yuca recién horneado y productos para llevar.</p>
              <Link to="/cafe">Visítanos →</Link>
            </div>
            <div className="tarjeta puntos__item">
              <span className="puntos__icono" aria-hidden="true">🛒</span>
              <h3>Supermercados y online</h3>
              <p>Tipti, Supermaxi, Megamaxi e Italdeli (Cuenca).</p>
              <Link to="/donde-comprar">Ver puntos de venta →</Link>
            </div>
            <div className="tarjeta puntos__item">
              <span className="puntos__icono" aria-hidden="true">🛵</span>
              <h3>Delivery</h3>
              <p>{puntosDeVenta.zonasDelivery.join(', ')}.</p>
              <WhatsAppBoton
                className=""
                ubicacion="inicio:delivery"
                mensaje="Hola, soy un cliente de Chawpa Foods! Quiero hacer un pedido a domicilio."
              >
                Pedir por WhatsApp →
              </WhatsAppBoton>
            </div>
          </div>
          <h3 className="tiendas-titulo">También nos encuentras en</h3>
          <LogosTiendas />
        </div>
      </section>

      <section className="seccion seccion--verde">
        <div className="contenedor seccion__encabezado">
          <h2>¿Antojo de pan de yuca?</h2>
          <p>Escríbenos y te ayudamos con tu pedido, eventos o ventas al por mayor.</p>
          <div className="acciones acciones--centro">
            <WhatsAppBoton className="boton boton--claro" ubicacion="inicio:cta" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Inicio;
