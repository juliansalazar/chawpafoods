import { formatoPrecio } from '../data/products';

/** Texto del pedido ya armado, listo para enviarse en un solo mensaje de WhatsApp. */
export function armarMensajePedido({ numero, items, subtotal, zona, total, datos, metodoPago }) {
  const lineas = [
    `🧾 *Nuevo pedido ${numero}*`,
    '',
    ...items.map(
      (i) => `• ${i.cantidad} × ${i.producto.name} (${i.producto.presentation}) — ${formatoPrecio(i.producto.precio * i.cantidad)}`,
    ),
    '',
    `Subtotal: ${formatoPrecio(subtotal)}`,
    `${zona.retiro ? 'Retiro' : `Envío ${zona.nombre}`}: ${zona.costo ? formatoPrecio(zona.costo) : 'Gratis'}`,
    `*Total: ${formatoPrecio(total)}*`,
    '',
    `👤 ${datos.nombre} · ${datos.telefono}${datos.email ? ` · ${datos.email}` : ''}`,
    zona.retiro ? `📍 ${zona.nombre}` : `📍 ${zona.nombre}: ${datos.direccion}`,
    !zona.retiro && datos.referencia ? `   Ref.: ${datos.referencia}` : null,
    `📅 ${formatearFecha(datos.fecha)}, ${datos.franja}`,
    `💳 ${metodoPago.nombre}`,
    datos.factura === 'datos'
      ? `🧾 Factura: ${datos.razonSocial} · ${datos.identificacion} · ${datos.emailFactura}`
      : '🧾 Factura: consumidor final',
    datos.notas ? `📝 ${datos.notas}` : null,
  ];
  return lineas.filter((l) => l !== null).join('\n');
}

export function formatearFecha(iso) {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(a, m - 1, d).toLocaleDateString('es-EC', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}
