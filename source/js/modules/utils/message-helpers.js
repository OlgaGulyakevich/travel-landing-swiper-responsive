/**
 * @fileoverview Message display utility functions
 * @module utils/message-helpers
 * @author Olga Gulakevich
 * @version 1.0.0
 */

/**
 * Shows a success or error message to the user
 *
 * Displays a message with appropriate styling, ARIA attributes, and auto-hide.
 * Can work with existing container or create a dynamic one. Optionally scrolls
 * to form on mobile for better UX.
 *
 * @param {string} type - Message type: 'success' or 'error'
 * @param {string} text - Message text to display
 * @param {Object} [options={}] - Display options
 * @param {HTMLElement} [options.container] - Existing container element (if null, creates dynamic one)
 * @param {number} [options.duration=5000] - Auto-hide duration in milliseconds
 * @param {HTMLFormElement} [options.scrollTarget] - Form element to scroll to on mobile (success only)
 * @param {string} [options.containerSelector] - Selector for dynamic container (e.g., '[data-booking-message]')
 *
 * @example
 * // Contact form (existing container, with scroll)
 * const container = document.querySelector('[data-form-message]');
 * const form = document.querySelector('[data-form="contact"]');
 * showMessage('success', 'Спасибо! Мы свяжемся с вами в ближайшее время.', {
 *   container,
 *   scrollTarget: form
 * });
 *
 * @example
 * // Booking form (dynamic container)
 * showMessage('error', 'Ошибка отправки. Попробуйте позже.', {
 *   containerSelector: '[data-booking-message]'
 * });
 */
export const showMessage = (type, text, options = {}) => {
  const {
    container: existingContainer = null,
    duration = 5000,
    scrollTarget = null,
    containerSelector = '[data-message]'
  } = options;

  // Get or create container
  let container;
  if (existingContainer) {
    container = existingContainer;
  } else {
    // Try to find existing dynamic container
    container = document.querySelector(containerSelector);
    if (!container) {
      // Create new dynamic container
      container = document.createElement('div');
      container.className = 'form-message';
      container.setAttribute(containerSelector.replace(/[[\]"']/g, ''), 'true');
      document.body.appendChild(container);
    }
  }

  // Set message content
  container.textContent = text;
  container.className = `form-message form-message--${type}`;

  // Set ARIA attributes based on type
  if (type === 'success') {
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
  } else if (type === 'error') {
    container.setAttribute('role', 'alert');
    container.setAttribute('aria-live', 'assertive');
  }

  // Mobile: scroll to form to show it's cleared (only on success)
  if (type === 'success' && scrollTarget && window.innerWidth < 768) {
    setTimeout(() => {
      scrollTarget.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 100);
  }

  // Auto-hide message after duration
  setTimeout(() => {
    container.className = 'form-message';
    container.textContent = '';
  }, duration);
};
