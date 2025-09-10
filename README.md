# Portafolio Profesional

Portafolio web responsivo con HTML, CSS y JavaScript. Diseño moderno, accesible, con modo oscuro/claro, menú móvil, scroll suave y formulario con validación en el cliente.

## Estructura

```
Proyecto PORTFOLIO/
├─ index.html      # Estructura semántica y contenido principal
├─ styles.css      # Estilos, variables de tema, responsive
├─ script.js       # Interactividad: menú, tema, scroll, validación
└─ assets/         # Imágenes (avatar, proyectos), CV, favicon, etc.
```

Coloca en `assets/` tus recursos:
- `avatar.jpg` (foto 400x400 aprox.)
- `proyecto-1.jpg`, `proyecto-2.jpg` (800x500 aprox.)
- `CV.pdf` (opcional)
- `og-image.jpg` (opcional)

## Cómo usar

1. Abre `index.html` en el navegador.
2. Edita textos e imágenes siguiendo los comentarios del HTML.
3. Personaliza colores y tipografías en `styles.css` (variables `:root`).
4. Ajusta redes, tema y formulario en `script.js`.

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

- GitHub Pages, Netlify o Vercel. Usa rutas relativas y `assets/` para recursos.

## Licencia

Uso personal libre. Sustituye créditos por tu marca.
