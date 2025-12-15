/**
 * @fileoverview Tour Detail Module (Main Coordinator)
 * Coordinates tour detail modal functionality by orchestrating UI, gallery, and booking submodules.
 * Acts as a facade pattern - delegates specific tasks to specialized submodules.
 * @module tour-detail
 * @author Olga Gulakevich
 * @version 1.0.0
 */

import { openModal, closeModal } from './modal.js';
import { getToursData } from './tours-catalog.js';
import { populateTourDetail } from './tour-detail/tour-detail-ui.js';
import { initGallery, destroyGallery } from './tour-detail/tour-detail-gallery.js';
import { handleBookingSubmit } from './tour-detail/tour-detail-booking.js';

/**
 * Clear tour detail modal content
 *
 * Resets modal to clean state by:
 * - Hiding gallery and clearing slides
 * - Destroying Swiper instance (via destroyGallery)
 * - Clearing all tour information (title, region, duration, etc.)
 * - Clearing content areas (description, included items, program)
 * - Resetting booking form validation state
 *
 * Called before opening new tour to prevent flickering and data mixing.
 *
 * @example
 * // Clear before opening new tour
 * clearTourDetail();
 * openTourDetail('elbrus-5-days');
 */
const clearTourDetail = () => {
  // Hide gallery immediately to prevent flickering
  const slider = document.querySelector('[data-tour-gallery]');
  if (slider) {
    slider.classList.add('is-loading');
  }

  // Clear gallery
  const wrapper = document.querySelector('[data-tour-gallery] .swiper-wrapper');
  if (wrapper) {
    wrapper.innerHTML = '';
  }

  // Destroy existing swiper
  destroyGallery();

  // Clear all text content
  const elementsToСlear = [
    '[data-tour-title]',
    '[data-tour-region]',
    '[data-tour-days]',
    '[data-tour-nights]',
    '[data-tour-dates]',
    '[data-tour-group]',
    '[data-tour-price]',
  ];

  elementsToСlear.forEach((selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = '';
    }
  });

  // Clear content areas (HTML content)
  const descriptionElement = document.querySelector('[data-tour-description]');
  if (descriptionElement) {
    descriptionElement.innerHTML = '';
  }

  const includedElement = document.querySelector('[data-tour-included]');
  if (includedElement) {
    includedElement.innerHTML = '';
  }

  const programElement = document.querySelector('[data-tour-program]');
  if (programElement) {
    programElement.innerHTML = '';
  }

  const difficultyElement = document.querySelector('[data-tour-difficulty]');
  if (difficultyElement) {
    difficultyElement.innerHTML = '';
  }

  // Clear booking form validation state
  const form = document.querySelector('[data-tour-booking-form]');
  if (form) {
    // Remove validation error classes
    form.querySelectorAll('.is-invalid').forEach((input) => {
      input.classList.remove('is-invalid');
    });

    // Hide error messages
    form.querySelectorAll('.tour-detail__form-error').forEach((error) => {
      error.setAttribute('hidden', '');
    });
  }
};


/**
 * Open tour detail modal with tour data
 *
 * Orchestrates modal opening by delegating to specialized submodules:
 * 1. Fetches tour data from tours catalog
 * 2. Populates UI with tour data (via tour-detail-ui.js)
 * 3. Initializes gallery with images (via tour-detail-gallery.js)
 * 4. Opens modal overlay
 *
 * @param {string} tourId - Unique tour identifier (e.g., 'elbrus-5-days', 'kazbek-trek')
 *
 * @example
 * // Open tour detail from button click
 * openTourDetail('elbrus-5-days');
 */
const openTourDetail = (tourId) => {
  const toursData = getToursData();
  const tour = toursData.find((t) => t.id === tourId);

  if (!tour) {
    // eslint-disable-next-line no-console
    console.error(`Tour with id "${tourId}" not found`);
    return;
  }

  // Populate modal with tour data
  populateTourDetail(tour);

  // Initialize gallery
  initGallery(tour.images);

  // Open modal
  openModal('tour-detail');
};


/**
 * Initialize tour detail functionality
 *
 * Sets up all event handlers for tour detail modal:
 * - Click handlers for "Смотреть тур" buttons from hero slider
 * - Custom event handler for tours catalog card clicks
 * - Form submission handler for booking form (via tour-detail-booking.js)
 *
 * Called once on page load from main.js.
 *
 * @example
 * // Initialize in main.js
 * import { initTourDetail } from './modules/tour-detail.js';
 * initTourDetail();
 */
export const initTourDetail = () => {
  // Handle "Смотреть тур" buttons from hero slider
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-modal-trigger="tour-detail"]');
    if (trigger) {
      event.preventDefault();
      const tourId = trigger.getAttribute('data-tour-id');
      if (tourId) {
        // Clear old content before opening to prevent flickering
        clearTourDetail();
        openTourDetail(tourId);
      }
    }
  });

  // Handle custom event from tours catalog
  document.addEventListener('open-tour-detail', (event) => {
    const { tourId } = event.detail;

    // Close catalog and immediately open tour detail (same as hero)
    closeModal('tours-catalog');
    clearTourDetail();
    openTourDetail(tourId);
  });

  // Handle booking form submission
  const bookingForm = document.querySelector('[data-tour-booking-form]');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleBookingSubmit);
  }
};
