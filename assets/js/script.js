/*
  Interactividad del portafolio
  - Menú móvil
  - Scroll suave y botón "volver arriba"
  - Modo oscuro/claro con persistencia en localStorage
  - Validación básica del formulario (cliente)
  - Actualiza el email/endpoint si usas un servicio de envío
*/

(function () {
  const html = document.documentElement;
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('primary-nav');
  const themeToggle = document.getElementById('theme-toggle');
  const backToTop = document.getElementById('back-to-top');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  // Año dinámico en el footer
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Menú móvil
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Cerrar al navegar
    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navList.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll suave global
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
      const id = target.getAttribute('href');
      if (!id) return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // Botón volver arriba
  const onScroll = () => {
    if (!backToTop) return;
    const show = window.scrollY > 480;
    backToTop.classList.toggle('show', show);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Tema (oscuro/claro) con preferencia persistida
  const THEME_KEY = 'preferred-theme';
  const setTheme = (theme) => {
    html.classList.remove('theme-dark', 'theme-light');
    if (theme) html.classList.add(theme);
  };
  const getSystemPrefersDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'theme-dark' || saved === 'theme-light') setTheme(saved);
  else setTheme(getSystemPrefersDark() ? 'theme-dark' : 'theme-light');

  themeToggle?.addEventListener('click', () => {
    const isDark = html.classList.contains('theme-dark');
    const next = isDark ? 'theme-light' : 'theme-dark';
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  // Validación y envío del formulario
  // IMPORTANTE: por defecto se previene el envío real.
  // Integra EmailJS, Formspree o tu backend y reemplaza el bloque de "fake submit".
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form || !statusEl) return;

    // Validación mínima
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name.length < 2) {
      statusEl.textContent = 'El nombre debe tener al menos 2 caracteres.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      statusEl.textContent = 'Ingresa un email válido.';
      return;
    }
    if (message.length < 10) {
      statusEl.textContent = 'El mensaje debe tener al menos 10 caracteres.';
      return;
    }

    // Simulación de envío (reemplaza con tu lógica de envío real)
    try {
      statusEl.textContent = 'Enviando...';
      await new Promise((res) => setTimeout(res, 900));
      statusEl.textContent = 'Gracias, tu mensaje ha sido enviado.';
      form.reset();
    } catch (err) {
      statusEl.textContent = 'Ocurrió un error. Inténtalo nuevamente.';
    }
  });
})();


