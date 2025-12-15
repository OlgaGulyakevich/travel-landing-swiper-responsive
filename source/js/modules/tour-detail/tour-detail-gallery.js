/**
 * @fileoverview Tour Detail Gallery Module
 * Handles Swiper gallery initialization and management for tour detail modal
 * @module tour-detail/tour-detail-gallery
 * @author Olga Gulakevich
 * @version 1.0.0
 */

import Swiper from 'swiper';
import { Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';
import { addNavigationIcons } from '../utils/slider-helpers.js';

/**
 * Swiper instance for tour detail gallery
 * @type {Swiper|null}
 */
let tourDetailSwiper = null;

/**
 * Initialize Swiper gallery for tour detail modal
 *
 * Creates responsive image gallery with fade effect and navigation.
 * Destroys existing Swiper instance before creating new one.
 * Shows gallery with smooth fade-in after initialization.
 *
 * @param {Array<string>} images - Array of image paths (e.g., ['img/tour-1@1x.jpg', ...])
 *
 * @example
 * // Initialize gallery with tour images
 * const images = [
 *   'img/tours/elbrus-1@1x.jpg',
 *   'img/tours/elbrus-2@1x.jpg',
 *   'img/tours/elbrus-3@1x.jpg'
 * ];
 * initGallery(images);
 */
export const initGallery = (images) => {
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
    effect: 'fade',
    speed: 400,
    fadeEffect: {
      crossFade: false
    },
    grabCursor: true,
    on: {
      init: function() {
        addNavigationIcons(this);
      }
    }
  });

  // Show gallery with smooth fade-in after modal is rendered
  // Delay allows modal to open before starting gallery fade animation
  setTimeout(() => {
    swiperContainer.classList.remove('is-loading');
  }, 100);
};

/**
 * Destroy tour detail Swiper instance
 *
 * Cleans up Swiper instance when modal is closed or content is cleared.
 * Safe to call even if Swiper is not initialized.
 *
 * @example
 * // Destroy gallery when clearing modal
 * destroyGallery();
 */
export const destroyGallery = () => {
  if (tourDetailSwiper) {
    tourDetailSwiper.destroy(true, true);
    tourDetailSwiper = null;
  }
};
