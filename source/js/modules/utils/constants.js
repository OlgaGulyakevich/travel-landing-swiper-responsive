/**
 * @fileoverview Application Constants
 * Centralized constants for breakpoints, timing, and other magic numbers
 * @module utils/constants
 * @author Olga Gulakevich
 * @version 1.0.0
 */

/**
 * Responsive breakpoints (must match SCSS variables)
 * @constant {Object}
 */
export const BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1440
};

/**
 * Timing constants for animations and delays (in milliseconds)
 * @constant {Object}
 */
export const TIMING = {
  DEBOUNCE_RESIZE: 150, // Debounce delay for resize events
  MESSAGE_DISPLAY: 5000, // How long to show success/error messages
  MODAL_CLOSE_DELAY: 1000, // Delay before closing modal after success
  SCROLL_DELAY: 100, // Delay before scrolling to message
  FORM_CLEAR_DELAY: 500 // Delay before clearing form after success
};
