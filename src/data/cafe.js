// Datos de Chawpa Café, el primer local de Chawpa abierto al público.
// Si un campo queda vacío (''), el sitio lo oculta automáticamente.

const DIRECCION_MAPS = 'Chawpa Café, La Cerámica y Pasaje Del Campo, 170903 Quito, Ecuador';

export const cafe = {
  nombre: 'Chawpa Café',
  descripcion:
    'Cafetería casual y saludable en La Cerámica, Quito: pan de yuca sin gluten con receta manabita (tradicional y vegano), yogur natural, kéfir, jugos detox, batidos de proteína y café ecuatoriano.',
  direccion: 'La Cerámica y Pasaje Del Campo',
  referencia: 'Dentro de la plaza deportiva La Cerámica, junto a Lumbicity',
  sector: 'La Cerámica',
  ciudad: 'Quito',
  codigoPostal: '170903',
  pais: 'EC',
  telefono: '+593 99 512 4401',
  rangoPrecios: '$1 – $5',
  googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DIRECCION_MAPS)}`,
  googleMapsEmbed: `https://www.google.com/maps?q=${encodeURIComponent(DIRECCION_MAPS)}&output=embed`,
  instagram: 'https://www.instagram.com/chawpacafe/',
  instagramUsuario: '@chawpacafe',
  facebook: '', // TODO: link del Facebook de Chawpa Café
  geo: null, // Opcional: { lat: -0.17, lng: -78.48 } mejora los datos para Google
  fotos: [
    // Para agregar más: guárdalas en /public/cafe/, ejecuta `npm run imagenes` y lístalas aquí.
    {
      src: '/cafe/batido-pan-de-yuca.webp',
      alt: 'Batido de frutos rojos y panes de yuca frente al letrero de Chawpa Café',
    },
  ],
  // dia: 0 = domingo … 6 = sábado. Cada día puede tener varios turnos (formato 24 h).
  // Un día que no aparece se muestra como cerrado.
  horarios: [
    ...[1, 2, 3, 4, 5].map((dia) => ({
      dia,
      turnos: [
        ['08:00', '12:00'],
        ['16:00', '19:30'],
      ],
    })),
    {
      dia: 6,
      turnos: [
        ['09:00', '13:00'],
        ['14:00', '18:00'],
      ],
    },
  ],
  notaHorarios:
    'Algunos sábados y domingos extendemos el horario: revisa nuestras redes antes de venir.',
  caracteristicas: [
    { icono: '🌳', texto: 'Plaza al aire libre' },
    { icono: '🐶', texto: 'Pet-friendly' },
    { icono: '💻', texto: 'Ideal para trabajar con laptop' },
    { icono: '👨‍👩‍👧', texto: 'Ambiente familiar' },
    { icono: '🅿️', texto: 'Estacionamiento gratuito' },
    { icono: '♿', texto: 'Accesible en silla de ruedas' },
    { icono: '💳', texto: 'Tarjeta y pago sin contacto' },
    { icono: '🥡', texto: 'Para servir o para llevar' },
  ],
  // precio: número, o null para ocultarlo. desde: true muestra "desde $X".
  menu: [
    {
      categoria: 'Pan de yuca',
      items: [
        {
          nombre: 'Pan de yuca tradicional',
          descripcion: 'Receta manabita, sin gluten, recién horneado.',
          precio: null,
        },
        {
          nombre: 'Pan de yuca vegano (5 unidades)',
          descripcion: 'Sin gluten y sin lácteos.',
          precio: 3.0,
        },
      ],
    },
    {
      categoria: 'Combos',
      items: [
        {
          nombre: 'Yogur + pan de yuca tradicional',
          descripcion: 'Yogur natural con pan de yuca recién horneado.',
          precio: 5.25,
          desde: true,
        },
      ],
    },
    {
      categoria: 'Saludable',
      items: [
        { nombre: 'Yogur natural', descripcion: '', precio: null },
        { nombre: 'Kéfir', descripcion: '', precio: null },
        { nombre: 'Batidos de proteína', descripcion: '', precio: null },
      ],
    },
    {
      categoria: 'Jugos detox',
      items: [
        { nombre: 'Green Power', descripcion: '', precio: 3.5 },
        { nombre: 'Jungle Boost', descripcion: '', precio: 3.5 },
        { nombre: 'Golden Flow', descripcion: '', precio: 3.5 },
      ],
    },
    {
      categoria: 'Café',
      items: [
        { nombre: 'Capuchino', descripcion: 'Café ecuatoriano.', precio: 2.5 },
        { nombre: 'Latte frío', descripcion: '', precio: null },
      ],
    },
    {
      categoria: 'Para llevar a casa',
      items: [
        { nombre: 'Premezcla de pan de yuca', descripcion: 'Solo agrega agua.', precio: 6.99 },
        { nombre: 'Congelado tradicional (500 g)', descripcion: '', precio: 6.0 },
        { nombre: 'Congelado vegano (500 g)', descripcion: '', precio: 7.5 },
        {
          nombre: 'Congelado relleno de chocolate o manjar (500 g)',
          descripcion: '',
          precio: 8.0,
        },
      ],
    },
  ],
};

export const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const direccionCompleta = () =>
  [cafe.direccion, cafe.sector, cafe.ciudad].filter(Boolean).join(', ');

/** URL para "Cómo llegar": usa el link de Maps o, si falta, una búsqueda. */
export const comoLlegarUrl = () =>
  cafe.googleMapsUrl ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${cafe.nombre} ${direccionCompleta()}`,
  )}`;

/** "08:00 – 12:00 · 16:00 – 19:30" */
export const textoTurnos = (turnos) => turnos.map(([a, c]) => `${a} – ${c}`).join(' · ');

const aMinutos = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Devuelve { abierto, horarioHoy, diaHoy } según la hora actual de Quito (UTC-5, sin horario de verano). */
export function estadoCafe(fecha = new Date()) {
  const quito = new Date(fecha.getTime() + (fecha.getTimezoneOffset() - 300) * 60000);
  const diaHoy = quito.getDay();
  const horarioHoy = cafe.horarios.find((h) => h.dia === diaHoy) || null;
  const ahora = quito.getHours() * 60 + quito.getMinutes();
  const abierto =
    !!horarioHoy &&
    horarioHoy.turnos.some(([abre, cierra]) => ahora >= aMinutos(abre) && ahora < aMinutos(cierra));
  return { abierto, horarioHoy, diaHoy };
}
