// =============================================================================
// MAIN JS
// Lifetour Landing
// =============================================================================

import { initBurgerMenu } from './modules/burger-menu.js';
import { initSliders } from './modules/sliders.js';
import { initFormValidation } from './modules/form-validation.js';
import { initFormSubmit } from './modules/form-submit.js';
import { initInputMasks } from './modules/input-masks.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initTrainingLines } from './modules/training-lines.js';
import { initModal } from './modules/modal.js';
import { initToursCatalog } from './modules/tours-catalog.js';
import { initTourDetail } from './modules/tour-detail.js';
import { initScrollAnimations } from './modules/scroll-animations.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize burger menu
  initBurgerMenu();

  // Initialize all sliders (Swiper)
  initSliders();

  // Initialize form validation
  initFormValidation();

  // Initialize form AJAX submission
  initFormSubmit();

  // Initialize input masks (phone and email)
  initInputMasks();

  // Initialize smooth scroll for anchor links
  initSmoothScroll();

  // Initialize training process decorative lines
  initTrainingLines();

  // Initialize modal functionality
  initModal();

  // Initialize tours catalog modal
  initToursCatalog();

  // Initialize tour detail modal
  initTourDetail();

  // Initialize scroll-triggered animations
  initScrollAnimations();
});
