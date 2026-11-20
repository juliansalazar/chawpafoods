import { useEffect, useRef } from 'react';
import { products } from '../data/products';
import './HeroOrbita.css';

// Fotos reales de los productos girando como lunas alrededor de un "planeta" pan de yuca,
// sobre la línea ecuatorial. Sin WebGL: solo DOM + requestAnimationFrame.
// Fotos de pan (no de empaques), que lucen bien recortadas en círculo.
const EN_ORBITA = ['natural', 'nutella', 'caprese', 'finas-hierbas', 'manjar-de-leche'];
const LUNAS = products.filter((p) => EN_ORBITA.includes(p.slug));
const VUELTA_MS = 28000; // duración de una vuelta completa
const INCLINACION = 0.32; // qué tan "achatada" se ve la órbita (0 = línea, 1 = círculo)

function HeroOrbita() {
  const escena = useRef(null);
  const lunas = useRef([]);

  useEffect(() => {
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame;
    const inicio = performance.now();

    const pintar = (ahora) => {
      const el = escena.current;
      if (!el) return;
      const rx = el.clientWidth * 0.46;
      const ry = rx * INCLINACION;
      const giro = reducir ? 0 : ((ahora - inicio) / VUELTA_MS) * Math.PI * 2;

      lunas.current.forEach((luna, i) => {
        if (!luna) return;
        const t = giro + (i / LUNAS.length) * Math.PI * 2;
        const x = Math.cos(t) * rx;
        const y = Math.sin(t) * ry;
        const profundidad = (Math.sin(t) + 1) / 2; // 0 = atrás, 1 = adelante
        const escala = 0.62 + profundidad * 0.48;
        luna.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${escala})`;
        luna.style.zIndex = Math.sin(t) > 0 ? 3 : 1;
        luna.style.filter = `brightness(${0.7 + profundidad * 0.3})`;
      });
      if (!reducir) frame = requestAnimationFrame(pintar);
    };

    frame = requestAnimationFrame(pintar);
    const alCambiarTamano = () => reducir && requestAnimationFrame(pintar);
    window.addEventListener('resize', alCambiarTamano);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', alCambiarTamano);
    };
  }, []);

  return (
    <div className="orbita" ref={escena}>
      {/* Mitad trasera de la órbita: queda detrás de la foto central. */}
      <svg className="orbita__linea orbita__linea--atras" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 4 50 A 46 14.7 0 0 1 96 50" />
      </svg>

      {/* Centro: "planeta" pan de yuca, una foto real de la corteza con el logo encima. */}
      <div className="orbita__centro orbita__centro--planeta" role="img" aria-label="Pan de yuca Chawpa">
        <img src="/logo3.svg" alt="" width="200" height="280" />
      </div>

      {/* Mitad delantera de la órbita: pasa por delante de la foto central. */}
      <svg className="orbita__linea orbita__linea--adelante" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 4 50 A 46 14.7 0 0 0 96 50" />
      </svg>
      <span className="orbita__latitud" aria-hidden="true">0° 0′ 0″ · Mitad del mundo</span>

      {LUNAS.map((p, i) => (
        <img
          key={p.slug}
          ref={(el) => (lunas.current[i] = el)}
          className="orbita__luna"
          src={p.image}
          alt={`Pan de yuca ${p.name}`}
          width="96"
          height="96"
        />
      ))}
    </div>
  );
}

export default HeroOrbita;
