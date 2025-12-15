/**
 * @fileoverview Tours Catalog Module (Main Coordinator)
 * Coordinates tours catalog modal functionality by orchestrating data, rendering, and filtering.
 * Acts as a facade pattern - delegates data loading and rendering to specialized submodules.
 * @module tours-catalog
 * @author Olga Gulakevich
 * @version 1.0.0
 */

import { loadToursData, getToursData, getDifficultyLevel } from './tours-catalog/tours-catalog-data.js';
import { renderTours } from './tours-catalog/tours-catalog-render.js';

/**
 * Filter tours by difficulty level
 *
 * Returns filtered tours array based on difficulty category:
 * - 'all': Returns all tours
 * - 'easy': Returns tours with difficulty 1-2
 * - 'medium': Returns tours with difficulty 3
 * - 'hard': Returns tours with difficulty 4-5
 *
 * @param {string} filter - Filter type ('all', 'easy', 'medium', 'hard')
 * @returns {Array<Object>} Filtered tours array
 *
 * @example
 * // Get all easy tours
 * const easyTours = filterTours('easy');
 * renderTours(easyTours);
 */
const filterTours = (filter) => {
  const toursData = getToursData();

  if (filter === 'all') {
    return toursData;
  }

  return toursData.filter((tour) => {
    const level = getDifficultyLevel(tour.difficulty);
    return level === filter;
  });
};


/**
 * Handle filter button click
 *
 * Updates active filter state and re-renders tours grid with filtered results.
 * Uses event delegation to handle clicks on filter buttons.
 *
 * @param {Event} event - Click event
 *
 * @example
 * // Attach to catalog modal
 * catalogModal.addEventListener('click', handleFilterClick);
 */
const handleFilterClick = (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) {
    return;
  }

  const filter = button.getAttribute('data-filter');

  // Update active state
  document.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.classList.remove('tours-catalog__filter--active');
  });
  button.classList.add('tours-catalog__filter--active');

  // Filter and render tours
  const filteredTours = filterTours(filter);
  renderTours(filteredTours);
};

/**
 * Handle "Подробнее" button click
 *
 * Dispatches custom event to open tour detail modal with specific tour ID.
 * Uses event delegation to handle clicks on "Подробнее" buttons.
 *
 * @param {Event} event - Click event
 *
 * @example
 * // Attach to catalog modal
 * catalogModal.addEventListener('click', handleDetailClick);
 */
const handleDetailClick = (event) => {
  const button = event.target.closest('[data-tour-detail]');
  if (!button) {
    return;
  }

  const tourId = button.getAttribute('data-tour-detail');

  // Trigger tour detail modal with tour ID
  const detailEvent = new CustomEvent('open-tour-detail', {
    detail: { tourId },
  });
  document.dispatchEvent(detailEvent);
};

/**
 * Initialize tours catalog functionality
 *
 * Orchestrates catalog initialization by:
 * 1. Loading tours data from JSON (via tours-catalog-data.js)
 * 2. Setting up modal open handler to render all tours
 * 3. Attaching filter and detail click handlers
 *
 * Called once on page load from main.js.
 *
 * @example
 * // Initialize in main.js
 * import { initToursCatalog } from './modules/tours-catalog.js';
 * await initToursCatalog();
 */
export const initToursCatalog = async () => {
  // Load tours data
  await loadToursData();

  // Listen for catalog modal open
  document.addEventListener('click', async (event) => {
    const trigger = event.target.closest('[data-modal-trigger="tours-catalog"]');
    if (trigger) {
      // Render all tours when modal opens
      const toursData = getToursData();
      renderTours(toursData);
    }
  });

  // Handle filter clicks
  const catalogModal = document.querySelector('[data-modal="tours-catalog"]');
  if (catalogModal) {
    catalogModal.addEventListener('click', handleFilterClick);
    catalogModal.addEventListener('click', handleDetailClick);
  }
};

/**
 * Get tours data (for use by other modules)
 *
 * Re-exported from tours-catalog-data.js for backward compatibility.
 * Used by tour-detail.js to access tours without reloading.
 *
 * @returns {Array<Object>} Tours data array
 *
 * @example
 * // Used by tour-detail.js
 * import { getToursData } from './tours-catalog.js';
 * const tour = getToursData().find(t => t.id === tourId);
 */
export { getToursData } from './tours-catalog/tours-catalog-data.js';
