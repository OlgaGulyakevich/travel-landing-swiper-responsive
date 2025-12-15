/**
 * Sliders Module
 * Initialize all Swiper sliders with specific configurations
 */

import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { makePaginationKeyboardAccessible } from './pagination-keyboard.js';
import { addNavigationIcons } from './utils/slider-helpers.js';

// Common configuration for all sliders
const commonConfig = {
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
};

// Common configuration for sliders with navigation buttons
const navigationConfig = {
  ...commonConfig,
  modules: [Navigation, Keyboard],
  watchSlidesProgress: true,
  on: {
    init: function() {
      addNavigationIcons(this);
    }
  }
};

export const initSliders = () => {
  // Hero Slider - Main landing slider with fade effect and pagination
  void new Swiper('[data-slider="hero"]', {
    ...commonConfig,
    modules: [Pagination, EffectFade, Keyboard],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true,
    autoplay: false,
    grabCursor: true,
    effect: 'fade',
    speed: 400,
    fadeEffect: {
      crossFade: false
    },
    breakpoints: {
      768: { speed: 600 },
      1440: { speed: 800 }
    },
    on: {
      init: function() {
        makePaginationKeyboardAccessible(this);
      },
      paginationUpdate: function() {
        makePaginationKeyboardAccessible(this);
      }
    }
  });

  // Tours Slider - Tours section carousel with responsive layout
  void new Swiper('[data-slider="tours"]', {
    ...navigationConfig,
    navigation: {
      nextEl: '.tours__button-next',
      prevEl: '.tours__button-prev',
    },
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    speed: 400,
    resistance: true,
    resistanceRatio: 0.85,
    breakpoints: {
      768: { slidesPerView: 2 },
      1440: { slidesPerView: 3, spaceBetween: 23 },
    },
  });

  // Training Slider - Training team carousel with different initial slides per breakpoint
  void new Swiper('[data-slider="training"]', {
    ...navigationConfig,
    navigation: {
      nextEl: '.training__button-next',
      prevEl: '.training__button-prev',
    },
    slidesPerView: 1,
    initialSlide: 2, // Mobile: starts from 3rd slide (Nadezhda)
    spaceBetween: 20,
    speed: 400,
    resistance: true,
    resistanceRatio: 0.85,
    breakpoints: {
      768: { slidesPerView: 3, initialSlide: 0 }, // Tablet/Desktop: from 1st slide
      1440: { slidesPerView: 4, initialSlide: 0 },
    },
  });

  // Reviews Slider - Customer reviews with auto width slides
  void new Swiper('[data-slider="reviews"]', {
    ...navigationConfig,
    navigation: {
      nextEl: '.reviews__button-next',
      prevEl: '.reviews__button-prev',
    },
    slidesPerView: 'auto',
    spaceBetween: 30,
    speed: 600,
    resistance: true,
    resistanceRatio: 0.85,
    breakpoints: {
      1440: { spaceBetween: 120 },
    },
  });

  // Advantages Slider - Desktop-only carousel (static grid on mobile/tablet)
  // Mobile/Tablet: Disabled, uses CSS flex grid
  // Desktop: Loop mode with 10 slides (5 original + 5 duplicates), slides by 2
  void new Swiper('[data-slider="advantages"]', {
    ...navigationConfig,
    navigation: {
      nextEl: '.advantages__button-next',
      prevEl: '.advantages__button-prev',
    },
    enabled: false, // Disabled by default
    breakpoints: {
      320: { enabled: false },
      768: { enabled: false },
      1440: {
        enabled: true,
        loop: true,
        loopedSlides: 10,
        speed: 800,
        slidesPerView: 'auto',
        slidesPerGroup: 2,
        centeredSlides: true,
        spaceBetween: 30,
        initialSlide: 2,
        watchSlidesProgress: true,
        watchOverflow: true,
      },
    },
  });

  // Gallery Slider - Mobile/tablet-only carousel (static grid on desktop)
  // Mobile/Tablet: Loop mode with grid layout inside slides
  // Desktop: Disabled, uses CSS Grid layout
  void new Swiper('[data-slider="gallery"]', {
    ...navigationConfig,
    navigation: {
      nextEl: '.gallery__button-next',
      prevEl: '.gallery__button-prev',
    },
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 5,
    loop: true,
    loopedSlides: 5,
    speed: 600,
    grabCursor: true,
    breakpoints: {
      1440: { enabled: false }, // Desktop: uses CSS Grid
    },
  });
};
