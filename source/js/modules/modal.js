// =============================================================================
// MODAL
// Base modal functionality with focus trap and scroll lock
// =============================================================================

import { lockScroll, unlockScroll } from './scroll-lock.js';

let lastFocusedElement = null;

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
  if (event.key !== 'Tab') {
    return;
  }

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
export function openModal(modalId) {
  const modal = document.querySelector(`[data-modal="${modalId}"]`);
  if (!modal) {
    return;
  }

  // Save last focused element
  lastFocusedElement = document.activeElement;

  // Add scroll lock to body
  lockScroll();

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

  // Create event handlers and store them on the modal element
  // This ensures each modal has its own handlers without conflicts
  modal._trapFocusHandler = (event) => trapFocus(modal, event);
  modal._escapeHandler = (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      event.preventDefault();
      closeModal(modalId);
    }
  };

  // Add focus trap to modal element
  modal.addEventListener('keydown', modal._trapFocusHandler, true);

  // Add Escape handler to document to ensure it always works
  document.addEventListener('keydown', modal._escapeHandler, true);
}

/**
 * Close modal
 * @param {string} modalId - Modal ID
 */
export function closeModal(modalId) {
  const modal = document.querySelector(`[data-modal="${modalId}"]`);
  if (!modal) {
    return;
  }

  // Check if modal is actually open
  if (!modal.classList.contains('is-open')) {
    return;
  }

  // Remove is-open class
  modal.classList.remove('is-open');

  // Unlock scroll immediately to prevent race conditions
  unlockScroll();

  // Wait for animation to finish
  setTimeout(() => {
    modal.setAttribute('hidden', '');

    // Restore focus to last focused element
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }, 300);

  // Remove event listeners stored on modal element
  if (modal._trapFocusHandler) {
    modal.removeEventListener('keydown', modal._trapFocusHandler, true);
    delete modal._trapFocusHandler;
  }
  if (modal._escapeHandler) {
    document.removeEventListener('keydown', modal._escapeHandler, true);
    delete modal._escapeHandler;
  }
}

/**
 * Initialize modal functionality
 */
export function initModal() {
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
      // Skip tour-detail triggers - they have custom handler in tour-detail.js
      if (trigger.hasAttribute('data-tour-id')) {
        return;
      }
      event.preventDefault();
      const modalId = trigger.getAttribute('data-modal-trigger');
      openModal(modalId);
    }
  });
}
