// =============================================================================
// TOURS CATALOG
// Load and display tours with filtering
// =============================================================================

import { openModal } from './modal.js';

let toursData = [];
let currentFilter = 'all';

/**
 * Load tours data from JSON
 * @returns {Promise<Array>} - Tours data
 */
const loadToursData = async () => {
  try {
    const response = await fetch('/data/tours.json');
    if (!response.ok) {
      throw new Error('Failed to load tours data');
    }
    toursData = await response.json();
    return toursData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error loading tours:', error);
    return [];
  }
};

/**
 * Get difficulty level text
 * @param {number} difficulty - Difficulty level (1-5)
 * @returns {string} - Difficulty text
 */
const getDifficultyLevel = (difficulty) => {
  if (difficulty <= 2) return 'easy';
  if (difficulty <= 3) return 'medium';
  return 'hard';
};

/**
 * Generate stars HTML
 * @param {number} count - Number of filled stars
 * @returns {string} - Stars HTML
 */
const generateStars = (count) => {
  let starsHTML = '';
  for (let i = 0; i < 5; i++) {
    const iconType = i < count ? 'star-fill' : 'star-stroke';
    starsHTML += `
      <svg class="icon" width="16" height="16" aria-hidden="true">
        <use href="/__spritemap#sprite-${iconType}"></use>
      </svg>
    `;
  }
  return starsHTML;
};

/**
 * Get days text with correct declension
 * @param {number} days - Number of days
 * @returns {string} - Days text
 */
const getDaysText = (days) => {
  if (days === 1) return '1 день';
  if (days >= 2 && days <= 4) return `${days} дня`;
  return `${days} дней`;
};

/**
 * Get nights text with correct declension
 * @param {number} nights - Number of nights
 * @returns {string} - Nights text
 */
const getNightsText = (nights) => {
  if (nights === 1) return '1 ночь';
  if (nights >= 2 && nights <= 4) return `${nights} ночи`;
  return `${nights} ночей`;
};

/**
 * Generate tour card HTML
 * @param {Object} tour - Tour data
 * @returns {string} - Card HTML
 */
const generateTourCard = (tour) => `
  <article class="card">
    <div class="card__image-wrapper">
      <picture>
        <source type="image/webp" srcset="${tour.images[0].replace('.jpg', '.webp')} 1x, ${tour.images[0].replace('@1x.jpg', '@2x.webp')} 2x" width="290" height="416">
        <img class="card__image" src="${tour.images[0]}" srcset="${tour.images[0].replace('@1x', '@2x')} 2x" width="290" height="416" alt="${tour.title}" loading="lazy">
      </picture>
    </div>

    <div class="card__content">
      <div class="card__meta">
        <span class="card__meta-location">
          <svg class="icon" width="9" height="12" aria-hidden="true">
            <use href="/__spritemap#sprite-pin-fill"></use>
          </svg>
          ${tour.region}
        </span>
        <div class="card__meta-duration-wrapper">
          <span class="card__meta-duration">
            <svg class="icon" width="20" height="20" aria-hidden="true">
              <use href="/__spritemap#sprite-sun"></use>
            </svg>
            ${getDaysText(tour.duration.days)}
          </span>
          <span class="card__meta-duration">
            <svg class="icon" width="16" height="16" aria-hidden="true">
              <use href="/__spritemap#sprite-moon"></use>
            </svg>
            ${getNightsText(tour.duration.nights)}
          </span>
        </div>
      </div>

      <h3 class="card__title">${tour.title}</h3>

      <p class="card__description">${tour.shortDescription}</p>

      <div class="card__footer">
        <div class="card__rating">
          <span class="card__description">Cложность:</span>
          <span class="visually-hidden">Рейтинг: ${tour.difficulty} из 5</span>
          <div class="card__stars">
            ${generateStars(tour.difficulty)}
          </div>
        </div>
        <div class="card__price">
          <span class="card__description">Цена:</span>
          <span class="card__price-value">от ${tour.price.toLocaleString('ru-RU')} ₽</span>
        </div>
      </div>

      <button class="tours-catalog__card-button" type="button" data-tour-detail="${tour.id}">
        Подробнее
        <svg class="icon" width="6" height="12" aria-hidden="true">
          <use href="/__spritemap#sprite-arrow-small-right"></use>
        </svg>
      </button>
    </div>
  </article>
`;

/**
 * Filter tours by difficulty
 * @param {string} filter - Filter type (all, easy, medium, hard)
 * @returns {Array} - Filtered tours
 */
const filterTours = (filter) => {
  if (filter === 'all') return toursData;

  return toursData.filter((tour) => {
    const level = getDifficultyLevel(tour.difficulty);
    return level === filter;
  });
};

/**
 * Render tours grid
 * @param {Array} tours - Tours to render
 */
const renderTours = (tours) => {
  const container = document.querySelector('[data-tours-container]');
  if (!container) return;

  if (tours.length === 0) {
    container.innerHTML = '<p class="tours-catalog__empty">Туры не найдены</p>';
    return;
  }

  container.innerHTML = tours.map((tour) => generateTourCard(tour)).join('');
};

/**
 * Handle filter button click
 * @param {Event} event - Click event
 */
const handleFilterClick = (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;

  const filter = button.getAttribute('data-filter');
  currentFilter = filter;

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
 * @param {Event} event - Click event
 */
const handleDetailClick = (event) => {
  const button = event.target.closest('[data-tour-detail]');
  if (!button) return;

  const tourId = button.getAttribute('data-tour-detail');

  // Trigger tour detail modal with tour ID
  const detailEvent = new CustomEvent('open-tour-detail', {
    detail: { tourId },
  });
  document.dispatchEvent(detailEvent);
};

/**
 * Initialize tours catalog
 */
export const initToursCatalog = async () => {
  // Load tours data
  await loadToursData();

  // Listen for catalog modal open
  document.addEventListener('click', async (event) => {
    const trigger = event.target.closest('[data-modal-trigger="tours-catalog"]');
    if (trigger) {
      // Render all tours when modal opens
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
 * @returns {Array} - Tours data
 */
export const getToursData = () => toursData;

