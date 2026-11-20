// Contenido de la página /como-hornear.
// Los pasos de la Mezcla vienen del empaque oficial.

export const pasosMezcla = [
  {
    icono: '🥣',
    titulo: 'Mezcla',
    texto:
      'En un recipiente, mezcla todo el contenido con 2/3 de taza (140 ml) de agua a temperatura ambiente.',
  },
  {
    icono: '🤲',
    titulo: 'Amasa',
    texto:
      'Mezcla uniformemente hasta obtener una masa compacta y lisa. Para un mejor resultado, amasa con las manos.',
  },
  {
    icono: '⚪',
    titulo: 'Forma los panes',
    texto: 'Forma 16 panes pequeños de 25 g aproximadamente.',
  },
  {
    icono: '📏',
    titulo: 'Acomoda',
    texto: 'Coloca los panes en un recipiente para hornear, con 3 cm de separación entre cada uno.',
  },
];

export const formasDeHornear = [
  {
    icono: '🔥',
    titulo: 'Horno tradicional',
    temperatura: '200 °C (400 °F)',
    tiempo: '15 a 20 min',
    texto: 'Precalienta el horno 5 minutos y hornea hasta que estén dorados por fuera.',
  },
  {
    icono: '💨',
    titulo: 'Air fryer',
    temperatura: '200 °C (400 °F)',
    tiempo: '10 a 15 min',
    texto: 'Calienta la air fryer y hornea hasta que estén dorados por fuera.',
  },
];

// TODO: confirmar con el equipo las instrucciones oficiales de los congelados y los Bites.
export const pasosCongelados = [
  'Sácalos del congelador y hornéalos directamente, sin descongelar.',
  'Usa las mismas temperaturas de la Mezcla: horno a 200 °C o air fryer a 200 °C.',
  'Están listos cuando se ven dorados por fuera. Los Bites, por ser más pequeños, se hornean más rápido.',
];

// Ideas para usar la masa o los panes: lo que hace versátil al producto.
export const ideas = [
  {
    icono: '🟡',
    titulo: 'En bolitas',
    texto: 'La forma clásica: panes de yuca dorados por fuera y suaves por dentro.',
  },
  {
    icono: '🧇',
    titulo: 'En wafflera',
    texto: 'Pon una porción de masa en la wafflera caliente y obtén un waffle de yuca crocante.',
  },
  {
    icono: '🥪',
    titulo: 'En sanduchera',
    texto: 'Aplasta la masa en la sanduchera, rellénala con queso o jamón y ciérrala hasta dorar.',
  },
  {
    icono: '💨',
    titulo: 'En air fryer',
    texto: 'Rápido y sin precalentar el horno: perfectos para un antojo de último minuto.',
  },
  {
    icono: '🍕',
    titulo: 'Base de pizza',
    texto: 'Extiende la masa, hornéala hasta que dore y agrega tus ingredientes favoritos.',
  },
  {
    icono: '✨',
    titulo: '¡Y mucho más!',
    texto: 'Rellenos, palitos, mini sánduches… Inventa tu versión y compártela con nosotros.',
  },
];

export const fichaMezcla = {
  ingredientes:
    'Almidón de yuca, queso fresco semiblando entero (leche entera pasteurizada, sal, cuajo), crema de leche en polvo, sal.',
  alergenos: 'Contiene leche. Contiene lactosa.',
  conservacion:
    'Conservar en un lugar fresco y seco hasta la fecha de vencimiento. Una vez abierto, preparar todo su contenido.',
  registro: 'Notificación sanitaria No. 40560-ALN-0923',
};
