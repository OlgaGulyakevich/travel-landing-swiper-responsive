// =============================================================================
// BOOKING FORM INPUT MASKS
// Pattern hints for phone and email inputs in booking form
// =============================================================================

/**
 * @fileoverview Input masks module for booking form
 *
 * Provides visual pattern hints for phone and email inputs in the tour
 * booking form. Patterns appear on focus as semi-transparent placeholders
 * (opacity: 0.5 via .input--pattern class) to guide user input format.
 *
 * Features:
 * - Pattern hints shown on focus with .input--pattern class (opacity: 0.5)
 * - Hints disappear when user starts typing
 * - Automatic pattern restore if input is cleared while focused
 * - Clean removal on blur if no actual input provided
 * - Prevents recursion during programmatic value changes
 * - Handles edge cases (Backspace, Delete, navigation keys)
 *
 * Pattern Formats:
 * - Phone: '+7 (000)-000-00-00' (Russian mobile format)
 * - Email: 'example@mail.ru' (common Russian email pattern)
 *
 * Replicates functionality from input-masks.js for contact form.
 *
 * CSS Required:
 * .input--pattern { opacity: 0.5; } (defined in ui/input.scss)
 *
 * Used By:
 * - Tour detail modal booking form (#booking-phone, #booking-email)
 *
 * @author Olga Gulakevic
 * @version 1.0.0
 */

/**
 * Initializes input mask for a specific input element
 *
 * Sets up event listeners for focus, input, blur, and keydown to manage
 * pattern hint display. Uses flags to prevent recursion during programmatic
 * value changes.
 *
 * @param {HTMLInputElement} input - The input element to add mask to
 * @param {string} patternHint - The pattern string to display (e.g., '+7 (000)-000-00-00')
 *
 * @example
 * const phoneInput = document.querySelector('#booking-phone');
 * initInputMask(phoneInput, '+7 (000)-000-00-00');
 */
const initInputMask = (input, patternHint) => {
  if (!input) {
    return;
  }

  let isSettingPattern = false; // Flag to prevent input handler during pattern setup
  let isClearingPattern = false; // Flag to prevent recursion when clearing pattern

  /**
   * Handle focus - show pattern hint with special class
   */
  input.addEventListener('focus', () => {
    if (!input.value || input.value === '') {
      isSettingPattern = true;
      input.value = patternHint;
      input.classList.add('input--pattern');
      // Position cursor at start (only for inputs that support selection)
      try {
        input.setSelectionRange(0, 0);
      } catch (e) {
        // Email inputs don't support setSelectionRange, ignore error
      }
      isSettingPattern = false;
    }
  });

  /**
   * Handle input - remove pattern when user starts typing, restore if cleared
   */
  input.addEventListener('input', () => {
    // Skip if we're programmatically setting or clearing
    if (isSettingPattern || isClearingPattern) {
      return;
    }

    // If user cleared the input while focused, restore pattern
    if (input.value === '' && document.activeElement === input) {
      isSettingPattern = true;
      input.value = patternHint;
      input.classList.add('input--pattern');
      // Position cursor at start (only for inputs that support selection)
      try {
        input.setSelectionRange(0, 0);
      } catch (e) {
        // Email inputs don't support setSelectionRange, ignore error
      }
      isSettingPattern = false;
      return;
    }

    // Remove pattern class when user types
    if (input.classList.contains('input--pattern')) {
      isClearingPattern = true;
      input.classList.remove('input--pattern');
      // Clear pattern, let user type from scratch
      input.value = '';
      isClearingPattern = false;
    }
  });

  /**
   * Handle blur - clear pattern if no actual input
   */
  input.addEventListener('blur', () => {
    // If still showing pattern or empty, clear it
    if (input.value === patternHint || input.value === '') {
      input.value = '';
      input.classList.remove('input--pattern');
    }
  });

  /**
   * Handle keydown - clear pattern on first keypress
   */
  input.addEventListener('keydown', (e) => {
    // If showing pattern and user presses any printable key
    if (input.classList.contains('input--pattern')) {
      // Skip navigation keys
      const navigationKeys = ['Tab', 'Shift', 'Control', 'Alt', 'Meta', 'Escape', 'CapsLock'];
      if (navigationKeys.includes(e.key)) {
        return;
      }

      // For any other key (character, number, backspace, etc), clear the pattern
      if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') {
        input.classList.remove('input--pattern');
        input.value = '';
      }
    }
  });
};

/**
 * Initializes phone input mask for booking form
 *
 * Finds #booking-phone input and applies pattern hint '+7 (000)-000-00-00'.
 * Pattern appears on focus to guide users in entering Russian mobile numbers.
 *
 * @example
 * // Called in main.js via initBookingFormMasks()
 * initBookingPhoneMask();
 */
export const initBookingPhoneMask = () => {
  const phoneInput = document.querySelector('#booking-phone');
  const patternHint = '+7 (000)-000-00-00';

  initInputMask(phoneInput, patternHint);
};

/**
 * Initializes email input mask for booking form
 *
 * Finds #booking-email input and applies pattern hint 'example@mail.ru'.
 * Pattern appears on focus to guide users in entering email addresses.
 *
 * @example
 * // Called in main.js via initBookingFormMasks()
 * initBookingEmailMask();
 */
export const initBookingEmailMask = () => {
  const emailInput = document.querySelector('#booking-email');
  const patternHint = 'example@mail.ru';

  initInputMask(emailInput, patternHint);
};

/**
 * Initializes all input masks for booking form (main export)
 *
 * Convenience function that initializes both phone and email masks
 * for the tour booking form. Called once on DOMContentLoaded in main.js.
 *
 * Initializes:
 * - Phone input (#booking-phone) with pattern '+7 (000)-000-00-00'
 * - Email input (#booking-email) with pattern 'example@mail.ru'
 *
 * @example
 * // In main.js
 * import { initBookingFormMasks } from './modules/booking-form-masks.js';
 *
 * document.addEventListener('DOMContentLoaded', () => {
 *   initBookingFormMasks();
 * });
 */
export const initBookingFormMasks = () => {
  initBookingPhoneMask();
  initBookingEmailMask();
};
