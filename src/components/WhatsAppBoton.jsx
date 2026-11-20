import { whatsappUrl } from '../data/contacto';
import { track } from '../lib/analytics';

/** Enlace a WhatsApp con mensaje prellenado y evento de analítica. */
function WhatsAppBoton({ mensaje, ubicacion, className = 'boton', children = 'Escríbenos por WhatsApp' }) {
  return (
    <a
      href={whatsappUrl(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track('click_whatsapp', { ubicacion })}
    >
      {children}
    </a>
  );
}

export default WhatsAppBoton;
