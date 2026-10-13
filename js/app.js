/* ==========================================================================
   app.js — Renderizado y navegación del portafolio
   El contenido vive en js/data.js; aquí solo se construye la interfaz.

   Rutas (hash, sin recargar la página):
     #informacion          -> sección Información
     #proyectos            -> lista de proyectos
     #proyectos/<id>       -> detalle de un proyecto
     #contacto             -> sección Contacto
   ========================================================================== */

(function () {
  'use strict';

  const DATA = window.PORTFOLIO_DATA;
  const DEFAULT_SECTION = 'informacion';

  /* -----------------------------------------------------------------------
     Utilidades DOM
     ----------------------------------------------------------------------- */

  /** Crea un elemento. `props` admite class, eventos (onClick) y atributos. */
  function h(tag, props, ...children) {
    const node = document.createElement(tag);
    Object.entries(props || {}).forEach(([key, value]) => {
      if (value === null || value === undefined || value === false) return;
      if (key === 'class') node.className = value;
      else if (key.startsWith('on') && typeof value === 'function') {
        node.addEventListener(key.slice(2).toLowerCase(), value);
      } else node.setAttribute(key, value === true ? '' : value);
    });
    children.flat().forEach((child) => {
      if (child === null || child === undefined || child === false) return;
      node.append(child.nodeType ? child : document.createTextNode(child));
    });
    return node;
  }

  /** Enlace externo: se abre en otra pestaña de forma segura (RNF-016). */
  function externalLink(href, text, className) {
    return h('a', { href, class: className, target: '_blank', rel: 'noopener noreferrer' }, text);
  }

  /** Imagen con mensaje comprensible si no puede cargarse (RNF-023). */
  function createImage(src, alt, className) {
    const wrapper = h('div', { class: ['media', className].filter(Boolean).join(' ') });
    const img = h('img', { src, alt, loading: 'lazy', decoding: 'async' });
    img.addEventListener('error', () => {
      wrapper.replaceChildren(h('p', { class: 'media__error', role: 'status' }, DATA.messages.imageError));
    });
    wrapper.append(img);
    return wrapper;
  }

  function createMessage(text) {
    return h('p', { class: 'message-box', role: 'status' }, text);
  }

  function createStatusTag(status) {
    const label = DATA.statusLabels[status] || status;
    return h('span', { class: 'tag tag--' + status }, label);
  }

  function createChipList(items, label) {
    return h('ul', { class: 'chip-list', 'aria-label': label },
      items.map((item) => h('li', { class: 'chip' }, item)));
  }

  /* -----------------------------------------------------------------------
     Encabezado, menú y pie de página
     ----------------------------------------------------------------------- */

  function renderHeader() {
    const header = document.getElementById('site-header');
    header.append(
      h('div', { class: 'container site-header__inner' },
        h('a', { class: 'site-header__brand', href: '#' + DEFAULT_SECTION }, DATA.owner.fullName),
        h('nav', { class: 'main-nav', 'aria-label': 'Navegación principal' },
          h('ul', { class: 'main-nav__list' },
            DATA.navigation.map((item) =>
              h('li', null,
                h('a', { class: 'main-nav__link', href: '#' + item.id, 'data-nav': item.id }, item.label)))))));
  }

  function renderFooter() {
    const footer = document.getElementById('site-footer');
    const contact = DATA.contact;

    // Medios de contacto seleccionados para el pie de página (RF-060)
    const contactItems = [];
    if (contact.email && contact.email.inFooter) {
      contactItems.push(h('li', null, h('a', { href: 'mailto:' + contact.email.address }, contact.email.address)));
    }
    if (contact.professional && contact.professional.inFooter) {
      contactItems.push(h('li', null, h('a', { href: contact.professional.href }, contact.professional.value)));
    }
    contact.social.filter((s) => s.inFooter).forEach((s) => {
      contactItems.push(h('li', null, externalLink(s.url, s.network + ' ' + s.username)));
    });

    footer.append(
      h('div', { class: 'container' },
        h('div', { class: 'site-footer__grid' },
          h('div', null,
            h('p', { class: 'site-footer__name' }, h('strong', null, DATA.owner.fullName)),
            h('p', null, DATA.education.career)),
          h('nav', { 'aria-label': 'Secciones del sitio' },
            h('h2', { class: 'site-footer__title' }, 'Secciones'),
            h('ul', { class: 'site-footer__list' },
              DATA.navigation.map((item) => h('li', null, h('a', { href: '#' + item.id }, item.label))))),
          h('div', null,
            h('h2', { class: 'site-footer__title' }, 'Contacto'),
            h('ul', { class: 'site-footer__list' }, contactItems))),
        h('p', { class: 'site-footer__copy' }, '© ' + new Date().getFullYear() + ' ' + DATA.owner.fullName)));
  }

  /* -----------------------------------------------------------------------
     Sección: Información
     ----------------------------------------------------------------------- */

  function renderInfoView() {
    const view = document.getElementById('view-informacion');
    const owner = DATA.owner;
    const cvUrl = DATA.curriculum && DATA.curriculum.url;

    // Presentación personal (RF-011, RF-012, RF-021, RF-022, RF-023)
    const hero = h('div', { class: 'hero', 'aria-labelledby': 'hero-name' },
      h('p', { class: 'hero__eyebrow' }, 'Presentación personal'),
      h('p', { class: 'hero__greeting' }, owner.greeting),
      h('h1', { class: 'hero__name', id: 'hero-name' }, owner.fullName),
      h('p', { class: 'hero__description' }, owner.description),
      h('div', { class: 'button-row' },
        h('a', { class: 'btn', href: '#contacto' }, 'Contáctame'),
        cvUrl ? h('a', { class: 'btn btn--outline', href: cvUrl, download: DATA.curriculum.downloadName || '' }, 'Descargar currículum') : null));

    // Formación académica (RF-013, RF-014)
    const education = h('div', { class: 'card-box' },
      h('h2', { class: 'card-box__title' }, 'Formación académica'),
      h('dl', { class: 'data-list' },
        h('div', null,
          h('dt', { class: 'data-list__term' }, 'Carrera'),
          h('dd', { class: 'data-list__value' }, DATA.education.career)),
        h('div', null,
          h('dt', { class: 'data-list__term' }, 'Institución'),
          h('dd', { class: 'data-list__value' }, DATA.education.institution))));

    // Intereses profesionales (RF-020)
    const interests = h('div', { class: 'card-box' },
      h('h2', { class: 'card-box__title' }, 'Intereses profesionales'),
      h('p', null, DATA.interests));

    // Habilidades en lista (RF-015, RF-016, RNF-028)
    const skills = h('div', { class: 'section-block' },
      h('h2', null, 'Habilidades'),
      h('ul', { class: 'skill-list' }, DATA.skills.map((skill) => h('li', { class: 'skill-list__item' }, skill))));

    // Tecnologías por categoría con descripción (RF-017, RF-018, RF-019)
    const technologies = h('div', { class: 'section-block' },
      h('h2', null, 'Tecnologías'),
      h('div', { class: 'info-grid info-grid--4' },
        DATA.technologies.map((group) =>
          h('article', { class: 'card-box tech-category' },
            h('h3', { class: 'card-box__title' }, group.category),
            h('p', { class: 'tech-category__description' }, group.description),
            createChipList(group.items, 'Tecnologías de ' + group.category)))));

    view.append(
      h('div', { class: 'container' },
        hero,
        h('div', { class: 'section-block info-grid info-grid--2' }, education, interests),
        skills,
        technologies));
  }

  /* -----------------------------------------------------------------------
     Sección: Proyectos
     ----------------------------------------------------------------------- */

  function createProjectCard(project) {
    return h('article', { class: 'project-card' },
      h('div', { class: 'project-card__media' },
        createImage(project.image, 'Imagen representativa del proyecto ' + project.name),
        h('span', { class: 'project-card__tag' }, createStatusTag(project.status))),
      h('div', { class: 'project-card__body' },
        h('h3', { class: 'project-card__title' }, project.name),
        h('p', { class: 'project-card__summary' }, project.summary),
        h('a', { class: 'btn project-card__link', href: '#proyectos/' + project.id,
          'aria-label': 'Ver detalles del proyecto ' + project.name }, 'Ver detalles')));
  }

  function renderProjectsList() {
    const container = document.getElementById('projects-list');
    const projects = DATA.projects;
    container.replaceChildren();

    container.append(h('h2', null, 'Proyectos'));

    if (!projects.length) {
      container.append(createMessage(DATA.messages.noProjects));
      return;
    }

    // Proyectos destacados (RF-043)
    const featured = projects.filter((p) => p.featured);
    if (featured.length) {
      container.append(
        h('div', { class: 'section-block' },
          h('h3', null, 'Proyectos destacados'),
          h('div', { class: 'card-grid' }, featured.map(createProjectCard))));
    }

    // Todos los proyectos (RF-024, RF-031, RF-032)
    container.append(
      h('div', { class: 'section-block' },
        h('h3', null, 'Todos los proyectos'),
        h('div', { class: 'card-grid' }, projects.map(createProjectCard))));
  }

  function createResourceLink(url, linkText, unavailableText) {
    if (url) return externalLink(url, linkText, 'btn');
    return h('span', { class: 'btn btn--disabled', role: 'note' }, unavailableText);
  }

  function renderProjectDetail(project) {
    const container = document.getElementById('projects-detail');
    container.replaceChildren();

    // Regresar a la lista de proyectos (RF-044)
    const backButton = h('a', { class: 'btn btn--outline', href: '#proyectos' }, '← Volver a la lista de proyectos');

    if (!project) {
      container.append(
        backButton,
        h('div', { class: 'section-block' }, createMessage(DATA.messages.projectNotFound)));
      return;
    }

    const info = h('div', { class: 'card-box' },
      h('h3', { class: 'card-box__title' }, 'Información del proyecto'),
      h('p', null, project.description),
      h('dl', { class: 'data-list' },
        h('div', null,
          h('dt', { class: 'data-list__term' }, 'Finalidad'),
          h('dd', { class: 'data-list__value' }, project.purpose)),
        h('div', null,
          h('dt', { class: 'data-list__term' }, 'Tecnologías utilizadas'),
          h('dd', { class: 'data-list__value' }, createChipList(project.technologies, 'Tecnologías utilizadas'))),
        // Rol solo cuando el proyecto fue en equipo (RF-030)
        project.team && project.role
          ? h('div', null,
              h('dt', { class: 'data-list__term' }, 'Mi rol en el equipo'),
              h('dd', { class: 'data-list__value' }, project.role))
          : null));

    // Repositorio y demostración, o aviso de no disponibilidad (RF-039, RF-040, RF-041)
    const resources = h('div', { class: 'card-box' },
      h('h3', { class: 'card-box__title' }, 'Recursos'),
      h('div', { class: 'detail__links' },
        createResourceLink(project.repository, 'Ver repositorio', DATA.messages.repositoryUnavailable),
        createResourceLink(project.demo, 'Ver demostración', DATA.messages.demoUnavailable)));

    // Imágenes adicionales (RF-038)
    const gallery = project.gallery && project.gallery.length
      ? h('div', { class: 'detail__gallery' },
          h('h3', null, 'Imágenes del proyecto'),
          h('div', { class: 'gallery-grid' },
            project.gallery.map((src, index) =>
              createImage(src, 'Imagen ' + (index + 1) + ' del proyecto ' + project.name))))
      : null;

    container.append(
      backButton,
      h('div', { class: 'detail__header' },
        h('h2', null, project.name),
        createStatusTag(project.status)),
      h('div', { class: 'detail__cover' },
        createImage(project.image, 'Imagen representativa del proyecto ' + project.name)),
      h('div', { class: 'detail__grid' }, info, resources),
      gallery);
  }

  /** Botón para regresar a la sección de inicio (RF-006). */
  function createHomeButton() {
    return h('div', { class: 'view-footer-action' },
      h('a', { class: 'btn btn--outline', href: '#' + DEFAULT_SECTION }, '← Volver al inicio'));
  }

  /* -----------------------------------------------------------------------
     Sección: Contacto
     ----------------------------------------------------------------------- */

  function createContactItem(icon, label, valueNode) {
    return h('li', { class: 'contact-item' },
      h('span', { class: 'contact-item__icon', 'aria-hidden': 'true' }, icon),
      h('div', null,
        h('p', { class: 'contact-item__label' }, label),
        h('p', { class: 'contact-item__value' }, valueNode)));
  }

  function renderContactView() {
    const view = document.getElementById('view-contacto');
    const contact = DATA.contact;

    const items = [
      // Correo electrónico seleccionable (RF-046, RF-047)
      createContactItem('@', 'Correo electrónico',
        h('a', { href: 'mailto:' + contact.email.address }, contact.email.address))
    ];

    // Medio de contacto profesional (RF-051)
    if (contact.professional) {
      items.push(createContactItem('✆', contact.professional.label,
        h('a', { href: contact.professional.href }, contact.professional.value)));
    }

    // Redes sociales con enlace y nombre de usuario (RF-048, RF-049, RF-050)
    contact.social.forEach((social) => {
      items.push(createContactItem(social.network.charAt(0), social.network,
        externalLink(social.url, social.username)));
    });

    view.append(
      h('div', { class: 'container' },
        h('h2', null, 'Contacto'),
        // Disponibilidad para recibir consultas (RF-052)
        h('p', { class: 'notice' }, contact.availability),
        h('ul', { class: 'contact-list' }, items)));
  }

  /* -----------------------------------------------------------------------
     Navegación por hash (sin recargar la página)
     ----------------------------------------------------------------------- */

  function parseRoute() {
    const raw = window.location.hash.replace(/^#\/?/, '');
    const parts = raw.split('/');
    const validIds = DATA.navigation.map((item) => item.id);
    const section = validIds.includes(parts[0]) ? parts[0] : DEFAULT_SECTION;
    return { section, param: parts[1] ? decodeURIComponent(parts[1]) : null };
  }

  function showSection(sectionId, animate) {
    document.querySelectorAll('.view').forEach((view) => {
      const isActive = view.dataset.section === sectionId;
      view.hidden = !isActive;
      view.classList.remove('view--enter');
      if (isActive && animate) {
        void view.offsetWidth;                 // reinicia la animación de entrada
        view.classList.add('view--enter');
      }
    });
  }

  function showProjectsRoute(projectId) {
    const list = document.getElementById('projects-list');
    const detail = document.getElementById('projects-detail');
    if (projectId) {
      renderProjectDetail(DATA.projects.find((p) => p.id === projectId));
      list.hidden = true;
      detail.hidden = false;
    } else {
      list.hidden = false;
      detail.hidden = true;
    }
  }

  function updateNavigation(sectionId) {
    document.querySelectorAll('[data-nav]').forEach((link) => {
      if (link.dataset.nav === sectionId) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const current = DATA.navigation.find((item) => item.id === sectionId);
    document.title = (current ? current.label + ' | ' : '') + DATA.owner.fullName;
  }

  let firstRender = true;

  function handleRoute() {
    const route = parseRoute();
    if (route.section === 'proyectos') showProjectsRoute(route.param);
    showSection(route.section, !firstRender);
    updateNavigation(route.section);
    window.scrollTo(0, 0);
    if (!firstRender) {
      const view = document.querySelector('.view[data-section="' + route.section + '"]');
      if (view) view.focus({ preventScroll: true });
    }
    firstRender = false;
  }

  /* -----------------------------------------------------------------------
     Botón "volver arriba"
     ----------------------------------------------------------------------- */

  function initBackToTop() {
    document.getElementById('back-to-top').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -----------------------------------------------------------------------
     Inicio
     ----------------------------------------------------------------------- */

  function init() {
    if (!DATA) {
      document.getElementById('main-content').replaceChildren(
        h('div', { class: 'container', style: 'padding:2rem 0' },
          createMessage('No se pudo cargar el contenido del portafolio. Verifica que el archivo js/data.js exista y no tenga errores.')));
      return;
    }

    renderHeader();
    renderInfoView();
    renderProjectsList();
    renderContactView();
    renderFooter();

    // Botón "Volver al inicio" en Proyectos y Contacto (RF-006)
    document.querySelector('#view-proyectos .container').append(createHomeButton());
    document.querySelector('#view-contacto .container').append(createHomeButton());

    initBackToTop();
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  init();
})();
