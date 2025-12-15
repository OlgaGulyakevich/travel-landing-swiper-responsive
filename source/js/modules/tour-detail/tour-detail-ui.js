/**
 * @fileoverview Tour Detail UI Module
 * Handles populating tour detail modal with data
 * @module tour-detail/tour-detail-ui
 * @author Olga Gulakevich
 * @version 1.0.0
 */

import { getDaysText, getNightsText } from '../utils/text-helpers.js';
import { generateStars } from '../utils/ui-helpers.js';

/**
 * Populate tour detail modal with tour data
 *
 * Updates all content sections in the tour detail modal including:
 * - Basic info (title, region, duration, difficulty, dates, group size, price)
 * - Content areas (description, included items, program)
 * - Auto-fills booking form date field
 *
 * @param {Object} tour - Tour data object
 * @param {string} tour.title - Tour title
 * @param {string} tour.region - Tour region
 * @param {Object} tour.duration - Duration object with days and nights
 * @param {number} tour.duration.days - Number of days
 * @param {number} tour.duration.nights - Number of nights
 * @param {number} tour.difficulty - Difficulty level (1-5 stars)
 * @param {string} tour.dates - Tour dates
 * @param {string} tour.groupSize - Group size description
 * @param {number} tour.price - Tour price in rubles
 * @param {string} tour.fullDescription - Full tour description
 * @param {Array<string>} tour.included - List of included items
 * @param {Array<Object>} tour.program - Tour program by days
 *
 * @example
 * // Populate modal with tour data
 * const tour = {
 *   title: 'Поход на Эльбрус',
 *   region: 'Кавказ',
 *   duration: { days: 5, nights: 4 },
 *   difficulty: 3,
 *   dates: '15-20 августа',
 *   groupSize: '8-12 человек',
 *   price: 45000,
 *   fullDescription: 'Описание тура...',
 *   included: ['Проживание', 'Питание'],
 *   program: [{ day: 1, title: 'Прибытие', description: 'Описание дня...' }]
 * };
 * populateTourDetail(tour);
 */
export const populateTourDetail = (tour) => {
  if (!tour) {
    return;
  }

  // Title
  const titleElement = document.querySelector('[data-tour-title]');
  if (titleElement) {
    titleElement.textContent = tour.title;
  }

  // Region
  const regionElement = document.querySelector('[data-tour-region]');
  if (regionElement) {
    regionElement.textContent = tour.region;
  }

  // Days
  const daysElement = document.querySelector('[data-tour-days]');
  if (daysElement) {
    daysElement.textContent = getDaysText(tour.duration.days);
  }

  // Nights
  const nightsElement = document.querySelector('[data-tour-nights]');
  if (nightsElement) {
    nightsElement.textContent = getNightsText(tour.duration.nights);
  }

  // Difficulty (stars)
  const difficultyElement = document.querySelector('[data-tour-difficulty]');
  if (difficultyElement) {
    difficultyElement.innerHTML = generateStars(tour.difficulty);
  }

  // Dates
  const datesElement = document.querySelector('[data-tour-dates]');
  if (datesElement) {
    datesElement.textContent = tour.dates;
  }

  // Group Size
  const groupElement = document.querySelector('[data-tour-group]');
  if (groupElement) {
    groupElement.textContent = tour.groupSize;
  }

  // Price
  const priceElement = document.querySelector('[data-tour-price]');
  if (priceElement) {
    priceElement.textContent = `от ${tour.price.toLocaleString('ru-RU')} ₽`;
  }

  // Description (content area - semantic HTML)
  const descriptionElement = document.querySelector('[data-tour-description]');
  if (descriptionElement) {
    descriptionElement.innerHTML = `<p>${tour.fullDescription}</p>`;
  }

  // Included list (content area - semantic HTML)
  const includedElement = document.querySelector('[data-tour-included]');
  if (includedElement) {
    includedElement.innerHTML = `
      <ul>
        ${tour.included.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    `;
  }

  // Program (content area - semantic HTML)
  const programElement = document.querySelector('[data-tour-program]');
  if (programElement) {
    programElement.innerHTML = tour.program
      .map(
        (day) => `
        <article>
          <h4>День ${day.day}</h4>
          <strong>${day.title}</strong>
          <p>${day.description}</p>
        </article>
      `
      )
      .join('');
  }

  // Auto-fill booking date
  const dateInput = document.querySelector('#booking-date');
  if (dateInput && tour.dates) {
    dateInput.value = tour.dates;
  }
};
