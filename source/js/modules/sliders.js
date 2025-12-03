/**
 * Sliders Module
 * Initialize all Swiper sliders with specific configurations
 */

import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { makePaginationKeyboardAccessible } from './pagination-keyboard.js';

export const initSliders = () => {
  // Hero Slider
  void new Swiper('[data-slider="hero"]', {
    modules: [Pagination, EffectFade],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true,
    autoplay: false,
    grabCursor: true,

    // Fade effect with adaptive speed
    effect: 'fade',
    speed: 400, 

    fadeEffect: {
      crossFade: false
    },

    breakpoints: {
      768: {
        speed: 600,
      },

      1440: {
        speed: 800,
      }
    },

    on: {
      init: function() {
        // Make pagination bullets keyboard accessible
        makePaginationKeyboardAccessible(this);
      },
      paginationUpdate: function() {
        // Update pagination when it changes
        makePaginationKeyboardAccessible(this);
      }
    }
  });

  // Tours Slider
  void new Swiper('[data-slider="tours"]', {
    modules: [Navigation],
    navigation: {
      nextEl: '.tours__button-next',
      prevEl: '.tours__button-prev',
    },
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    speed: 400,
    watchSlidesProgress: true,
    resistance: true,
    resistanceRatio: 0.85,
    breakpoints: {
      768: { slidesPerView: 2 },
      1440: { slidesPerView: 3 },
    },
    on: {
      init: function() {
        // Add SVG icons to navigation buttons
        const prevBtn = this.navigation.prevEl;
        const nextBtn = this.navigation.nextEl;

        if (prevBtn) {
          prevBtn.innerHTML = `
            <svg aria-hidden="true">
              <use href="/__spritemap#sprite-arrow-left"></use>
            </svg>
          `;
        }

        if (nextBtn) {
          nextBtn.innerHTML = `
            <svg aria-hidden="true">
              <use href="/__spritemap#sprite-arrow-right"></use>
            </svg>
          `;
        }
      }
    }
  });

  // Training Slider
  void new Swiper('[data-slider="training"]', {
    modules: [Navigation],
    navigation: {
      nextEl: '.training__button-next',
      prevEl: '.training__button-prev',
    },
    slidesPerView: 1,
    initialSlide: 2, // Mobile starts from 3rd slide (Nadezhda)
    spaceBetween: 20,
    watchSlidesProgress: true,
    speed: 400,
    resistance: true,
    resistanceRatio: 0.85,
    breakpoints: {
      768: {
        slidesPerView: 3,
        initialSlide: 0, // Tablet and Desktop start from 1st slide (Alexander)
      },
      1440: {
        slidesPerView: 4,
        initialSlide: 0,
      },
    },
    on: {
      init: function() {
        // Add SVG icons to navigation buttons
        const prevBtn = this.navigation.prevEl;
        const nextBtn = this.navigation.nextEl;

        if (prevBtn) {
          prevBtn.innerHTML = `
            <svg aria-hidden="true">
              <use href="/__spritemap#sprite-arrow-left"></use>
            </svg>
          `;
        }

        if (nextBtn) {
          nextBtn.innerHTML = `
            <svg aria-hidden="true">
              <use href="/__spritemap#sprite-arrow-right"></use>
            </svg>
          `;
        }
      }
    }
  });

  // Reviews Slider
  void new Swiper('[data-slider="reviews"]', {
    modules: [Navigation],
    navigation: {
      nextEl: '.reviews__button-next',
      prevEl: '.reviews__button-prev',
    },
    slidesPerView: 'auto',
    spaceBetween: 30,
    speed: 600,
    watchSlidesProgress: true,
    resistance: true,
    resistanceRatio: 0.85,
    breakpoints: {
      1440: {
        spaceBetween: 120,
      },
    },
    on: {
      init: function() {
        // Add SVG icons to navigation buttons
        const prevBtn = this.navigation.prevEl;
        const nextBtn = this.navigation.nextEl;

        if (prevBtn) {
          prevBtn.innerHTML = `
            <svg aria-hidden="true">
              <use href="/__spritemap#sprite-arrow-left"></use>
            </svg>
          `;
        }

        if (nextBtn) {
          nextBtn.innerHTML = `
            <svg aria-hidden="true">
              <use href="/__spritemap#sprite-arrow-right"></use>
            </svg>
          `;
        }
      }
    }
  });

  // Advantages Slider (desktop only)
  // Desktop: Shows cards with loop, slides by 2
  // Mobile/Tablet: Static flex grid (slider disabled)
  // HTML contains 10 slides: 5 original + 5 duplicates for smooth loop

  void new Swiper('[data-slider="advantages"]', {
    modules: [Navigation],
    enabled: false, // Disabled by default (enabled only on desktop via breakpoints)
    navigation: {
      nextEl: '.advantages__button-next',
      prevEl: '.advantages__button-prev',
    },
    breakpoints: {
      // Mobile/Tablet: slider disabled
      320: {
        enabled: false,
      },
      768: {
        enabled: false,
      },
      // Desktop: 10 slides with loop and slidesPerGroup: 2
      // Target: Show partial + 3 full + partial
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
    on: {
      init: function() {
        // Add SVG icons to navigation buttons
        const prevBtn = this.navigation.prevEl;
        const nextBtn = this.navigation.nextEl;

        if (prevBtn) {
          prevBtn.innerHTML = `
            <svg aria-hidden="true">
              <use href="/__spritemap#sprite-arrow-left"></use>
            </svg>
          `;
        }

        if (nextBtn) {
          nextBtn.innerHTML = `
            <svg aria-hidden="true">
              <use href="/__spritemap#sprite-arrow-right"></use>
            </svg>
          `;
        }
      }
    }
  });

  // Gallery Slider (mobile/tablet only, disabled on desktop)
  // Mobile/Tablet: Shows slides with grid layout inside
  // Desktop: Slider disabled, CSS Grid takes over
  void new Swiper('[data-slider="gallery"]', {
    modules: [Navigation],

    navigation: {
      nextEl: '.gallery__button-next',
      prevEl: '.gallery__button-prev',
    },

    // Mobile: 1 slide (grid with 2-3 photos inside)
    slidesPerView: 2,
    slidesPerGroup: 1,
    spaceBetween: 0,
    loop: true,
    speed: 600,
    grabCursor: true,
    watchSlidesProgress: true,

    breakpoints: {
      // Tablet: Same behavior (1 slide per view, grid shows 3 photos)
      768: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 0,
        loop: true,
      },

      // Desktop: Disabled (CSS Grid takes over)
      1440: {
        enabled: false,
      },
    },

    on: {
      init: function() {
        // Add SVG icons to navigation buttons
        const prevBtn = this.navigation.prevEl;
        const nextBtn = this.navigation.nextEl;

        if (prevBtn) {
          prevBtn.innerHTML = `
            <svg aria-hidden="true">
              <use href="/__spritemap#sprite-arrow-left"></use>
            </svg>
          `;
        }

        if (nextBtn) {
          nextBtn.innerHTML = `
            <svg aria-hidden="true">
              <use href="/__spritemap#sprite-arrow-right"></use>
            </svg>
          `;
        }
      }
    }
  });
};
