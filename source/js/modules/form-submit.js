/**
 * Form AJAX Submission Module
 * Handles form submission without page reload
 * Shows success/error messages
 * Clears form after successful submission
 */

import { showMessage } from './utils/message-helpers.js';

/**
 * Clear form and reset validation state
 * @param {HTMLFormElement} form - Form element
 */
const clearForm = (form) => {
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

/**
 * Submit form via AJAX
 * @param {Event} e - Submit event
 * @param {HTMLFormElement} form - Form element
 * @param {HTMLElement} messageContainer - Message container
 */
const handleFormSubmit = async (e, form, messageContainer) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(form);
  const action = form.getAttribute('action');

  try {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;

    // Send AJAX request
    const response = await fetch(action, {
      method: 'POST',
      body: formData,
    });

    // Reset button
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;

    if (response.ok) {
      // Success
      showMessage('success', 'Спасибо! Мы свяжемся с вами в ближайшее время.', {
        container: messageContainer,
        scrollTarget: form
      });

      // Clear form after successful submission
      setTimeout(() => {
        clearForm(form);
      }, 500);
    } else {
      // Server error
      showMessage('error', 'Ошибка отправки. Пожалуйста, попробуйте позже.', {
        container: messageContainer
      });
    }
  } catch (error) {
    // Network error
    showMessage('error', 'Ошибка соединения. Проверьте интернет и попробуйте снова.', {
      container: messageContainer
    });

    // Reset button
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.textContent = 'Отправить';
    submitButton.disabled = false;
  }
};

/**
 * Initialize AJAX form submission
 */
export const initFormSubmit = () => {
  const form = document.querySelector('[data-form="contact"]');
  const messageContainer = document.querySelector('[data-form-message]');

  if (!form || !messageContainer) {
    return;
  }

  // Intercept form submission only if validation passes
  form.addEventListener('submit', (e) => {
    // Check if form is valid (browser validation + custom validation)
    const isValid = form.checkValidity();

    if (isValid) {
      // Form is valid - submit via AJAX
      handleFormSubmit(e, form, messageContainer);
    }
    // If invalid - let form-validation.js handle it (preventDefault happens there)
  });
};
