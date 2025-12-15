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

import { fixDoublePunycodeEncoding } from './utils/email-helpers.js';
import { validateInput, validateAllInputs } from './utils/validation-helpers.js';

export const initFormValidation = () => {
  const form = document.querySelector('[data-form="contact"]');

  if (!form) {
    return;
  }

  const inputs = form.querySelectorAll('input');
  let hasSubmitted = false; // Track if form was submitted at least once

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
    const isValid = validateAllInputs(form, { inputs, requiredOnly: false });

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
