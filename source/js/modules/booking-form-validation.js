/**
 * Booking Form Validation Module
 * Native browser validation with custom .is-invalid class and error messages
 *
 * Requirements:
 * - Show errors ONLY after submit attempt
 * - Add .is-invalid to individual invalid inputs
 * - Display error messages in aria-describedby elements
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

/**
 * Validate single input and show/hide error message
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} input - Input to validate
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
 * Validate all form inputs
 * @param {HTMLFormElement} form - Form element
 * @returns {boolean} - True if all inputs are valid
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
