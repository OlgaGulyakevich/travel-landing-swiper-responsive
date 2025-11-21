/**
 * Sliders Module
 * Initialize all Swiper sliders with specific configurations
 */

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
    on: {
      init: function() {
        // Make pagination bullets keyboard accessible
        const bullets = this.pagination.bullets;
        if (bullets) {
          bullets.forEach((bullet) => {
            bullet.setAttribute('tabindex', '0');
            bullet.setAttribute('role', 'button');

            // Add keyboard navigation
            bullet.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                bullet.click();
              }
            });
          });
        }
      },
      paginationUpdate: function() {
        // Update tabindex when pagination updates
        const bullets = this.pagination.bullets;
        if (bullets) {
          bullets.forEach((bullet) => {
            if (!bullet.hasAttribute('tabindex')) {
              bullet.setAttribute('tabindex', '0');
              bullet.setAttribute('role', 'button');

              // Add keyboard navigation
              bullet.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  bullet.click();
                }
              });
            }
          });
        }
      }
    }
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
  const trainingSlider = new Swiper('[data-slider="training"]', {
    modules: [Navigation],
    navigation: {
      nextEl: '.training__button-next',
      prevEl: '.training__button-prev',
    },
    slidesPerView: 1,
    initialSlide: 2, // Mobile начинает с 3-го слайда (Надежда)
    spaceBetween: 30,
    breakpoints: {
      768: {
        slidesPerView: 3,
        initialSlide: 0, // Tablet и Desktop начинают с 1-го слайда (Александр)
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
  const reviewsSlider = new Swiper('[data-slider="reviews"]', {
    modules: [Navigation],
    navigation: {
      nextEl: '.reviews__button-next',
      prevEl: '.reviews__button-prev',
    },
    slidesPerView: 1,
    spaceBetween: 30,
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
