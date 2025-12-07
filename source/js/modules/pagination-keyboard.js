/**
 * Pagination Keyboard Navigation Module
 * Makes Swiper pagination bullets accessible via keyboard (Tab, Enter, Space)
 */

/**
 * Add keyboard accessibility to pagination bullets
 * @param {Object} swiper - Swiper instance
 */
export const makePaginationKeyboardAccessible = (swiper) => {
  if (!swiper.pagination || !swiper.pagination.bullets) {
    return;
  }

  const bullets = swiper.pagination.bullets;

  bullets.forEach((bullet) => {
    // Skip if already processed
    if (bullet.hasAttribute('data-keyboard-accessible')) {
      return;
    }

    // Mark as processed
    bullet.setAttribute('data-keyboard-accessible', 'true');

    // Make keyboard accessible
    bullet.setAttribute('tabindex', '0');
    bullet.setAttribute('role', 'button');

    // Add keyboard navigation handler
    bullet.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        bullet.click();
      }
    });
  });
};
