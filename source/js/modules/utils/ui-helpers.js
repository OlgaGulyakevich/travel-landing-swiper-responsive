/**
 * @fileoverview UI utility functions for generating HTML elements
 * @module utils/ui-helpers
 * @author Olga Gulakevich
 * @version 1.0.0
 */

/**
 * Generate stars HTML for rating display
 *
 * Creates a string of SVG star icons (filled and outlined) based on the count.
 * Stars use sprite icons: 'star-fill' for filled stars and 'star-stroke' for empty stars.
 *
 * @param {number} count - Number of filled stars (0-5)
 * @returns {string} HTML string with star SVG elements
 *
 * @example
 * generateStars(3)
 * // Returns: HTML with 3 filled stars and 2 outlined stars
 *
 * @example
 * generateStars(5)
 * // Returns: HTML with 5 filled stars
 *
 * @example
 * // Usage in template literal
 * const html = `
 *   <div class="rating">
 *     ${generateStars(4)}
 *   </div>
 * `;
 */
export const generateStars = (count) => {
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
