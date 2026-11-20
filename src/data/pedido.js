// Reglas del pedido en línea: zonas de entrega, envío, pedido mínimo y horarios.
// TODO: confirmar costos de envío y pedido mínimo reales antes de publicar.

import { cafe } from './cafe';

export const PEDIDO_MINIMO = 10; // USD, sin contar el envío

// Días de anticipación para la entrega (1 = desde mañana).
export const DIAS_ANTICIPACION = 1;

// `retiro: true` = el cliente pasa a recoger, no se pide dirección.
export const zonas = [
  { id: 'quito-norte', nombre: 'Quito Norte', costo: 3 },
  { id: 'cumbaya', nombre: 'Cumbayá', costo: 4 },
  { id: 'tumbaco', nombre: 'Tumbaco', costo: 4.5 },
  {
    id: 'retiro-cafe',
    nombre: `Retiro en ${cafe.nombre} (${cafe.sector})`,
    costo: 0,
    retiro: true,
  },
];

export const franjas = ['9:00 – 12:00', '12:00 – 15:00', '15:00 – 18:00'];

export const metodosPago = [
  {
    id: 'transferencia',
    nombre: 'Transferencia o Deuna',
    detalle: 'Te enviamos los datos para pagar al confirmar el pedido.',
  },
  {
    id: 'efectivo',
    nombre: 'Efectivo al recibir',
    detalle: 'Ten el valor exacto, por favor.',
  },
];

export const getZona = (id) => zonas.find((z) => z.id === id);

/** Fecha mínima de entrega en formato YYYY-MM-DD (hora local). */
export function fechaMinimaEntrega() {
  const d = new Date();
  d.setDate(d.getDate() + DIAS_ANTICIPACION);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/** Número de pedido corto y legible, p. ej. CH-261119-4F7K. */
export function generarNumeroPedido() {
  const d = new Date();
  const fecha = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const sufijo = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `CH-${fecha}-${sufijo}`;
}
