/**
 * @fileoverview Tours Catalog Render Module
 * Handles tour cards generation and rendering
 * @module tours-catalog/tours-catalog-render
 * @author Olga Gulakevich
 * @version 1.0.0
 */

import { getDaysText, getNightsText } from '../utils/text-helpers.js';
import { generateStars } from '../utils/ui-helpers.js';

/**
 * Generate tour card HTML
 *
 * Creates responsive card markup with:
 * - WebP/JPEG picture with srcset for retina displays
 * - Tour metadata (location, duration)
 * - Title, short description
 * - Difficulty rating (stars), price
 * - "Подробнее" button with tour ID
 *
 * @param {Object} tour - Tour data object
 * @param {string} tour.id - Unique tour identifier
 * @param {Array<string>} tour.images - Tour images array
 * @param {string} tour.region - Tour region/location
 * @param {Object} tour.duration - Duration object
 * @param {number} tour.duration.days - Number of days
 * @param {number} tour.duration.nights - Number of nights
 * @param {string} tour.title - Tour title
 * @param {string} tour.shortDescription - Short description for card
 * @param {number} tour.difficulty - Difficulty level (1-5)
 * @param {number} tour.price - Tour price in rubles
 *
 * @returns {string} HTML string for tour card
 *
 * @example
 * // Generate single card
 * const tour = {
 *   id: 'elbrus-5-days',
 *   images: ['img/tours/elbrus-1@1x.jpg'],
 *   region: 'Кавказ',
 *   duration: { days: 5, nights: 4 },
 *   title: 'Поход на Эльбрус',
 *   shortDescription: 'Восхождение на высшую точку Европы',
 *   difficulty: 3,
 *   price: 45000
 * };
 * const html = generateTourCard(tour);
 */
export const generateTourCard = (tour) => `
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

      <button class="button tours-catalog__card-button" type="button" data-tour-detail="${tour.id}">
        Подробнее
        <svg class="icon" width="6" height="12" aria-hidden="true">
          <use href="/__spritemap#sprite-arrow-small-right"></use>
        </svg>
      </button>
    </div>
  </article>
`;

/**
 * Render tours grid with fade animation
 *
 * Updates tours container with new cards:
 * 1. Fade out current content (200ms)
 * 2. Replace HTML with new cards or empty message
 * 3. Fade in new content
 *
 * @param {Array<Object>} tours - Tours array to render
 *
 * @example
 * // Render all tours
 * import { getToursData } from './tours-catalog-data.js';
 * const tours = getToursData();
 * renderTours(tours);
 *
 * @example
 * // Render filtered tours
 * const easyTours = tours.filter(t => t.difficulty <= 2);
 * renderTours(easyTours);
 *
 * @example
 * // Show empty state
 * renderTours([]); // Shows "Туры не найдены"
 */
export const renderTours = (tours) => {
  const container = document.querySelector('[data-tours-container]');
  if (!container) {
    return;
  }

  // Fade-out before replacing content
  container.style.opacity = '0';
  container.style.transition = 'opacity 0.2s ease-out';

  setTimeout(() => {
    if (tours.length === 0) {
      container.innerHTML = '<p class="tours-catalog__empty">Туры не найдены</p>';
    } else {
      container.innerHTML = tours.map((tour) => generateTourCard(tour)).join('');
    }

    // Fade-in new content
    requestAnimationFrame(() => {
      container.style.opacity = '1';
    });
  }, 200); // Delay corresponds to fade-out time
};
