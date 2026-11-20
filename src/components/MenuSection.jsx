import { useEffect, useRef } from 'react';
import { cafe } from '../data/cafe';
import { formatoPrecio } from '../data/products';
import { track } from '../lib/analytics';
import './Cafe.css';

function MenuSection() {
  const ref = useRef(null);

  // Registra "ver_menu" una sola vez, cuando el menú entra en pantalla.
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(([entrada]) => {
      if (entrada.isIntersecting) {
        track('ver_menu');
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="menu" ref={ref}>
      {cafe.menu.map((grupo) => (
        <div key={grupo.categoria} className="menu__grupo tarjeta">
          <h3>{grupo.categoria}</h3>
          <ul>
            {grupo.items.map((item) => (
              <li key={item.nombre} className="menu__item">
                <div>
                  <span className="menu__nombre">{item.nombre}</span>
                  {item.descripcion && <p>{item.descripcion}</p>}
                </div>
                {item.precio != null && (
                  <span className="menu__precio">
                    {item.desde && 'desde '}
                    {formatoPrecio(item.precio)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MenuSection;
