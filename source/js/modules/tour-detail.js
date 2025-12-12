// =============================================================================
// TOUR DETAIL
// Display detailed tour information with gallery and booking form
// =============================================================================

import { openModal, closeModal } from './modal.js';
import { getToursData } from './tours-catalog.js';
import Swiper from 'swiper';
import { Navigation, EffectFade, } from 'swiper/modules';
import 'swiper/css/effect-fade';

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
  if (days === 1) {
    return '1 день';
  }
  if (days >= 2 && days <= 4) {
    return `${days} дня`;
  }
  return `${days} дней`;
};

/**
 * Initialize Swiper gallery
 * @param {Array} images - Array of image paths
 */
const initGallery = (images) => {
  const swiperContainer = document.querySelector('[data-tour-gallery]');
  if (!swiperContainer) {
    return;
  }

  // Hide gallery immediately before any DOM manipulation
  swiperContainer.classList.add('is-loading');

  const wrapper = swiperContainer.querySelector('.swiper-wrapper');
  if (!wrapper) {
    return;
  }

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
    modules: [Navigation, EffectFade],
    loop: images.length > 1,
    navigation: {
      nextEl: '.tour-detail__slider-button--next',
      prevEl: '.tour-detail__slider-button--prev',
    },
    // Fade effect with adaptive speed
    effect: 'fade',
    speed: 400,

    fadeEffect: {
      crossFade: false
    },
    grabCursor: true,
  });

  // Show gallery with smooth fade-in after modal is rendered
  // Delay allows modal to open before starting gallery fade animation
  setTimeout(() => {
    swiperContainer.classList.remove('is-loading');
  }, 100);
};

/**
 * Get nights text with correct declension
 * @param {number} nights - Number of nights
 * @returns {string} - Nights text
 */
const getNightsText = (nights) => {
  if (nights === 1) {
    return '1 ночь';
  }
  if (nights >= 2 && nights <= 4) {
    return `${nights} ночи`;
  }
  return `${nights} ночей`;
};

/**
 * Clear tour detail modal content
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
  if (tourDetailSwiper) {
    tourDetailSwiper.destroy(true, true);
    tourDetailSwiper = null;
  }

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
 * Populate tour detail modal
 * @param {Object} tour - Tour data
 */
const populateTourDetail = (tour) => {
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
 * Get or create message container for success/error messages
 * @returns {HTMLElement} - Message container
 */
const getOrCreateMessageContainer = () => {
  let container = document.querySelector('[data-booking-message]');
  if (!container) {
    container = document.createElement('div');
    container.className = 'form-message';
    container.setAttribute('data-booking-message', 'status');
    document.body.appendChild(container);
  }
  return container;
};

/**
 * Show success message
 */
const showBookingSuccessMessage = () => {
  const container = getOrCreateMessageContainer();
  container.textContent = 'Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.';
  container.className = 'form-message form-message--success';
  container.setAttribute('role', 'status');
  container.setAttribute('aria-live', 'polite');

  setTimeout(() => {
    container.className = 'form-message';
    container.textContent = '';
  }, 5000);
};

/**
 * Show error message
 * @param {string} message - Error message text
 */
const showBookingErrorMessage = (message) => {
  const container = getOrCreateMessageContainer();
  container.textContent = message;
  container.className = 'form-message form-message--error';
  container.setAttribute('role', 'alert');
  container.setAttribute('aria-live', 'assertive');

  setTimeout(() => {
    container.className = 'form-message';
    container.textContent = '';
  }, 5000);
};

/**
 * Handle booking form submission
 * @param {Event} event - Submit event
 */
const handleBookingSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Validate required fields
  const firstname = formData.get('firstname');
  const lastname = formData.get('lastname');
  const phone = formData.get('phone');
  const email = formData.get('email');
  const people = formData.get('people');
  const city = formData.get('city');
  const experience = formData.get('experience');

  if (!firstname || !lastname || !phone || !email || !people || !city || !experience) {
    return; // Validation module handles errors
  }

  try {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;

    const response = await fetch('https://echo.htmlacademy.ru', {
      method: 'POST',
      body: formData,
    });

    submitButton.textContent = originalText;
    submitButton.disabled = false;

    if (response.ok) {
      showBookingSuccessMessage();
      setTimeout(() => {
        form.reset();
        form.querySelectorAll('.is-invalid').forEach((input) => {
          input.classList.remove('is-invalid');
        });
        form.querySelectorAll('.tour-detail__form-error').forEach((error) => {
          error.setAttribute('hidden', '');
        });
      }, 500);
      setTimeout(() => closeModal('tour-detail'), 1000);
    } else {
      showBookingErrorMessage('Ошибка отправки. Пожалуйста, попробуйте позже.');
    }
  } catch (error) {
    showBookingErrorMessage('Ошибка соединения. Проверьте интернет и попробуйте снова.');
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.textContent = 'Отправить заявку';
    submitButton.disabled = false;
  }
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

