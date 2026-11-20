import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCarrito } from '../lib/carrito';
import './Navbar.css';

const enlaces = [
  { to: '/', texto: 'Inicio', end: true },
  { to: '/cafe', texto: 'Café' },
  { to: '/productos', texto: 'Productos' },
  { to: '/como-hornear', texto: 'Cómo hornear' },
  { to: '/nosotros', texto: 'Nosotros' },
  { to: '/donde-comprar', texto: 'Dónde comprar' },
];

function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();
  const { unidades } = useCarrito();

  // Cierra el menú móvil al cambiar de página.
  useEffect(() => setAbierto(false), [pathname]);

  return (
    <header className="navbar">
      <div className="contenedor navbar__interior">
        <Link to="/" className="navbar__logo" aria-label="Chawpa – inicio">
          <img src="/logo.png" alt="Chawpa" width="56" height="56" />
        </Link>

        <Link
          to="/carrito"
          className="navbar__carrito"
          aria-label={unidades ? `Carrito, ${unidades} productos` : 'Carrito vacío'}
        >
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
            <path
              d="M3 4h2l2.4 10.2a1.5 1.5 0 0 0 1.5 1.1h8.6a1.5 1.5 0 0 0 1.4-1l2.1-6.3H6.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9.5" cy="19.5" r="1.5" fill="currentColor" />
            <circle cx="17" cy="19.5" r="1.5" fill="currentColor" />
          </svg>
          {unidades > 0 && <span className="navbar__contador">{unidades}</span>}
        </Link>

        <button
          className="navbar__toggle"
          aria-expanded={abierto}
          aria-controls="menu-principal"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setAbierto((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="menu-principal" className={`navbar__menu ${abierto ? 'is-abierto' : ''}`}>
          <ul>
            {enlaces.map((e) => (
              <li key={e.to}>
                <NavLink to={e.to} end={e.end}>
                  {e.texto}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/cafe" className="boton navbar__cta">
            Visítanos
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
