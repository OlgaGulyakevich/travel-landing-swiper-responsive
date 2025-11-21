/**
 * Form Validation Module
 * Native browser validation with custom styling
 */

export const initFormValidation = () => {
  const form = document.querySelector('[data-form]');

  if (!form) {
    return;
  }

  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();

      // Add invalid class to form for styling
      form.classList.add('is-invalid');

      // Focus first invalid field
      const firstInvalid = form.querySelector(':invalid');
      firstInvalid?.focus();
    }
  });

  // Remove invalid class on input
  const inputs = form.querySelectorAll('input');
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (input.validity.valid) {
        input.classList.remove('is-invalid');
      }
    });
  });
};

// 2. По валидации - добавлен класс .is-invalid:

// Что сделано:
// - ✅ Добавлен .is-invalid в utility.scss:71-73
// - ✅ Очищен input.scss от закомментированных вариантов
// - ✅ Использован !important чтобы перебить все состояния

// Как использовать в JS:
// // При валидации формы
// const input = document.querySelector('.input');
// if (!input.validity.valid) {
//   input.classList.add('is-invalid');
// } else {
//   input.classList.remove('is-invalid');
// }
