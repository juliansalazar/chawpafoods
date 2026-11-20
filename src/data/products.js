// Catálogo de productos Chawpa. Para agregar uno, copia un objeto y cambia sus campos.
// `slug` define la URL: /productos/<slug>
// Opcionales: `nuevo` (etiqueta "Nuevo"), `destacado` (aparece en el inicio),
// `tipti` (link al producto en Tipti), `preparacion` (pasos propios).

export const categorias = {
  congelado: 'Congelados',
  mezcla: 'Mezcla',
};

export const products = [
  {
    id: 7,
    slug: 'bites',
    name: 'Pan de Yuca Bites',
    categoria: 'congelado',
    presentation: '330 gramos',
    precio: 4.5,
    image: '/bites.webp',
    destacado: true,
    nuevo: true,
    tipti:
      'https://app.tipti.market/Megamaxi/product/pan-de-yuca-bites-congelados-chawpa-330-g-15662959',
    description_es:
      'Mini panes de yuca congelados: el snack natural y sin gluten, listos para hornear.',
    preparacion: [
      'No es necesario descongelar.',
      'Hornea en horno precalentado hasta que estén dorados.',
      'Sírvelos calientes como snack o para compartir.',
    ],
  },
  {
    id: 1,
    slug: 'mezcla-pan-de-yuca',
    name: 'Mezcla Pan de Yuca',
    categoria: 'mezcla',
    presentation: '250 gramos',
    precio: 6.99,
    image: '/mezcla2.webp',
    destacado: true,
    tipti:
      'https://app.tipti.market/Megamaxi/product/mezcla-para-pan-de-yuca-sin-gluten-chawpa-250-g-10241901',
    disponibleEnCafe: true,
    description_es:
      'Mezcla para preparar Pan de Yuca, rinde 16 porciones de 25 gramos aprox. Sólo agregue agua.',
    preparacion: [
      'Mezcla todo el contenido con 2/3 de taza (140 ml) de agua a temperatura ambiente.',
      'Amasa hasta obtener una masa compacta y lisa.',
      'Forma 16 panes de 25 g y colócalos con 3 cm de separación.',
      'Hornea a 200 °C: 15 a 20 min en horno (precalentado 5 min) o 10 a 15 min en air fryer.',
    ],
  },
  {
    id: 2,
    slug: 'natural',
    name: 'Natural',
    categoria: 'congelado',
    presentation: '20 unidades',
    precio: 6.0,
    image: '/congelado.webp',
    destacado: true,
    disponibleEnCafe: true,
    description_es:
      'Pan de Yuca tradicional congelado listo para hornear. Contiene 20 porciones de 25 gramos cada una.',
  },
  {
    id: 4,
    slug: 'nutella',
    name: 'Nutella',
    categoria: 'congelado',
    presentation: '10 unidades',
    precio: 8.0,
    image: '/nutella.webp',
    disponibleEnCafe: true,
    description_es:
      'Pan de Yuca congelado con tu chocolate preferido, Nutella. Contiene 10 porciones de 50 gramos cada una.',
  },
  {
    id: 3,
    slug: 'caprese',
    name: 'Caprese',
    categoria: 'congelado',
    presentation: '20 unidades',
    precio: 7.5,
    image: '/caprese.webp',
    disponibleEnCafe: true,
    description_es:
      'Pan de Yuca congelado con tomate deshidratado y albahaca. Contiene 20 porciones de 25 gramos cada una.',
  },
  {
    id: 5,
    slug: 'finas-hierbas',
    name: 'Finas Hierbas',
    categoria: 'congelado',
    presentation: '20 unidades',
    precio: 7.0,
    image: '/finash.webp',
    disponibleEnCafe: true,
    description_es:
      'Pan de Yuca congelado con perejil, estragón, cilantro, tomillo, albahaca y orégano. Contiene 20 porciones de 25 gramos cada una.',
  },
  {
    id: 6,
    slug: 'manjar-de-leche',
    name: 'Manjar de Leche',
    categoria: 'congelado',
    presentation: '10 unidades',
    precio: 8.0,
    image: '/manjar.webp',
    disponibleEnCafe: true,
    description_es:
      'Pan de Yuca congelado con manjar de leche manaba. Contiene 10 porciones de 50 gramos cada una.',
  },
];

// Pasos por defecto para los productos congelados.
export const preparacionCongelado = [
  'No es necesario descongelar.',
  'Precalienta el horno a 200 °C.',
  'Hornea de 15 a 20 minutos, hasta que estén dorados.',
  'Sirve caliente, ¡ideal con café!',
];

export const formatoPrecio = (precio) => `$${precio.toFixed(2)}`;

export const getProducto = (slug) => products.find((p) => p.slug === slug);
