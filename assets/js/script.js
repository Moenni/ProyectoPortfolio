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
    let isMenuOpen = false;
    
    const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;
      navList.classList.toggle('show', isMenuOpen);
      navToggle.setAttribute('aria-expanded', String(isMenuOpen));
      
      // Prevenir scroll del body cuando el menú está abierto
      if (isMenuOpen) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    };

    const closeMenu = () => {
      if (isMenuOpen) {
        isMenuOpen = false;
        navList.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    };

    navToggle.addEventListener('click', toggleMenu);

    // Cerrar al navegar
    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Cerrar menú al hacer scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (isMenuOpen) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(closeMenu, 150);
      }
    }, { passive: true });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (isMenuOpen && !navList.contains(e.target) && !navToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
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

  // Animaciones suaves en scroll (IntersectionObserver)
  const revealTargets = document.querySelectorAll('.section, .project-card, .card, .timeline-item, .avatar, .hero-copy, .hero-media');
  const addRevealClass = (el) => el.classList.add('reveal');
  revealTargets.forEach(addRevealClass);
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 }) : null;
  revealTargets.forEach((el) => io?.observe(el));

  // Validación y envío del formulario
  // Envío vía correo: abre cliente de email con mailto y contenido prellenado
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

    // Construir mailto con asunto y cuerpo
    try {
      const recipient = 'contacto@nicolasmoen.dev';
      const subject = encodeURIComponent(`Contacto de ${name} - Portafolio`);
      const bodyLines = [
        `Nombre: ${name}`,
        `Email: ${email}`,
        '',
        message,
      ];
      const body = encodeURIComponent(bodyLines.join('\n'));
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

      statusEl.textContent = 'Abriendo tu cliente de correo...';
      window.location.href = mailtoUrl;
      form.reset();
    } catch (err) {
      statusEl.textContent = 'No se pudo abrir el correo. Inténtalo nuevamente.';
    }
  });
})();


