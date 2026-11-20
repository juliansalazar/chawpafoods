// Envía eventos al dataLayer de Google Tag Manager (GTM-P46LB5ZG).
// Eventos usados: click_whatsapp, click_como_llegar, ver_menu.
export function track(evento, datos = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: evento, ...datos });
}
