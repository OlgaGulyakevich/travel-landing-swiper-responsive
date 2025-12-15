/**
 * @fileoverview Tour Detail Booking Module
 * Handles booking form submission for tour detail modal
 * @module tour-detail/tour-detail-booking
 * @author Olga Gulakevich
 * @version 1.0.0
 */

import { showMessage } from '../utils/message-helpers.js';
import { closeModal } from '../modal.js';
import { clearForm } from '../utils/form-helpers.js';

/**
 * Handle booking form submission
 *
 * Validates form data, sends AJAX request to server, and shows success/error message.
 * On success: displays success message, resets form after 500ms, closes modal after 1s.
 * On error: displays error message, keeps form data, re-enables submit button.
 *
 * @param {Event} event - Submit event from booking form
 *
 * @example
 * // Attach to booking form
 * const bookingForm = document.querySelector('[data-tour-booking-form]');
 * if (bookingForm) {
 *   bookingForm.addEventListener('submit', handleBookingSubmit);
 * }
 */
export const handleBookingSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Validate required fields
  const firstname = formData.get('firstname');
  const lastname = formData.get('lastname');
  const phone = formData.get('phone');
  const email = formData.get('email');
  const people = formData.get('people');
  const city = formData.get('city');
  const experience = formData.get('experience');

  if (!firstname || !lastname || !phone || !email || !people || !city || !experience) {
    return; // Validation module handles errors
  }

  try {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;

    const response = await fetch('https://echo.htmlacademy.ru', {
      method: 'POST',
      body: formData,
    });

    submitButton.textContent = originalText;
    submitButton.disabled = false;

    if (response.ok) {
      showMessage('success', 'Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.', {
        containerSelector: '[data-booking-message]'
      });
      setTimeout(() => {
        clearForm(form);
        // Hide error messages (not handled by clearForm for booking form)
        form.querySelectorAll('.tour-detail__form-error').forEach((error) => {
          error.setAttribute('hidden', '');
        });
      }, 500);
      setTimeout(() => closeModal('tour-detail'), 1000);
    } else {
      showMessage('error', 'Ошибка отправки. Пожалуйста, попробуйте позже.', {
        containerSelector: '[data-booking-message]'
      });
    }
  } catch (error) {
    showMessage('error', 'Ошибка соединения. Проверьте интернет и попробуйте снова.', {
      containerSelector: '[data-booking-message]'
    });
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.textContent = 'Отправить заявку';
    submitButton.disabled = false;
  }
};
