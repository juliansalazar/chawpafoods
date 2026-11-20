import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { getProducto } from '../data/products';
import { track } from './analytics';

// El carrito guarda solo { slug: cantidad }. Precios y nombres se leen siempre del
// catálogo, así un cambio de precio en products.js nunca deja un total viejo guardado.

const CLAVE = 'chawpa:carrito';
const MAX_POR_PRODUCTO = 50;

const CarritoContext = createContext(null);

function leerGuardado() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE));
    return datos && typeof datos === 'object' ? datos : {};
  } catch {
    return {};
  }
}

function reducer(estado, accion) {
  switch (accion.tipo) {
    case 'fijar': {
      const cantidad = Math.max(0, Math.min(MAX_POR_PRODUCTO, accion.cantidad));
      const nuevo = { ...estado };
      if (cantidad > 0) nuevo[accion.slug] = cantidad;
      else delete nuevo[accion.slug];
      return nuevo;
    }
    case 'vaciar':
      return {};
    default:
      return estado;
  }
}

export function CarritoProvider({ children }) {
  const [cantidades, dispatch] = useReducer(reducer, undefined, leerGuardado);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(cantidades));
    } catch {
      // Navegación privada o almacenamiento bloqueado: el carrito vive solo en memoria.
    }
  }, [cantidades]);

  const valor = useMemo(() => {
    const items = Object.entries(cantidades)
      .map(([slug, cantidad]) => ({ producto: getProducto(slug), cantidad }))
      .filter((i) => i.producto); // descarta productos que ya no existen
    const subtotal = items.reduce((s, i) => s + i.producto.precio * i.cantidad, 0);
    const unidades = items.reduce((s, i) => s + i.cantidad, 0);

    return {
      items,
      subtotal,
      unidades,
      cantidadDe: (slug) => cantidades[slug] || 0,
      fijar: (slug, cantidad) => dispatch({ tipo: 'fijar', slug, cantidad }),
      agregar: (producto, ubicacion) => {
        dispatch({ tipo: 'fijar', slug: producto.slug, cantidad: (cantidades[producto.slug] || 0) + 1 });
        track('add_to_cart', { producto: producto.slug, precio: producto.precio, ubicacion });
      },
      vaciar: () => dispatch({ tipo: 'vaciar' }),
    };
  }, [cantidades]);

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>');
  return ctx;
}
