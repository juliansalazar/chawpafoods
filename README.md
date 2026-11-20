# Chawpa – sitio web

Sitio de Chawpa: pan de yuca artesanal y **Chawpa Café**, nuestro primer local en Quito.
Hecho con React 18, Vite y React Router.

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo
npm run build      # compilar para producción (carpeta dist/)
npm run preview    # probar la versión compilada
npm run lint       # revisar el código
npm run imagenes   # convertir imágenes de /public a WebP
```

## Páginas

| Ruta | Archivo |
|---|---|
| `/` | `src/pages/Inicio.jsx` |
| `/cafe` | `src/pages/Cafe.jsx` |
| `/productos` | `src/pages/Productos.jsx` |
| `/productos/:slug` | `src/pages/Producto.jsx` |
| `/nosotros` | `src/pages/Nosotros.jsx` |
| `/donde-comprar` | `src/pages/DondeComprar.jsx` |

## Cómo editar el contenido

Todo el contenido editable está en `src/data/`:

- **`cafe.js`**: dirección, horarios, menú, fotos y mapa de Chawpa Café.
  Los campos marcados con `TODO` son placeholders. Si un campo queda vacío, el sitio lo oculta.
  - **Mapa:** en Google Maps, busca el local → *Compartir* → *Insertar un mapa* y copia solo el valor de `src` en `googleMapsEmbed`. El link de *Compartir* va en `googleMapsUrl`.
  - **Fotos:** guárdalas en `public/cafe/`, ejecuta `npm run imagenes` y agrégalas a `fotos`.
  - **Menú:** cada ítem tiene `nombre`, `descripcion` y `precio` (número, o `null` para ocultarlo).
- **`products.js`**: catálogo de productos (nombre, precio, imagen, descripción, categoría).
- **`contacto.js`**: número de WhatsApp, redes sociales, supermercados y zonas de delivery.

## Analítica

Google Tag Manager (`GTM-P46LB5ZG`) recibe estos eventos en el `dataLayer`:
`click_whatsapp`, `click_como_llegar` y `ver_menu`.

## Despliegue

El sitio es una SPA. Para que las rutas como `/cafe` funcionen al recargar la página, se incluyen
`vercel.json` (Vercel) y `public/_redirects` (Netlify), que redirigen todo a `index.html`.
