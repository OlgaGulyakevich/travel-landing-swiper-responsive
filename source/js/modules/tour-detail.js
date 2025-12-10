// =============================================================================
// TOUR DETAIL
// Display detailed tour information with gallery and booking form
// =============================================================================

import { openModal, closeModal } from './modal.js';
import { getToursData } from './tours-catalog.js';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

let tourDetailSwiper = null;

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
 * Get duration text with correct declension
 * @param {number} days - Number of days
 * @returns {string} - Duration text
 */
const getDurationText = (days) => {
  if (days === 1) return '1 день';
  if (days >= 2 && days <= 4) return `${days} дня`;
  return `${days} дней`;
};

/**
 * Initialize Swiper gallery
 * @param {Array} images - Array of image paths
 */
const initGallery = (images) => {
  const swiperContainer = document.querySelector('[data-tour-gallery]');
  if (!swiperContainer) return;

  const wrapper = swiperContainer.querySelector('.swiper-wrapper');
  if (!wrapper) return;

  // Generate slides
  wrapper.innerHTML = images
    .map(
      (image) => `
    <div class="swiper-slide">
      <picture>
        <source type="image/webp" srcset="${image.replace('.jpg', '.webp')} 1x, ${image.replace('@1x.jpg', '@2x.webp')} 2x">
        <img src="${image}" srcset="${image.replace('@1x', '@2x')} 2x" alt="Фото тура" loading="lazy">
      </picture>
    </div>
  `
    )
    .join('');

  // Destroy existing swiper if any
  if (tourDetailSwiper) {
    tourDetailSwiper.destroy(true, true);
  }

  // Initialize new swiper
  tourDetailSwiper = new Swiper(swiperContainer, {
    modules: [Navigation],
    loop: images.length > 1,
    navigation: {
      nextEl: '.tour-detail__slider-button--next',
      prevEl: '.tour-detail__slider-button--prev',
    },
    speed: 600,
    grabCursor: true,
  });
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
 * Populate tour detail modal
 * @param {Object} tour - Tour data
 */
const populateTourDetail = (tour) => {
  if (!tour) return;

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
    daysElement.textContent = getDurationText(tour.duration.days);
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

  // Description
  const descriptionElement = document.querySelector('[data-tour-description]');
  if (descriptionElement) {
    descriptionElement.textContent = tour.fullDescription;
  }

  // Included list
  const includedElement = document.querySelector('[data-tour-included]');
  if (includedElement) {
    includedElement.innerHTML = tour.included
      .map((item) => `<li>${item}</li>`)
      .join('');
  }

  // Program
  const programElement = document.querySelector('[data-tour-program]');
  if (programElement) {
    programElement.innerHTML = tour.program
      .map(
        (day) => `
        <div class="tour-detail__program-day">
          <div class="tour-detail__program-day-number">День ${day.day}</div>
          <div class="tour-detail__program-day-title">${day.title}</div>
          <div class="tour-detail__program-day-description">${day.description}</div>
        </div>
      `
      )
      .join('');
  }

  // Initialize gallery
  initGallery(tour.images);
};

/**
 * Handle tour detail modal open
 * @param {string} tourId - Tour ID
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

  // Open modal
  openModal('tour-detail');
};

/**
 * Handle booking form submission
 * @param {Event} event - Submit event
 */
const handleBookingSubmit = (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Basic validation
  const name = formData.get('name');
  const phone = formData.get('phone');
  const email = formData.get('email');

  if (!name || !phone || !email) {
    // eslint-disable-next-line no-alert
    alert('Пожалуйста, заполните все обязательные поля');
    return;
  }

  // Here you would normally send data to server
  // For now, just show success message and close modal
  // eslint-disable-next-line no-alert
  alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');

  // Reset form and close modal
  form.reset();
  closeModal('tour-detail');
};

/**
 * Initialize tour detail functionality
 */
export const initTourDetail = () => {
  // Handle "Смотреть тур" buttons from hero slider
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-modal-trigger="tour-detail"]');
    if (trigger) {
      event.preventDefault();
      const tourId = trigger.getAttribute('data-tour-id');
      if (tourId) {
        openTourDetail(tourId);
      }
    }
  });

  // Handle custom event from tours catalog
  document.addEventListener('open-tour-detail', (event) => {
    const { tourId } = event.detail;
    closeModal('tours-catalog'); // Close catalog modal first
    setTimeout(() => {
      openTourDetail(tourId);
    }, 300);
  });

  // Handle booking form submission
  const bookingForm = document.querySelector('[data-tour-booking-form]');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleBookingSubmit);
  }
};

