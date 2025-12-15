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
 * @author Olga Gulakevich
 * @version 1.0.0
 */

import { initInputMask } from './utils/input-mask-helper.js';

/**
 * Initializes phone input mask for booking form
 *
 * Finds #booking-phone input and applies pattern hint '+7 (000)-000-00-00'.
 * Pattern appears on focus to guide users in entering Russian mobile numbers.
 *
 * Private function, not exported.
 *
 * @example
 * // Called internally via initBookingFormMasks()
 * initBookingPhoneMask();
 */
const initBookingPhoneMask = () => {
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
 * Private function, not exported.
 *
 * @example
 * // Called internally via initBookingFormMasks()
 * initBookingEmailMask();
 */
const initBookingEmailMask = () => {
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
