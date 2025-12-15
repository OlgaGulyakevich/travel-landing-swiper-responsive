/**
 * @fileoverview Form utility functions
 * @module utils/form-helpers
 * @author Olga Gulakevich
 * @version 1.0.0
 */

/**
 * Clear form and reset validation state
 *
 * Performs complete form cleanup:
 * - Resets all input values via form.reset()
 * - Removes validation error classes (.is-invalid)
 * - Removes input pattern hint classes (.input--pattern)
 *
 * Use after successful form submission or when programmatically resetting form.
 *
 * @param {HTMLFormElement} form - Form element to clear
 *
 * @example
 * // Clear contact form after successful submission
 * const form = document.querySelector('[data-form="contact"]');
 * clearForm(form);
 *
 * @example
 * // Clear booking form in modal
 * const bookingForm = document.querySelector('[data-tour-booking-form]');
 * clearForm(bookingForm);
 */
export const clearForm = (form) => {
  if (!form) {
    return;
  }

  // Clear all inputs
  form.reset();

  // Remove all .is-invalid classes
  const invalidInputs = form.querySelectorAll('.is-invalid');
  invalidInputs.forEach((input) => {
    input.classList.remove('is-invalid');
  });

  // Remove all pattern classes
  const patternInputs = form.querySelectorAll('.input--pattern');
  patternInputs.forEach((input) => {
    input.classList.remove('input--pattern');
  });
};
