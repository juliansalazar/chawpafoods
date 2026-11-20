import Seo from '../components/Seo';
import CafeHighlight from '../components/CafeHighlight';
import WhatsAppBoton from '../components/WhatsAppBoton';
import LogosTiendas from '../components/LogosTiendas';
import { puntosDeVenta } from '../data/contacto';
import './Paginas.css';

function DondeComprar() {
  return (
    <>
      <Seo
        titulo="Dónde comprar"
        descripcion="Encuentra pan de yuca Chawpa en Chawpa Café (La Cerámica, Quito), Tipti, Supermaxi, Megamaxi, Italdeli (Cuenca) y con delivery a Quito Norte, Cumbayá y Tumbaco."
      />

      <section className="pagina-hero">
        <div className="contenedor">
          <span className="eyebrow">Puntos de venta</span>
          <h1>Dónde comprar</h1>
          <p>Visítanos en nuestro café, búscanos en el supermercado, compra en línea en Tipti o pide a domicilio.</p>
        </div>
      </section>

      <CafeHighlight />

      <section className="seccion">
        <div className="contenedor">
          <div className="seccion__encabezado">
            <span className="eyebrow">Tiendas</span>
            <h2>Supermercados y compra en línea</h2>
            <p>Busca nuestros panes de yuca congelados y la premezcla en estas tiendas.</p>
          </div>
          <LogosTiendas detalle />
        </div>
      </section>

      <section className="seccion seccion--blanca">
        <div className="contenedor puntos">
          <div className="tarjeta puntos__item">
            <span className="puntos__icono" aria-hidden="true">🛵</span>
            <h3>Delivery</h3>
            <p>Llevamos tu pedido a:</p>
            <ul>
              {puntosDeVenta.zonasDelivery.map((z) => (
                <li key={z}>{z}</li>
              ))}
            </ul>
            <WhatsAppBoton
              ubicacion="donde-comprar:delivery"
              mensaje="Hola, soy un cliente de Chawpa Foods! Quiero hacer un pedido a domicilio."
            >
              Pedir a domicilio
            </WhatsAppBoton>
          </div>
          <div className="tarjeta puntos__item">
            <span className="puntos__icono" aria-hidden="true">🤝</span>
            <h3>Ventas al por mayor</h3>
            <p>¿Tienes una tienda, cafetería o restaurante? Distribuye productos Chawpa.</p>
            <WhatsAppBoton
              className="boton boton--secundario"
              ubicacion="donde-comprar:mayorista"
              mensaje="Hola Chawpa! Me interesa vender sus productos en mi negocio."
            >
              Quiero ser distribuidor
            </WhatsAppBoton>
          </div>
        </div>
      </section>
    </>
  );
}

export default DondeComprar;
