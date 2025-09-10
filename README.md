# Portafolio Profesional

Portafolio web responsivo con HTML, CSS y JavaScript. Diseño moderno, accesible, con modo oscuro/claro, menú móvil, scroll suave y formulario con validación en el cliente.

## Estructura

```
Proyecto PORTFOLIO/
├─ index.html              # Estructura semántica y contenido principal
└─ assets/                 # Recursos estáticos
   ├─ css/
   │  └─ styles.css        # Estilos, variables de tema, responsive
   ├─ js/
   │  └─ script.js         # Interactividad: menú, tema, scroll, validación
   ├─ img/                 # Imágenes (avatar, proyectos)
   └─ docs/                # Documentos (CV, PDFs)
```

Coloca tus recursos aquí:
- `assets/img/avatar.jpg` (foto 400x400 aprox.)
- `assets/img/proyecto-1.jpg`, `assets/img/proyecto-2.jpg` (800x500 aprox.)
- `assets/docs/CV.pdf` (opcional)
- `assets/img/og-image.jpg` (opcional)

## Cómo usar

1. Abre `index.html` en el navegador.
2. Edita textos e imágenes siguiendo los comentarios del HTML.
3. Personaliza colores y tipografías en `assets/css/styles.css` (variables `:root`).
4. Ajusta redes, tema y formulario en `assets/js/script.js`.
5. CV: coloca tu PDF en `assets/docs/` y el enlace del botón lo detectará vía ruta relativa.

## Personalización rápida

- Marca: cambia `NP` y `Tu Nombre` en el header y hero.
- Secciones: actualiza `#sobre-mi`, `#habilidades`, `#experiencia`, `#proyectos`.
- Proyectos: duplica `project-card` y reemplaza imagen, texto, tags y enlaces.
- Contacto: conecta un servicio real (Formspree/EmailJS/backend propio).

## Tema oscuro/claro

- Automático por `prefers-color-scheme` y alternable con botón 🌓.
- Preferencia guardada en `localStorage`.

## Envío de formulario (producción)

Reemplaza el envío simulado por una petición real. Ejemplo (Formspree):

```js
await fetch('https://formspree.io/f/XXXXXXX', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message })
});
```

## Accesibilidad y SEO

- HTML semántico, `aria-*`, meta OG/Twitter.
- Imágenes con `alt` y `loading="lazy"`.

## Despliegue

- GitHub Pages, Netlify o Vercel. Usa rutas relativas (sin `/` inicial) y `assets/` para recursos.
- GitHub Pages (proyecto): Settings → Pages → Source: rama `master`/`main`, carpeta `/root`.
- URL de producción: https://moenni.github.io/ProyectoPortfolio/

Notas importantes para GitHub Pages:
- Respeta mayúsculas/minúsculas en nombres de archivos.
- Evita espacios en nombres de archivos (ej. `Nicolas_Moen_CV.pdf`).
- No uses rutas absolutas que empiezan con `/`; usa relativas (ej. `assets/img/...`).

## Licencia

Uso personal libre. Sustituye créditos por tu marca.
