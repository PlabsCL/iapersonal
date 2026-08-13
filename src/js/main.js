import { CTA_BOOKING_URL, trackEvent } from '../config/constants.js';

document.addEventListener('DOMContentLoaded', () => {
  const getTextFromElement = (element) => {
    if (!element) return 'sin_texto';
    const text = element.textContent?.trim() || element.getAttribute('aria-label') || element.getAttribute('title');
    return text || 'sin_texto';
  };

  const trackClickableElement = (element, eventName, extraParams = {}) => {
    const label = getTextFromElement(element);
    const location = element.dataset.ctaLocation || element.dataset.analyticsLocation || 'pagina';

    trackEvent(eventName, {
      ...extraParams,
      ubicacion: location,
      texto: label,
      tipo: element.tagName.toLowerCase()
    });
  };

  // 1. Asignar URL de reserva a todos los botones CTA con la clase js-cta-btn
  const ctaButtons = document.querySelectorAll('.js-cta-btn');
  ctaButtons.forEach(btn => {
    btn.setAttribute('href', CTA_BOOKING_URL);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');

    btn.addEventListener('click', () => {
      const location = btn.getAttribute('data-cta-location') || 'desconocida';
      trackEvent('clic_agendar', { ubicacion: location });
    });
  });

  // 2. Tracking general de clics en enlaces y botones para dashboard de analytics
  document.addEventListener('click', (event) => {
    const target = event.target.closest('a, button');
    if (!target) return;

    if (target.closest('.js-cta-btn')) return;
    if (target.closest('.faq-question')) return;
    if (target.closest('#mobileMenuBtn')) return;

    const text = getTextFromElement(target);
    const location = target.dataset.analyticsLocation || target.dataset.ctaLocation || 'navegacion';
    const eventName = target.tagName === 'BUTTON' ? 'clic_boton' : 'clic_enlace';

    trackEvent(eventName, {
      ubicacion: location,
      texto: text,
      destino: target.getAttribute('href') || 'sin_destino'
    });
  });

  // 3. Mobile Navigation Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', String(!isExpanded));
      mobileNavDrawer.classList.toggle('active');
      trackEvent('clic_menu_movil', { estado: !isExpanded ? 'abierto' : 'cerrado' });
    });

    const drawerLinks = mobileNavDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        trackClickableElement(link, 'clic_menu_enlace', { destino: link.getAttribute('href') || 'sin_destino' });
      });
    });
  }

  // 4. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBtn = otherItem.querySelector('.faq-question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        trackEvent('faq_abierto', { pregunta: questionBtn.textContent.trim() });
      }
    });
  });

  // 5. Scroll Observer para Animación de Entrada Suave (Hardware Accelerated)
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-on-scroll');
    animatedElements.forEach(el => scrollObserver.observe(el));

    // Scroll depth tracking (50% y 90%)
    let tracked50 = false;
    let tracked90 = false;

    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
      if (!tracked50 && scrollPercent >= 50) {
        tracked50 = true;
        trackEvent('scroll_50_porcentaje');
      }
      if (!tracked90 && scrollPercent >= 90) {
        tracked90 = true;
        trackEvent('scroll_90_porcentaje');
      }
    }, { passive: true });
  }

  console.log('Asesoría IA Landing initialized successfully.');
});
