/**
 * @fileoverview Swiper slider utility functions
 * @module utils/slider-helpers
 * @author Olga Gulakevich
 * @version 1.0.0
 */

/**
 * Adds SVG icons to Swiper navigation buttons
 *
 * Injects SVG sprite icons into prev/next navigation buttons. Used in Swiper's
 * on.init callback to ensure buttons have proper arrow icons.
 *
 * @param {Object} swiper - Swiper instance
 * @param {string} [prevIcon='arrow-left'] - Icon name for previous button (from sprite)
 * @param {string} [nextIcon='arrow-right'] - Icon name for next button (from sprite)
 *
 * @example
 * // Basic usage in Swiper config
 * new Swiper('[data-slider="tours"]', {
 *   modules: [Navigation],
 *   navigation: {
 *     nextEl: '.tours__button-next',
 *     prevEl: '.tours__button-prev',
 *   },
 *   on: {
 *     init: function() {
 *       addNavigationIcons(this);
 *     }
 *   }
 * });
 *
 * @example
 * // Custom icons
 * addNavigationIcons(swiper, 'chevron-left', 'chevron-right');
 */
export const addNavigationIcons = (swiper, prevIcon = 'arrow-left', nextIcon = 'arrow-right') => {
  const prevBtn = swiper.navigation.prevEl;
  const nextBtn = swiper.navigation.nextEl;

  if (prevBtn) {
    prevBtn.innerHTML = `
      <svg aria-hidden="true">
        <use href="/__spritemap#sprite-${prevIcon}"></use>
      </svg>
    `;
  }

  if (nextBtn) {
    nextBtn.innerHTML = `
      <svg aria-hidden="true">
        <use href="/__spritemap#sprite-${nextIcon}"></use>
      </svg>
    `;
  }
};
