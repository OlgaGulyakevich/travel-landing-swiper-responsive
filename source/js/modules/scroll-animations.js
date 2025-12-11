// =============================================================================
// SCROLL ANIMATIONS
// Scroll-triggered fade-in animations using Intersection Observer
// =============================================================================

/**
 * @fileoverview Scroll-triggered fade-in animations module
 *
 * Provides performant scroll-triggered animations using Intersection Observer API.
 * Elements with [data-animate] attribute fade in and slide up when they enter
 * the viewport, with a staggered delay for sequential elements.
 *
 * Features:
 * - Intersection Observer for performant scroll detection
 * - Staggered animations (100ms delay between elements)
 * - One-time animation (elements don't re-animate on scroll back up)
 * - Graceful degradation for browsers without Intersection Observer support
 * - Respects prefers-reduced-motion accessibility preference (via CSS)
 * - Triggers 100px before element enters viewport for natural feel
 *
 * CSS Animations:
 * - Initial state: opacity 0, translateY(30px)
 * - Final state: opacity 1, translateY(0)
 * - Easing: cubic-bezier(0.4, 0, 0.2, 1)
 * - Duration: 0.6s
 *
 * Usage:
 * Add data-animate attribute to any element in HTML:
 * <div data-animate>Content</div>
 *
 * Applied to:
 * - Tour cards in tours section
 * - Advantages cards
 * - Booking form in tour detail modal
 *
 * @author Olga Gulakevic
 * @version 1.0.0
 */

/**
 * Intersection Observer configuration options
 * @type {IntersectionObserverInit}
 */
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -100px 0px', // Trigger 20px before element enters viewport (reduced for bottom elements)
  threshold: 0.1,
};

/**
 * Intersection Observer callback that triggers animations when elements enter viewport
 *
 * Adds 'is-visible' class to trigger CSS animations with a staggered delay.
 * Each element in a group animates 100ms after the previous one for a
 * cascading effect. Elements are unobserved after animation to prevent
 * re-triggering on scroll up.
 *
 * @param {IntersectionObserverEntry[]} entries - Array of intersection entries
 * @param {IntersectionObserver} observer - The observer instance
 *
 * @example
 * // Observer triggers callback when elements enter viewport
 * const observer = new IntersectionObserver(animateOnScroll, observerOptions);
 * observer.observe(element);
 */
const animateOnScroll = (entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger animation with delay
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, index * 100); // 100ms delay between each element

      observer.unobserve(entry.target); // Only animate once
    }
  });
};

/**
 * Initializes scroll-triggered animations for all elements with [data-animate] attribute
 *
 * Finds all elements with data-animate attribute and sets up Intersection Observer
 * to watch them. Adds 'animate-on-scroll' class for initial hidden state (opacity: 0,
 * translateY: 30px). When elements enter viewport, 'is-visible' class is added to
 * trigger CSS animation to visible state.
 *
 * Falls back to immediate visibility for browsers without Intersection Observer support.
 *
 * @example
 * // Called in main.js on DOMContentLoaded
 * initScrollAnimations();
 *
 * @example
 * // HTML usage
 * <article class="card" data-animate>
 *   <h3>Card Title</h3>
 * </article>
 */
export const initScrollAnimations = () => {
  const elements = document.querySelectorAll('[data-animate]');

  if (!elements.length) return;

  // Check if Intersection Observer is supported
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    elements.forEach((el) => {
      el.classList.add('animate-on-scroll'); // Add initial hidden state
      observer.observe(el);
    });
  } else {
    // Fallback for old browsers - show immediately
    elements.forEach((el) => {
      el.classList.add('is-visible');
    });
  }
};
