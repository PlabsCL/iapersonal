# Manual de Código & Buenas Prácticas — Landing Page Asesoría IA

Este repositorio contiene el código fuente de la Landing Page orientada a conversión para la **Asesoría Personalizada 1:1 de Inteligencia Artificial**.

---

## 🚀 1. Arquitectura & Despliegue en GitHub Pages

- **Despliegue Directo**: La web está diseñada para servirse **estáticamente directa desde GitHub Pages** (sin requerir procesos de compilación o servidores Node.js en producción).
- **Rutas Relativas Estrictas**: Todos los enlaces e inclusión de scripts/imágenes deben utilizar siempre rutas relativas (`./src/css/...`, `./assets/images/...`). Esto garantiza que el sitio funcione sin errores tanto en subdominios (`usuario.github.io/repositorio/`) como en dominios personalizados.
- **Zero-Junk Code Policy**: Prohibido acumular paquetes npm innecesarios, librerías JS pesadas o archivos temporales. El código debe mantenerse limpio, ligero y modular.

---

## 🎨 2. Estética & Sistema de Diseño (Claridad & Hiper-Realismo)

- **Tema Claro (Light & Pristine Aesthetic)**:
  - Estrictamente **prohibidos los temas oscuros o fondos negros**.
  - Fondo principal: Blanco puro (`#FFFFFF`) y Slate suave (`#F8FAFC`).
  - Tipografía: Slate oscuro de alto contraste (`#0F172A`) para máximos niveles de legibilidad.
  - Colores de Acento: Azul Real (`#2563EB`) y Verde Esmeralda (`#059669`).
- **Imágenes Hiper-Realistas**:
  - **Prohibidos los clichés futuristas**: Sin robots, cerebros digitales, ciborgs ni circuitos.
  - Usar imágenes hiper-realistas y fotográficas de personas reales en espacios de trabajo luminosos, naturales y aspiracionales.
  - Atributos requeridos en todas las imágenes: `width`, `height` explícitos (para eliminar CLS) y `loading="lazy"` para imágenes debajo del Hero.

---

## ⚡ 3. Performance & Core Web Vitals (Lighthouse >= 95)

Toda modificación debe mantener o superar una puntuación de **95+** en Google Lighthouse (Mobile y Desktop) en las 4 métricas:

1. **Performance**:
   - LCP (Largest Contentful Paint) < 1.2s.
   - CLS (Cumulative Layout Shift) = 0.
   - INP (Interaction to Next Paint) < 50ms.
   - Preconnect de Google Fonts y `font-display: swap`.
2. **Accessibility (WCAG)**:
   - Contraste de texto mínimo 4.5:1.
   - Touch targets interactivos con área mínima de `44px x 44px`.
   - Navegación completa por teclado y etiquetas `aria-*` en menús y acordeones.
   - Soporte para `prefers-reduced-motion` en CSS.
3. **Best Practices**:
   - HTTPS nativo en GitHub Pages.
   - Atributos `rel="noopener noreferrer"` en enlaces salientes.
   - Consola limpia sin advertencias o errores.
4. **SEO Técnico**:
   - Estructura semántica HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
   - Un solo elemento `<h1>` en toda la página (ubicado en el Hero).
   - Metadatos OpenGraph y Twitter Cards configurados.
   - Archivos `robots.txt` y `sitemap.xml` vigentes.
   - Datos estructurados JSON-LD (`EducationalOrganization` y `FAQPage`).

---

## 🛠️ 4. Guía de Desarrollo & Mantenimiento

### Estructura de Directorios

```text
.
├── index.html            # Estructura principal HTML5 y metadata SEO
├── MEMORY.md             # Memoria estratégica del negocio y posicioanmiento
├── README.md             # Manual de buenas prácticas de código (este archivo)
├── robots.txt            # Instrucciones para motores de búsqueda
├── sitemap.xml           # Mapa del sitio para indexación
├── assets/
│   └── images/           # Imágenes hiper-realistas en alta resolución
│       ├── hero.jpg
│       └── productivity.jpg
└── src/
    ├── config/
    │   └── constants.js  # Centralización de URL de reserva y analítica
    ├── css/
    │   └── styles.css    # Design System en Vanilla CSS
    └── js/
        └── main.js       # Interactividad, acordeón FAQ y tracking
```

### Cambio de Enlace de Reserva (Booking)
Para cambiar el destino de todos los botones CTA de la página, **solamente edita la constante en `src/config/constants.js`**:

```javascript
export const CTA_BOOKING_URL = 'https://calendly.com/tu-usuario/asesoria-ia';
```

---

## 📌 5. Reglas de Oro al Codificar en este Proyecto

1. **No asumir respuestas ni adivinar**: Verificar siempre los archivos y el código existente antes de realizar cambios.
2. **No acumular código basura**: Si creas un script de prueba o archivo temporal, elimínalo antes de guardar.
3. **Mantener la emoción central**: Cualquier ajuste en los textos debe reforzar el pensamiento del usuario: *"Ya uso IA, pero siento que no le estoy sacando todo el poder y no tengo tiempo para aprender solo"*.
