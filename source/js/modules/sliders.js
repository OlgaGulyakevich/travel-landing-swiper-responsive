/**
 * Sliders Module
 * Initialize all Swiper sliders with specific configurations
 */

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export const initSliders = () => {
  // Hero Slider
  const heroSlider = new Swiper('[data-slider="hero"]', {
    modules: [Pagination],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true,
    autoplay: false,
  });

  // Tours Slider
  const toursSlider = new Swiper('[data-slider="tours"]', {
    modules: [Navigation],
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    breakpoints: {
      768: { slidesPerView: 2 },
      1440: { slidesPerView: 3 },
    },
  });

  // Training Slider
  const trainingSlider = new Swiper('[data-slider="training"]', {
    modules: [Navigation],
    navigation: {
      nextEl: '.training__button-next',
      prevEl: '.training__button-prev',
    },
    slidesPerView: 1,
    breakpoints: {
      768: { slidesPerView: 3 },
      1440: { slidesPerView: 4 },
    },
  });

  // Reviews Slider
  const reviewsSlider = new Swiper('[data-slider="reviews"]', {
    modules: [Navigation],
    navigation: {
      nextEl: '.reviews__button-next',
      prevEl: '.reviews__button-prev',
    },
    slidesPerView: 1,
    spaceBetween: 30,
  });

  // Advantages Slider (desktop only)
  const advSlider = new Swiper('[data-slider="advantages"]', {
    modules: [Navigation],
    navigation: {
      nextEl: '.advantages__button-next',
      prevEl: '.advantages__button-prev',
    },
    slidesPerView: 'auto',
    slidesPerGroup: 2,
    loop: true,
    breakpoints: {
      1440: { enabled: true },
      320: { enabled: false },
    },
  });

  // Gallery Slider (mobile/tablet only)
  const gallerySlider = new Swiper('[data-slider="gallery"]', {
    modules: [Navigation],
    navigation: {
      nextEl: '.gallery__button-next',
      prevEl: '.gallery__button-prev',
    },
    slidesPerView: 2,
    loop: true,
    breakpoints: {
      768: { slidesPerView: 3 },
      1440: { enabled: false },
    },
  });
};
