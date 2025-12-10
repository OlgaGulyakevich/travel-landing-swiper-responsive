// =============================================================================
// SCROLL ANIMATIONS
// Scroll-triggered fade-in animations using Intersection Observer
// =============================================================================

/**
 * Intersection Observer options
 */
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -100px 0px', // Trigger 20px before element enters viewport (reduced for bottom elements)
  threshold: 0.1,
};

/**
 * Callback for Intersection Observer
 * Adds stagger effect by delaying each element's animation
 * @param {IntersectionObserverEntry[]} entries - Array of observed entries
 * @param {IntersectionObserver} observer - The observer instance
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
 * Initialize scroll animations
 * Observes elements with [data-animate] attribute
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
