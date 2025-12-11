// =============================================================================
// SCROLL LOCK
// Centralized scroll lock management with counter to prevent conflicts
// =============================================================================

/**
 * @fileoverview Centralized scroll lock management module
 *
 * Provides a counter-based scroll lock system that prevents conflicts when
 * multiple components (modals, burger menu, etc.) need to lock page scroll.
 * Only removes scroll lock when all requesting components have released it.
 *
 * Features:
 * - Counter-based lock/unlock to handle multiple concurrent lock requests
 * - Automatic scrollbar width calculation and compensation via CSS variable
 * - Prevents layout shift when scroll is locked
 * - Used by modal.js and burger-menu.js
 *
 * @author Olga Gulakevic
 * @version 1.0.0
 */

let lockCount = 0;
let scrollbarWidth = 0;

/**
 * Locks page scroll by adding scroll-lock class to body
 *
 * Increments internal counter to allow multiple components to request lock
 * simultaneously. Only calculates scrollbar width and locks scroll on first
 * call (when counter is 0).
 *
 * @example
 * // Lock scroll when opening modal
 * lockScroll(); // lockCount becomes 1
 *
 * @example
 * // Multiple components can lock simultaneously
 * lockScroll(); // lockCount = 1 (burger menu)
 * lockScroll(); // lockCount = 2 (modal opened while burger is open)
 * unlockScroll(); // lockCount = 1 (modal closed, scroll still locked)
 * unlockScroll(); // lockCount = 0 (burger closed, scroll unlocked)
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
 * Unlocks page scroll by removing scroll-lock class from body
 *
 * Decrements internal counter and only removes scroll lock when counter
 * reaches zero (all components have released their lock request). This
 * prevents premature unlock when multiple components are using scroll lock.
 *
 * @example
 * // Unlock scroll when closing modal
 * unlockScroll(); // lockCount decrements
 *
 * @example
 * // Safe handling of multiple unlocks
 * lockScroll(); // lockCount = 1
 * lockScroll(); // lockCount = 2
 * unlockScroll(); // lockCount = 1 (still locked)
 * unlockScroll(); // lockCount = 0 (scroll unlocked)
 * unlockScroll(); // lockCount stays 0 (Math.max prevents negative)
 */
export const unlockScroll = () => {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.classList.remove('scroll-lock');
    document.documentElement.style.setProperty('--scrollbar-width', '0px');
  }
};
