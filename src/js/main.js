import { CTA_BOOKING_URL, trackEvent } from '../config/constants.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Asignar URL de reserva a todos los botones CTA con la clase js-cta-btn
  const ctaButtons = document.querySelectorAll('.js-cta-btn');
  ctaButtons.forEach(btn => {
    btn.setAttribute('href', CTA_BOOKING_URL);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
    
    btn.addEventListener('click', (e) => {
      const location = btn.getAttribute('data-cta-location') || 'unknown';
      trackEvent('click_booking', { location: location });
    });
  });

  // 2. Mobile Navigation Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  
  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileNavDrawer.classList.toggle('active');
    });

    // Cerrar drawer al hacer clic en un enlace
    const drawerLinks = mobileNavDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Cerrar otros acordeones si se desea experiencia limpia
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBtn = otherItem.querySelector('.faq-question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        trackEvent('faq_open', { question: questionBtn.textContent.trim() });
      }
    });
  });

  // 4. Scroll Observer para Animación de Entrada Suave (Hardware Accelerated)
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
        trackEvent('scroll_50');
      }
      if (!tracked90 && scrollPercent >= 90) {
        tracked90 = true;
        trackEvent('scroll_90');
      }
    }, { passive: true });
  }

  // Log de confirmación de carga
  console.log('Asesoría IA Landing initialized successfully.');
});
