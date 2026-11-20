import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Seo from '../components/Seo';
import { CarritoVacio } from './Carrito';
import { useCarrito } from '../lib/carrito';
import { track } from '../lib/analytics';
import { armarMensajePedido } from '../lib/mensajePedido';
import { whatsappUrl } from '../data/contacto';
import { formatoPrecio } from '../data/products';
import {
  PEDIDO_MINIMO,
  fechaMinimaEntrega,
  franjas,
  generarNumeroPedido,
  getZona,
  metodosPago,
  zonas,
} from '../data/pedido';
import './Pedido.css';

// Datos del cliente que recordamos para su próximo pedido (no fecha, horario ni notas).
const CLAVE_CLIENTE = 'chawpa:cliente';
const CAMPOS_RECORDADOS = [
  'nombre', 'telefono', 'email', 'zona', 'direccion', 'referencia',
  'metodoPago', 'factura', 'razonSocial', 'identificacion', 'emailFactura',
];

const VACIO = {
  nombre: '',
  telefono: '',
  email: '',
  zona: '',
  direccion: '',
  referencia: '',
  fecha: '',
  franja: '',
  metodoPago: metodosPago[0].id,
  factura: 'consumidor-final',
  razonSocial: '',
  identificacion: '',
  emailFactura: '',
  notas: '',
};

function leerCliente() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_CLIENTE)) || {};
    const limpio = Object.fromEntries(
      CAMPOS_RECORDADOS.filter((k) => typeof guardado[k] === 'string').map((k) => [k, guardado[k]]),
    );
    if (limpio.zona && !getZona(limpio.zona)) delete limpio.zona;
    return { ...VACIO, ...limpio };
  } catch {
    return VACIO;
  }
}

function guardarCliente(datos) {
  try {
    const recordar = Object.fromEntries(CAMPOS_RECORDADOS.map((k) => [k, datos[k]]));
    localStorage.setItem(CLAVE_CLIENTE, JSON.stringify(recordar));
  } catch {
    // Sin almacenamiento: no pasa nada, solo no lo recordamos.
  }
}

const soloDigitos = (s) => s.replace(/\D/g, '');
const emailValido = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

function validar(d, zona) {
  const e = {};
  if (d.nombre.trim().length < 3) e.nombre = 'Escribe tu nombre y apellido.';
  if (!/^(593|0)?9\d{8}$/.test(soloDigitos(d.telefono))) {
    e.telefono = 'Escribe un celular válido, p. ej. 099 123 4567.';
  }
  if (d.email && !emailValido(d.email)) e.email = 'Revisa tu correo.';
  if (!zona) e.zona = 'Elige cómo quieres recibir tu pedido.';
  if (zona && !zona.retiro && d.direccion.trim().length < 8) {
    e.direccion = 'Escribe la dirección completa (calles y número).';
  }
  if (!d.fecha) e.fecha = 'Elige una fecha.';
  else if (d.fecha < fechaMinimaEntrega()) e.fecha = 'Elige una fecha a partir de mañana.';
  if (!d.franja) e.franja = 'Elige un horario.';
  if (d.factura === 'datos') {
    if (d.razonSocial.trim().length < 3) e.razonSocial = 'Escribe el nombre o razón social.';
    if (![10, 13].includes(soloDigitos(d.identificacion).length)) {
      e.identificacion = 'La cédula tiene 10 dígitos y el RUC 13.';
    }
    if (!emailValido(d.emailFactura)) e.emailFactura = 'Necesitamos un correo para enviarte la factura.';
  }
  return e;
}

function Pedido() {
  const { items, subtotal, vaciar } = useCarrito();
  const [datos, setDatos] = useState(leerCliente);
  const [errores, setErrores] = useState({});
  const [confirmado, setConfirmado] = useState(null); // { numero, url, total }

  const zona = getZona(datos.zona);
  const envio = zona ? zona.costo : 0;
  const total = subtotal + envio;

  useEffect(() => {
    if (items.length > 0) track('begin_checkout', { subtotal, unidades: items.length });
    // Solo al entrar a la página.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (confirmado) return <Confirmacion {...confirmado} />;
  if (items.length === 0) return <CarritoVacio />;
  if (subtotal < PEDIDO_MINIMO) return <Navigate to="/carrito" replace />;

  const cambiar = (campo) => (ev) => {
    const valor = ev.target.value;
    setDatos((d) => ({ ...d, [campo]: valor }));
    if (errores[campo]) {
      setErrores((e) => {
        const resto = { ...e };
        delete resto[campo];
        return resto;
      });
    }
  };

  const enviar = (ev) => {
    ev.preventDefault();
    const e = validar(datos, zona);
    setErrores(e);
    if (Object.keys(e).length > 0) {
      // Lleva al primer campo con error.
      const primero = ev.currentTarget.querySelector(`[name="${Object.keys(e)[0]}"]`);
      primero?.focus();
      return;
    }

    const numero = generarNumeroPedido();
    const metodoPago = metodosPago.find((m) => m.id === datos.metodoPago);
    const mensaje = armarMensajePedido({ numero, items, subtotal, zona, total, datos, metodoPago });
    const url = whatsappUrl(mensaje);

    track('enviar_pedido', { numero, total, subtotal, envio, zona: zona.id, metodo_pago: metodoPago.id });
    guardarCliente(datos);
    window.open(url, '_blank');
    vaciar();
    setConfirmado({ numero, url, total });
    window.scrollTo(0, 0);
  };

  const campo = (nombre) => ({
    id: `pedido-${nombre}`,
    name: nombre,
    value: datos[nombre],
    onChange: cambiar(nombre),
    'aria-invalid': errores[nombre] ? true : undefined,
    'aria-describedby': errores[nombre] ? `pedido-${nombre}-error` : undefined,
  });

  const error = (de) =>
    errores[de] ? (
      <span id={`pedido-${de}-error`} className="campo__error">
        {errores[de]}
      </span>
    ) : null;

  return (
    <>
      <Seo titulo="Finalizar pedido" noindex />
      <section className="seccion">
        <div className="contenedor">
          <nav className="migas" aria-label="Ruta de navegación">
            <Link to="/carrito">Carrito</Link> / <span>Datos del pedido</span>
          </nav>
          <h1>Finaliza tu pedido</h1>

          <form className="pedido-layout" onSubmit={enviar} noValidate>
            <div className="pedido-form">
              <fieldset className="tarjeta">
                <legend>1. Tus datos</legend>
                <div className="campo">
                  <label htmlFor="pedido-nombre">Nombre y apellido</label>
                  <input {...campo('nombre')} autoComplete="name" />
                  {error('nombre')}
                </div>
                <div className="campos-2">
                  <div className="campo">
                    <label htmlFor="pedido-telefono">Celular</label>
                    <input {...campo('telefono')} type="tel" inputMode="tel" autoComplete="tel" placeholder="099 123 4567" />
                    {error('telefono')}
                  </div>
                  <div className="campo">
                    <label htmlFor="pedido-email">
                      Correo <span className="campo__opcional">(opcional)</span>
                    </label>
                    <input {...campo('email')} type="email" autoComplete="email" />
                    {error('email')}
                  </div>
                </div>
              </fieldset>

              <fieldset className="tarjeta">
                <legend>2. Entrega</legend>
                <div className="opciones" role="radiogroup" aria-describedby={errores.zona ? 'pedido-zona-error' : undefined}>
                  {zonas.map((z) => (
                    <label key={z.id} className={`opcion ${datos.zona === z.id ? 'is-activa' : ''}`}>
                      <input
                        type="radio"
                        name="zona"
                        value={z.id}
                        checked={datos.zona === z.id}
                        onChange={cambiar('zona')}
                      />
                      <span className="opcion__texto">{z.nombre}</span>
                      <span className="opcion__precio">{z.costo ? formatoPrecio(z.costo) : 'Gratis'}</span>
                    </label>
                  ))}
                </div>
                {error('zona')}
                <p className="campo__ayuda">
                  ¿Tu sector no aparece? <a href={whatsappUrl('Hola, ¿hacen entregas en mi sector?')} target="_blank" rel="noopener noreferrer">Pregúntanos</a>.
                </p>

                {zona && !zona.retiro && (
                  <>
                    <div className="campo">
                      <label htmlFor="pedido-direccion">Dirección</label>
                      <input {...campo('direccion')} autoComplete="street-address" placeholder="Calle principal, número y calle secundaria" />
                      {error('direccion')}
                    </div>
                    <div className="campo">
                      <label htmlFor="pedido-referencia">
                        Referencia <span className="campo__opcional">(opcional)</span>
                      </label>
                      <input {...campo('referencia')} placeholder="Edificio, depto., casa esquinera…" />
                    </div>
                  </>
                )}

                <div className="campos-2">
                  <div className="campo">
                    <label htmlFor="pedido-fecha">{zona?.retiro ? 'Fecha de retiro' : 'Fecha de entrega'}</label>
                    <input {...campo('fecha')} type="date" min={fechaMinimaEntrega()} />
                    {error('fecha')}
                  </div>
                  <div className="campo">
                    <label htmlFor="pedido-franja">Horario</label>
                    <select {...campo('franja')}>
                      <option value="">Elige un horario</option>
                      {franjas.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                    {error('franja')}
                  </div>
                </div>
                <p className="campo__ayuda">
                  🧊 Los panes van congelados: guárdalos en el congelador apenas los recibas.
                </p>
              </fieldset>

              <fieldset className="tarjeta">
                <legend>3. Pago</legend>
                <div className="opciones">
                  {metodosPago.map((m) => (
                    <label key={m.id} className={`opcion ${datos.metodoPago === m.id ? 'is-activa' : ''}`}>
                      <input
                        type="radio"
                        name="metodoPago"
                        value={m.id}
                        checked={datos.metodoPago === m.id}
                        onChange={cambiar('metodoPago')}
                      />
                      <span className="opcion__texto">
                        {m.nombre}
                        <small>{m.detalle}</small>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="tarjeta">
                <legend>4. Factura</legend>
                <div className="opciones opciones--fila">
                  <label className={`opcion ${datos.factura === 'consumidor-final' ? 'is-activa' : ''}`}>
                    <input type="radio" name="factura" value="consumidor-final" checked={datos.factura === 'consumidor-final'} onChange={cambiar('factura')} />
                    <span className="opcion__texto">Consumidor final</span>
                  </label>
                  <label className={`opcion ${datos.factura === 'datos' ? 'is-activa' : ''}`}>
                    <input type="radio" name="factura" value="datos" checked={datos.factura === 'datos'} onChange={cambiar('factura')} />
                    <span className="opcion__texto">Con mis datos</span>
                  </label>
                </div>
                {datos.factura === 'datos' && (
                  <>
                    <div className="campo">
                      <label htmlFor="pedido-razonSocial">Nombre o razón social</label>
                      <input {...campo('razonSocial')} autoComplete="organization" />
                      {error('razonSocial')}
                    </div>
                    <div className="campos-2">
                      <div className="campo">
                        <label htmlFor="pedido-identificacion">Cédula o RUC</label>
                        <input {...campo('identificacion')} inputMode="numeric" />
                        {error('identificacion')}
                      </div>
                      <div className="campo">
                        <label htmlFor="pedido-emailFactura">Correo para la factura</label>
                        <input {...campo('emailFactura')} type="email" autoComplete="email" />
                        {error('emailFactura')}
                      </div>
                    </div>
                  </>
                )}
              </fieldset>

              <fieldset className="tarjeta">
                <legend>
                  Notas <span className="campo__opcional">(opcional)</span>
                </legend>
                <div className="campo">
                  <label htmlFor="pedido-notas" className="sr-only">Notas para tu pedido</label>
                  <textarea {...campo('notas')} rows="3" placeholder="Dejar en garita, tocar el timbre 2…" />
                </div>
              </fieldset>
            </div>

            <aside className="resumen tarjeta">
              <h2>Tu pedido</h2>
              <ul className="resumen__items">
                {items.map(({ producto, cantidad }) => (
                  <li key={producto.slug}>
                    <span>{cantidad} × {producto.name}</span>
                    <span>{formatoPrecio(producto.precio * cantidad)}</span>
                  </li>
                ))}
              </ul>
              <dl className="resumen__filas">
                <dt>Subtotal</dt>
                <dd>{formatoPrecio(subtotal)}</dd>
                <dt>{zona?.retiro ? 'Retiro' : 'Envío'}</dt>
                <dd className={zona ? '' : 'resumen__suave'}>
                  {zona ? (zona.costo ? formatoPrecio(zona.costo) : 'Gratis') : 'Elige tu zona'}
                </dd>
                <dt className="resumen__total">Total</dt>
                <dd className="resumen__total">{formatoPrecio(total)}</dd>
              </dl>
              <button type="submit" className="boton boton--ancho">
                Enviar pedido
              </button>
              <p className="resumen__nota">
                Se abrirá WhatsApp con tu pedido ya listo. Solo tienes que tocar enviar y te
                confirmamos.
              </p>
              <Link to="/carrito" className="resumen__seguir">
                ← Editar carrito
              </Link>
            </aside>
          </form>
        </div>
      </section>
    </>
  );
}

function Confirmacion({ numero, url, total }) {
  return (
    <>
      <Seo titulo="Pedido listo" noindex />
      <section className="seccion">
        <div className="contenedor seccion__encabezado">
          <span className="eyebrow">Pedido {numero}</span>
          <h1>¡Gracias! Tu pedido está listo</h1>
          <p>
            Abrimos WhatsApp con el detalle de tu pedido por {formatoPrecio(total)}. <strong>Toca
            enviar</strong> para que lo recibamos y te confirmemos la entrega.
          </p>
          <div className="acciones acciones--centro">
            <a href={url} target="_blank" rel="noopener noreferrer" className="boton">
              ¿No se abrió? Enviar por WhatsApp
            </a>
            <Link to="/productos" className="boton boton--secundario">
              Volver a productos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Pedido;
