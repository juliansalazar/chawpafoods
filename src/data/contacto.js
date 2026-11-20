// Datos de contacto compartidos por todo el sitio.

export const WHATSAPP_NUMERO = '593995124401';

export const MENSAJE_BASE = 'Hola, soy un cliente de Chawpa Foods!';

/** Construye el enlace de WhatsApp con un mensaje opcional. */
export function whatsappUrl(mensaje = MENSAJE_BASE) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMERO}&text=${encodeURIComponent(mensaje)}`;
}

export const redes = {
  facebook: 'https://www.facebook.com/chawpa.ec/',
  instagram: '', // TODO: agregar el Instagram de Chawpa
  usuario: '', // TODO: usuario para etiquetar en redes, p. ej. '@chawpa.ec'
};

// Tiendas donde se venden los productos Chawpa.
// logo: archivo en /public/tiendas/ (vacío = se muestra el nombre en texto).
// fondo: color detrás del logo, para logos blancos.
export const tiendas = [
  {
    nombre: 'Tipti',
    tipo: 'Online',
    descripcion: 'Compra en línea con entrega a domicilio.',
    url: 'https://www.tipti.market/',
    logo: '/tiendas/tipti.svg',
  },
  {
    nombre: 'Supermaxi',
    tipo: 'Supermercado',
    descripcion: 'Supermercados en todo el país.',
    url: 'https://www.supermaxi.com/',
    logo: '/tiendas/supermaxi.png',
    fondo: '#bf0411',
  },
  {
    nombre: 'Megamaxi',
    tipo: 'Supermercado',
    descripcion: 'Hipermercados en todo el país.',
    url: 'https://www.supermaxi.com/',
    logo: '/tiendas/megamaxi.png',
  },
  {
    nombre: 'Italdeli',
    tipo: 'Delicatessen · Cuenca',
    descripcion: 'Locales Solano, Fátima, San Sebastián y Parque Industrial.',
    url: 'https://www.laitaliana.com.ec/italdeli.php',
    logo: '', // TODO: agregar el logo de Italdeli en /public/tiendas/
  },
];

export const puntosDeVenta = {
  zonasDelivery: ['Quito Norte', 'Cumbayá', 'Tumbaco'],
};
