/**
 * Form Validation Module
 * Native browser validation with custom .is-invalid class
 *
 * Requirements:
 * - Show errors ONLY after submit attempt
 * - Add .is-invalid to individual invalid inputs
 * - After first submit: validate in real-time
 * - Phone field: only numbers, spaces, dashes, parentheses, +
 * - Email field: standard email + .рф local domain support
 */

/**
 * Fix double Punycode encoding bug for .рф domains
 * Browser bug: .рф → xn--p1ai.xn--p1ai (double encoding)
 * This function fixes: xn--p1ai.xn--p1ai → xn--p1ai
 * @param {string} email - Email address (may contain double-encoded Punycode)
 * @returns {string} - Email with fixed single Punycode encoding
 */
const fixDoublePunycodeEncoding = (email) => {
  if (!email) {
    return email;
  }

  // Fix only the specific bug: double .xn--p1ai encoding
  return email.replace(/\.xn--p1ai\.xn--p1ai$/i, '.xn--p1ai');
};

export const initFormValidation = () => {
  const form = document.querySelector('[data-form="contact"]');

  if (!form) {
    return;
  }

  const inputs = form.querySelectorAll('input');
  let hasSubmitted = false; // Track if form was submitted at least once

  /**
   * Validate single input and toggle .is-invalid class
   * @param {HTMLInputElement} input - Input to validate
   */
  const validateInput = (input) => {
    if (!input.validity.valid) {
      input.classList.add('is-invalid');
    } else {
      input.classList.remove('is-invalid');
    }
  };

  /**
   * Validate all form inputs
   * @returns {boolean} - True if all inputs are valid
   */
  const validateAllInputs = () => {
    let isValid = true;

    inputs.forEach((input) => {
      validateInput(input);
      if (!input.validity.valid) {
        isValid = false;
      }
    });

    return isValid;
  };

  // Handle invalid event on each input (fired by browser validation)
  inputs.forEach((input) => {
    input.addEventListener('invalid', () => {
      // Clear pattern if present
      if (input.classList.contains('input--pattern')) {
        input.value = '';
        input.classList.remove('input--pattern');
      }

      // Mark that submit was attempted
      hasSubmitted = true;

      // Add red border
      input.classList.add('is-invalid');
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
    const emailInputSubmit = form.querySelector('input[type="email"]');
    if (emailInputSubmit && emailInputSubmit.value) {
      emailInputSubmit.value = fixDoublePunycodeEncoding(emailInputSubmit.value);
    }

    // Mark that submit was attempted
    hasSubmitted = true;

    // Validate all inputs and show errors
    const isValid = validateAllInputs();

    if (!isValid) {
      e.preventDefault();

      // Focus first invalid field for accessibility
      const firstInvalid = form.querySelector('.is-invalid');
      firstInvalid?.focus();
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
