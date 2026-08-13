/**
 * Configuración Global de la Landing Page
 */

// URL principal para agendar asesoría (Calendly, WhatsApp, Formulario o Pasarela de Pago)
export const CTA_BOOKING_URL = 'https://calendly.com/tu-usuario/asesoria-ia'; // Reemplazar por tu enlace real de reserva

// Datos de Marca
export const BRAND_NAME = 'Asesoría IA Personal';
export const CONTACT_EMAIL = 'contacto@asesoriaia.com';

// Función para emitiir eventos de analítica (Google Analytics 4 / Meta Pixel)
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
  console.log(`[Analytics Event Tracked]: ${eventName}`, params);
};
