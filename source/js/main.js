// =============================================================================
// MAIN JS
// Lifetour Landing
// =============================================================================

import { initBurgerMenu } from './modules/burger-menu.js';
import { initSliders } from './modules/sliders.js';
import { initFormValidation } from './modules/form-validation.js';
import { initInputMasks } from './modules/input-masks.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initTrainingLines } from './modules/training-lines.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize burger menu
  initBurgerMenu();

  // Initialize all sliders (Swiper)
  initSliders();

  // Initialize form validation
  initFormValidation();

  // Initialize input masks (phone and email)
  initInputMasks();

  // Initialize smooth scroll for anchor links
  initSmoothScroll();

  // Initialize training process decorative lines
  initTrainingLines();
});
