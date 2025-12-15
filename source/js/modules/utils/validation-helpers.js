/**
 * @fileoverview Form validation utility functions
 * @module utils/validation-helpers
 * @author Olga Gulakevich
 * @version 1.0.0
 */

/**
 * Validates a single input element and optionally displays error message
 *
 * Uses browser's native Constraint Validation API (validity.valid) to check
 * if input is valid. Always adds/removes .is-invalid class. Optionally shows/hides
 * error message if showErrorMessage option is true.
 *
 * Error message element must have id matching input's aria-describedby attribute.
 *
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} input - Input element to validate
 * @param {Object} [options={}] - Validation options
 * @param {boolean} [options.showErrorMessage=false] - Whether to show error message text
 *
 * @example
 * // Simple validation (only .is-invalid class)
 * const phoneInput = document.querySelector('#phone');
 * validateInput(phoneInput);
 *
 * @example
 * // Validation with error messages
 * const emailInput = document.querySelector('#booking-email');
 * validateInput(emailInput, { showErrorMessage: true });
 * // If invalid: adds .is-invalid class + shows error message
 * // If valid: removes .is-invalid class + hides error message
 */
export const validateInput = (input, options = {}) => {
  const { showErrorMessage = false } = options;

  if (!input.validity.valid) {
    input.classList.add('is-invalid');

    // Show error message if option enabled
    if (showErrorMessage) {
      const errorId = input.getAttribute('aria-describedby');
      if (errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
          errorElement.textContent = input.validationMessage;
          errorElement.removeAttribute('hidden');
        }
      }
    }
  } else {
    input.classList.remove('is-invalid');

    // Hide error message if option enabled
    if (showErrorMessage) {
      const errorId = input.getAttribute('aria-describedby');
      if (errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
          errorElement.textContent = '';
          errorElement.setAttribute('hidden', '');
        }
      }
    }
  }
};

/**
 * Validates all inputs in a form
 *
 * Iterates through inputs and validates each one using validateInput().
 * Used during form submission to check all fields before allowing submit.
 *
 * @param {HTMLFormElement} form - The form element to validate
 * @param {Object} [options={}] - Validation options
 * @param {boolean} [options.showErrorMessage=false] - Whether to show error messages
 * @param {boolean} [options.requiredOnly=true] - Whether to validate only required inputs
 * @param {NodeList|Array} [options.inputs] - Custom inputs to validate (overrides form.querySelectorAll)
 * @returns {boolean} True if all inputs are valid, false otherwise
 *
 * @example
 * // Validate all inputs (no error messages)
 * const form = document.querySelector('[data-form="contact"]');
 * const inputs = form.querySelectorAll('input');
 * const isValid = validateAllInputs(form, { inputs });
 *
 * @example
 * // Validate only required inputs with error messages
 * const bookingForm = document.querySelector('[data-tour-booking-form]');
 * const isValid = validateAllInputs(bookingForm, {
 *   showErrorMessage: true,
 *   requiredOnly: true
 * });
 */
export const validateAllInputs = (form, options = {}) => {
  const {
    showErrorMessage = false,
    requiredOnly = true,
    inputs: customInputs = null
  } = options;

  // Use custom inputs if provided, otherwise query form
  let inputs;
  if (customInputs) {
    inputs = customInputs;
  } else if (requiredOnly) {
    inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  } else {
    inputs = form.querySelectorAll('input, select, textarea');
  }

  let isValid = true;

  inputs.forEach((input) => {
    // For requiredOnly mode, only validate if input is actually invalid
    // For all inputs mode, validate everything
    if (!requiredOnly || !input.validity.valid) {
      validateInput(input, { showErrorMessage });
      if (!input.validity.valid) {
        isValid = false;
      }
    }
  });

  return isValid;
};
