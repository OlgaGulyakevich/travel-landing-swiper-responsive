// =============================================================================
// SCROLL LOCK
// Centralized scroll lock management with counter to prevent conflicts
// =============================================================================

let lockCount = 0;
let scrollbarWidth = 0;

/**
 * Lock scroll on body
 * Increments counter to allow multiple components to request lock
 */
export const lockScroll = () => {
  if (lockCount === 0) {
    // Calculate scrollbar width
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.remove();

    // Set CSS variable and add scroll-lock class
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    document.body.classList.add('scroll-lock');
  }
  lockCount++;
};

/**
 * Unlock scroll on body
 * Decrements counter and only removes lock when count reaches zero
 */
export const unlockScroll = () => {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.classList.remove('scroll-lock');
    document.documentElement.style.setProperty('--scrollbar-width', '0px');
  }
};
