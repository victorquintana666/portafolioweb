/* ==========================================================================
   data.js — Contenido del portafolio (separado de la presentación)

   Para personalizar el sitio edita ÚNICAMENTE este archivo:
   - Agregar un proyecto   -> añade un objeto a `projects`.
   - Agregar una habilidad -> añade un texto a `skills`.
   - Agregar tecnologías   -> añade elementos a `items` de una categoría
                              (o una categoría nueva en `technologies`).
   Nada más del sitio necesita modificarse.
   ========================================================================== */

window.PORTFOLIO_DATA = {

  /* ---------- Datos personales (RF-011, RF-012, RF-021) ---------- */
  owner: {
    fullName: 'Nombre Apellido Apellido',
    greeting: 'Hola, soy',
    description:
      'Soy estudiante apasionado por el desarrollo de software. Me gusta transformar ' +
      'ideas en aplicaciones útiles, aprender nuevas tecnologías y trabajar en equipo ' +
      'para construir soluciones claras y bien organizadas.'
  },

  /* ---------- Menú de navegación (RF-001, RF-002) ----------
     Cambia aquí el texto de cada opción (por ejemplo "Información" por "Inicio"). */
  navigation: [
    { id: 'informacion', label: 'Información' },
    { id: 'proyectos',   label: 'Proyectos' },
    { id: 'contacto',    label: 'Contacto' }
  ],

  /* ---------- Formación académica (RF-013, RF-014) ---------- */
  education: {
    career: 'Ingeniería en Sistemas Computacionales',
    institution: 'Nombre de la institución educativa'
  },

  /* ---------- Currículum (RF-022) ----------
     Si aún no tienes currículum deja `url` vacío ('') y el botón no se mostrará. */
  curriculum: {
    url: 'assets/docs/curriculum.pdf',
    downloadName: 'Curriculum-Nombre-Apellido.pdf'
  },

  /* ---------- Habilidades (RF-015, RF-016, RNF-028) ---------- */
  skills: [
    'Trabajo en equipo',
    'Resolución de problemas',
    'Comunicación efectiva',
    'Aprendizaje autónomo',
    'Pensamiento analítico',
    'Gestión del tiempo'
  ],

  /* ---------- Tecnologías por categoría (RF-017, RF-018, RF-019) ---------- */
  technologies: [
    {
      category: 'Lenguajes',
      description: 'Lenguajes de programación y de marcado con los que desarrollo mis proyectos.',
      items: ['HTML', 'CSS', 'JavaScript', 'Python', 'Java']
    },
    {
      category: 'Bases de datos',
      description: 'Sistemas que utilizo para almacenar, consultar y administrar información.',
      items: ['MySQL', 'PostgreSQL', 'MongoDB']
    },
    {
      category: 'Herramientas',
      description: 'Herramientas de apoyo para el control de versiones, la edición y la colaboración.',
      items: ['Git', 'GitHub', 'Visual Studio Code', 'Postman']
    },
    {
      category: 'Diseño',
      description: 'Recursos que empleo para planear y diseñar interfaces claras y atractivas.',
      items: ['Figma', 'Diseño responsivo', 'Prototipado']
    }
  ],

  /* ---------- Intereses profesionales (RF-020) ---------- */
  interests:
    'Me interesa el desarrollo web full stack, el diseño de interfaces centradas en el usuario ' +
    'y la creación de software mantenible. También tengo curiosidad por las bases de datos, ' +
    'la ingeniería de requerimientos y las buenas prácticas de calidad de software.',

  /* ---------- Etiquetas de estado de proyectos (RF-042) ---------- */
  statusLabels: {
    'finalizado':    'Finalizado',
    'en-desarrollo': 'En desarrollo',
    'en-pausa':      'En pausa'
  },

  /* ---------- Proyectos (RF-024 a RF-044, RNF-027) ----------
     Campos de cada proyecto:
       id          identificador único (sin espacios ni acentos)
       name        nombre
       summary     descripción breve (tarjeta)
       description descripción detallada
       purpose     finalidad para la que se desarrolló
       image       imagen representativa (tarjeta y detalle)
       gallery     imágenes adicionales (puede ser [])
       technologies tecnologías utilizadas
       status      'finalizado' | 'en-desarrollo' | 'en-pausa'
       featured    true para mostrarlo en "Proyectos destacados"
       team        true si fue realizado en equipo
       role        rol del propietario (se muestra solo si team es true)
       repository  URL del repositorio, o null si no existe
       demo        URL de la demostración, o null si no existe
  --------------------------------------------------------------- */
  projects: [
    {
      id: 'sistema-inventario',
      name: 'Sistema de Gestión de Inventario',
      summary: 'Aplicación web para registrar, consultar y controlar el inventario de un pequeño negocio.',
      description:
        'Sistema web que permite dar de alta productos, registrar entradas y salidas, y consultar ' +
        'las existencias en tiempo real. Incluye búsqueda, filtros por categoría y reportes básicos.',
      purpose: 'Reemplazar el control manual en hojas de cálculo por un sistema centralizado y confiable.',
      image: 'assets/images/projects/inventario-0.svg',
      gallery: [
        'assets/images/projects/inventario-1.svg',
        'assets/images/projects/inventario-2.svg'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MySQL'],
      status: 'finalizado',
      featured: true,
      team: true,
      role: 'Desarrollador back-end: diseñé la base de datos y programé la API de productos.',
      repository: 'https://github.com/usuario/sistema-inventario',
      demo: 'https://usuario.github.io/sistema-inventario'
    },
    {
      id: 'app-tareas',
      name: 'Aplicación Web de Tareas',
      summary: 'Gestor de tareas con categorías, fechas límite y marcado de pendientes.',
      description:
        'Aplicación de una sola página para organizar actividades diarias. Permite crear, editar, ' +
        'completar y eliminar tareas, agruparlas por categoría y ordenarlas por fecha límite.',
      purpose: 'Practicar el manejo del DOM y del estado de una aplicación con JavaScript.',
      image: 'assets/images/projects/tareas-0.svg',
      gallery: [
        'assets/images/projects/tareas-1.svg',
        'assets/images/projects/tareas-2.svg'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript'],
      status: 'en-desarrollo',
      featured: true,
      team: false,
      role: null,
      repository: 'https://github.com/usuario/app-tareas',
      demo: null
    },
    {
      id: 'sitio-cafeteria',
      name: 'Sitio Web para Cafetería',
      summary: 'Sitio informativo con menú, ubicación y horarios para una cafetería local.',
      description:
        'Sitio web responsivo que presenta el menú de la cafetería, sus horarios, su ubicación ' +
        'y formas de contacto, con un diseño cálido y fácil de leer desde cualquier dispositivo.',
      purpose: 'Dar presencia en línea a un negocio local y facilitar que sus clientes lo encuentren.',
      image: 'assets/images/projects/cafeteria-0.svg',
      gallery: [
        'assets/images/projects/cafeteria-1.svg',
        'assets/images/projects/cafeteria-2.svg'
      ],
      technologies: ['HTML', 'CSS', 'Figma'],
      status: 'finalizado',
      featured: false,
      team: false,
      role: null,
      repository: null,
      demo: 'https://usuario.github.io/sitio-cafeteria'
    },
    {
      id: 'videojuego-2d',
      name: 'Videojuego de Plataformas 2D',
      summary: 'Videojuego de plataformas con niveles, enemigos y sistema de puntuación.',
      description:
        'Videojuego en dos dimensiones con varios niveles, enemigos con comportamientos simples, ' +
        'coleccionables y un sistema de puntuación. El desarrollo está pausado temporalmente.',
      purpose: 'Aplicar programación orientada a objetos y trabajo colaborativo en un proyecto creativo.',
      image: 'assets/images/projects/videojuego-0.svg',
      gallery: [
        'assets/images/projects/videojuego-1.svg',
        'assets/images/projects/videojuego-2.svg'
      ],
      technologies: ['Java', 'Git'],
      status: 'en-pausa',
      featured: false,
      team: true,
      role: 'Programador de mecánicas: implementé el movimiento del personaje y las colisiones.',
      repository: null,
      demo: null
    }
  ],

  /* ---------- Contacto (RF-045 a RF-052) ---------- */
  contact: {
    availability:
      'Estoy disponible para recibir consultas, propuestas de colaboración y oportunidades ' +
      'profesionales. ¡Escríbeme y con gusto te respondo!',
    email: {
      address: 'correo@ejemplo.com',
      inFooter: true
    },
    /* Medio de contacto profesional (RF-051). Pon `null` si no deseas mostrarlo. */
    professional: {
      label: 'Contacto profesional',
      value: '+52 55 0000 0000',
      href: 'tel:+525500000000',
      inFooter: false
    },
    /* Redes sociales (RF-048, RF-049, RF-050, RNF-017) */
    social: [
      { network: 'GitHub',    username: '@usuario', url: 'https://github.com/usuario',            inFooter: true },
      { network: 'LinkedIn',  username: '@usuario', url: 'https://www.linkedin.com/in/usuario',   inFooter: true },
      { network: 'Instagram', username: '@usuario', url: 'https://www.instagram.com/usuario',     inFooter: false }
    ]
  },

  /* ---------- Textos de la interfaz ---------- */
  messages: {
    imageError: 'No se pudo cargar la imagen. Intenta recargar la página más tarde.',
    projectNotFound: 'No encontramos el proyecto solicitado. Es posible que haya sido movido o que el enlace sea incorrecto.',
    noProjects: 'Por el momento no hay proyectos para mostrar.',
    repositoryUnavailable: 'Repositorio no disponible',
    demoUnavailable: 'Demostración no disponible',
    dataError: 'No se pudo cargar el contenido del portafolio. Verifica que el archivo js/data.js exista y no tenga errores.'
  }
};
