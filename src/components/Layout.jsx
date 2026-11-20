import { Suspense, lazy, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { WHATSAPP_NUMERO } from '../data/contacto';
import { track } from '../lib/analytics';

// Se carga aparte: la librería pesa ~300 KB por sus imágenes y sonidos embebidos.
const FloatingWhatsApp = lazy(() =>
  import('react-floating-whatsapp').then((m) => ({ default: m.FloatingWhatsApp })),
);

function Layout() {
  const { pathname } = useLocation();
  // En el carrito y el checkout la burbuja tapa el botón de enviar en móvil.
  const mostrarBurbuja = !['/carrito', '/pedido'].includes(pathname);

  // Vuelve arriba al cambiar de página.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      {mostrarBurbuja && (
        <Suspense fallback={null}>
          <FloatingWhatsApp
            phoneNumber={WHATSAPP_NUMERO}
            accountName="Chawpa Foods"
            avatar="/logo.png"
            statusMessage="Normalmente responde en menos de una hora"
            chatMessage="Hola 🤝, ¿cómo podemos ayudarte hoy?"
            placeholder="Escribe tu mensaje…"
            allowEsc
            allowClickAway
            onSubmit={() => track('click_whatsapp', { ubicacion: 'flotante' })}
          />
        </Suspense>
      )}
    </>
  );
}

export default Layout;
