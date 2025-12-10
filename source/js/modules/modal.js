// =============================================================================
// MODAL
// Base modal functionality with focus trap and scroll lock
// =============================================================================

let lastFocusedElement = null;
let scrollbarWidth = 0;

/**
 * Calculate scrollbar width and set CSS variable
 */
const calculateScrollbarWidth = () => {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);

  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
};

/**
 * Get all focusable elements within a container
 * @param {HTMLElement} container - Container element
 * @returns {NodeList} - List of focusable elements
 */
const getFocusableElements = (container) => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return container.querySelectorAll(focusableSelectors);
};

/**
 * Trap focus within modal
 * @param {HTMLElement} modal - Modal element
 * @param {KeyboardEvent} event - Keyboard event
 */
const trapFocus = (modal, event) => {
  if (event.key !== 'Tab') return;

  const focusableElements = getFocusableElements(modal);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
};

/**
 * Open modal
 * @param {string} modalId - Modal ID
 */
export const openModal = (modalId) => {
  const modal = document.querySelector(`[data-modal="${modalId}"]`);
  if (!modal) return;

  // Save last focused element
  lastFocusedElement = document.activeElement;

  // Calculate scrollbar width if not done yet
  if (scrollbarWidth === 0) {
    calculateScrollbarWidth();
  }

  // Add scroll lock to body
  document.body.classList.add('scroll-lock');

  // Show modal
  modal.removeAttribute('hidden');
  setTimeout(() => {
    modal.classList.add('is-open');
  }, 10);

  // Focus first focusable element
  const focusableElements = getFocusableElements(modal);
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }

  // Add event listeners
  modal.addEventListener('keydown', (event) => trapFocus(modal, event));
  modal.addEventListener('keydown', handleEscapeKey);
};

/**
 * Close modal
 * @param {string} modalId - Modal ID
 */
export const closeModal = (modalId) => {
  const modal = document.querySelector(`[data-modal="${modalId}"]`);
  if (!modal) return;

  // Remove is-open class
  modal.classList.remove('is-open');

  // Wait for animation to finish
  setTimeout(() => {
    modal.setAttribute('hidden', '');
    document.body.classList.remove('scroll-lock');

    // Restore focus to last focused element
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }, 300);

  // Remove event listeners
  modal.removeEventListener('keydown', handleEscapeKey);
};

/**
 * Handle ESC key press
 * @param {KeyboardEvent} event - Keyboard event
 */
const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    const openModal = document.querySelector('.modal.is-open');
    if (openModal) {
      const modalId = openModal.getAttribute('data-modal');
      closeModal(modalId);
    }
  }
};

/**
 * Initialize modal functionality
 */
export const initModal = () => {
  // Handle close button clicks
  document.addEventListener('click', (event) => {
    const closeButton = event.target.closest('[data-modal-close]');
    if (closeButton) {
      const modal = closeButton.closest('.modal');
      if (modal) {
        const modalId = modal.getAttribute('data-modal');
        closeModal(modalId);
      }
    }
  });

  // Handle modal trigger clicks
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-modal-trigger]');
    if (trigger) {
      event.preventDefault();
      const modalId = trigger.getAttribute('data-modal-trigger');
      openModal(modalId);
    }
  });
};

