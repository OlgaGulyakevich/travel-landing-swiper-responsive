// =============================================================================
// BOOKING FORM VALIDATION
// Native browser validation with custom error display
// =============================================================================

/**
 * @fileoverview Validation module for booking form
 *
 * Provides comprehensive form validation using native browser Constraint
 * Validation API with custom error display styling. Follows HTML Academy
 * standards for deferred error display (no errors until first submit).
 *
 * Features:
 * - Native Constraint Validation API (validity.valid, validationMessage)
 * - Deferred error display (errors shown ONLY after first submit attempt)
 * - Real-time validation after first submit (input and blur events)
 * - Custom .is-invalid class for styling invalid inputs
 * - ARIA-compliant error messages via aria-describedby
 * - Auto-focus first invalid field for accessibility
 * - Clears input mask patterns before validation
 * - Fixes double Punycode encoding bug for .рф domains
 *
 * Validation Rules (HTML attributes):
 * - required: Field must be filled
 * - type="email": Valid email format
 * - type="tel" pattern="[0-9\s\-\+\(\)]+": Phone with allowed characters
 * - minlength="11": Minimum length (phone)
 * - min="1" max="50": Number range (people count)
 *
 * Supported Fields:
 * - #booking-firstname (text, required)
 * - #booking-lastname (text, required)
 * - #booking-phone (tel, required, pattern, minlength)
 * - #booking-email (email, required)
 * - #booking-people (number, required, min, max)
 * - #booking-city (text, required)
 * - #booking-experience (select, required)
 * - #booking-date (text, readonly, auto-filled)
 * - #booking-comments (textarea, optional)
 *
 * Replicates functionality from form-validation.js for contact form.
 *
 * CSS Required:
 * - .is-invalid (defined in utility.scss)
 * - .tour-detail__form-error (defined in tour-detail.scss)
 *
 * @author Olga Gulakevic
 * @version 1.0.0
 */

/**
 * Fixes double Punycode encoding bug for .рф (Russian) domains
 *
 * Browser bug: When user types email@domain.рф, some browsers encode it
 * incorrectly as email@domain.xn--p1ai.xn--p1ai (double encoding).
 * This function detects and fixes this specific bug.
 *
 * @param {string} email - Email address that may contain double-encoded Punycode
 * @returns {string} Email with corrected single Punycode encoding
 *
 * @example
 * fixDoublePunycodeEncoding('test@mail.xn--p1ai.xn--p1ai')
 * // Returns: 'test@mail.xn--p1ai'
 *
 * @example
 * fixDoublePunycodeEncoding('test@gmail.com')
 * // Returns: 'test@gmail.com' (unchanged)
 */
const fixDoublePunycodeEncoding = (email) => {
  if (!email) {
    return email;
  }

  // Fix only the specific bug: double .xn--p1ai encoding
  return email.replace(/\.xn--p1ai\.xn--p1ai$/i, '.xn--p1ai');
};

/**
 * Validates a single input and displays/hides error message
 *
 * Uses browser's native Constraint Validation API (validity.valid) to check
 * if input is valid. Adds .is-invalid class and shows error message if invalid,
 * or removes class and hides error if valid.
 *
 * Error message element must have id matching input's aria-describedby attribute.
 *
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} input - Input element to validate
 *
 * @example
 * const emailInput = document.querySelector('#booking-email');
 * validateInput(emailInput);
 * // If invalid: adds .is-invalid class, shows error message
 * // If valid: removes .is-invalid class, hides error message
 */
const validateInput = (input) => {
  const errorId = input.getAttribute('aria-describedby');

  if (!input.validity.valid) {
    input.classList.add('is-invalid');

    // Show error message if error element exists
    if (errorId) {
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.textContent = input.validationMessage;
        errorElement.removeAttribute('hidden');
      }
    }
  } else {
    input.classList.remove('is-invalid');

    // Hide error message
    if (errorId) {
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.textContent = '';
        errorElement.setAttribute('hidden', '');
      }
    }
  }
};

/**
 * Validates all required inputs in form
 *
 * Iterates through all required inputs, selects, and textareas in the form
 * and validates each one using validateInput(). Used during form submission
 * to check all fields before allowing submit.
 *
 * @param {HTMLFormElement} form - The form element to validate
 * @returns {boolean} True if all required inputs are valid, false otherwise
 *
 * @example
 * const form = document.querySelector('[data-tour-booking-form]');
 * const isValid = validateAllInputs(form);
 * if (!isValid) {
 *   e.preventDefault(); // Prevent form submission
 * }
 */
const validateAllInputs = (form) => {
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.validity.valid) {
      validateInput(input);
      isValid = false;
    }
  });

  return isValid;
};

/**
 * Initializes validation for booking form (main export)
 *
 * Sets up comprehensive form validation with deferred error display following
 * HTML Academy standards. Errors are shown ONLY after first submit attempt,
 * then real-time validation activates on input and blur events.
 *
 * Event Handlers:
 * - submit: Validates all fields, prevents submission if invalid, focuses first error
 * - invalid: Prevents default browser validation bubble, shows custom error
 * - input: Real-time validation after first submit, fixes Punycode encoding
 * - blur: Real-time validation after first submit
 *
 * Special Handling:
 * - Clears input mask patterns (.input--pattern) before validation
 * - Fixes double Punycode encoding for .рф domains
 * - Auto-focuses first invalid field for accessibility
 * - Uses hasSubmitted flag to enable real-time validation after first submit
 *
 * @example
 * // In main.js
 * import { initBookingFormValidation } from './modules/booking-form-validation.js';
 *
 * document.addEventListener('DOMContentLoaded', () => {
 *   initBookingFormValidation();
 * });
 *
 * @example
 * // HTML structure required
 * <input type="email" id="booking-email" name="email"
 *        aria-describedby="booking-email-error" required>
 * <span id="booking-email-error" class="tour-detail__form-error"
 *       role="alert" hidden></span>
 */
export const initBookingFormValidation = () => {
  const form = document.querySelector('[data-tour-booking-form]');

  if (!form) {
    return;
  }

  const inputs = form.querySelectorAll('input, select, textarea');
  let hasSubmitted = false; // Track if form was submitted at least once

  // Handle invalid event on each input (fired by browser validation)
  inputs.forEach((input) => {
    input.addEventListener('invalid', (e) => {
      // Prevent default browser validation message bubble
      e.preventDefault();

      // Clear pattern if present
      if (input.classList.contains('input--pattern')) {
        input.value = '';
        input.classList.remove('input--pattern');
      }

      // Mark that submit was attempted
      hasSubmitted = true;

      // Show error
      validateInput(input);
    });
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    // Clear pattern hints before validation
    inputs.forEach((input) => {
      if (input.classList.contains('input--pattern')) {
        input.value = '';
        input.classList.remove('input--pattern');
      }
    });

    // Fix double Punycode encoding bug before submission
    const emailInput = form.querySelector('#booking-email');
    if (emailInput && emailInput.value) {
      emailInput.value = fixDoublePunycodeEncoding(emailInput.value);
    }

    // Mark that submit was attempted
    hasSubmitted = true;

    // Validate all inputs and show errors
    const isValid = validateAllInputs(form);

    if (!isValid) {
      e.preventDefault();

      // Focus first invalid field for accessibility
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });

  // Real-time validation (only after first submit attempt)
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      // Fix double Punycode encoding in email field on input
      if (input.type === 'email' && input.value) {
        input.value = fixDoublePunycodeEncoding(input.value);
      }

      // Only validate if form was submitted at least once
      if (hasSubmitted) {
        validateInput(input);
      }
    });

    // Also validate on blur (only after first submit)
    input.addEventListener('blur', () => {
      if (hasSubmitted) {
        validateInput(input);
      }
    });
  });
};
