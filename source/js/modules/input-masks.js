/**
 * Input Masks Module
 * Shows pattern hints on focus for phone and email inputs
 * User can type freely, pattern is just a visual guide with opacity 0.5
 */

/**
 * Initialize input mask for a specific input
 * @param {HTMLInputElement} input - Input element
 * @param {string} patternHint - Pattern to show (e.g., '+7 (000)-000-00-00' or 'example@mail.ru')
 */
const initInputMask = (input, patternHint) => {
  if (!input) {
    return;
  }

  let isSettingPattern = false; // Flag to prevent input handler during pattern setup
  let isClearingPattern = false; // Flag to prevent recursion when clearing pattern

  /**
   * Handle focus - show pattern hint with special class
   */
  input.addEventListener('focus', () => {
    if (!input.value || input.value === '') {
      isSettingPattern = true;
      input.value = patternHint;
      input.classList.add('input--pattern');
      // Position cursor at start (only for inputs that support selection)
      try {
        input.setSelectionRange(0, 0);
      } catch (e) {
        // Email inputs don't support setSelectionRange, ignore error
      }
      isSettingPattern = false;
    }
  });

  /**
   * Handle input - remove pattern when user starts typing, restore if cleared
   */
  input.addEventListener('input', () => {
    // Skip if we're programmatically setting or clearing
    if (isSettingPattern || isClearingPattern) {
      return;
    }

    // If user cleared the input while focused, restore pattern
    if (input.value === '' && document.activeElement === input) {
      isSettingPattern = true;
      input.value = patternHint;
      input.classList.add('input--pattern');
      // Position cursor at start (only for inputs that support selection)
      try {
        input.setSelectionRange(0, 0);
      } catch (e) {
        // Email inputs don't support setSelectionRange, ignore error
      }
      isSettingPattern = false;
      return;
    }

    // Remove pattern class when user types
    if (input.classList.contains('input--pattern')) {
      isClearingPattern = true;
      input.classList.remove('input--pattern');
      // Clear pattern, let user type from scratch
      input.value = '';
      isClearingPattern = false;
    }
  });

  /**
   * Handle blur - clear pattern if no actual input
   */
  input.addEventListener('blur', () => {
    // If still showing pattern or empty, clear it
    if (input.value === patternHint || input.value === '') {
      input.value = '';
      input.classList.remove('input--pattern');
    }
  });

  /**
   * Handle keydown - clear pattern on first keypress
   */
  input.addEventListener('keydown', (e) => {
    // If showing pattern and user presses any printable key
    if (input.classList.contains('input--pattern')) {
      // Skip navigation keys
      const navigationKeys = ['Tab', 'Shift', 'Control', 'Alt', 'Meta', 'Escape', 'CapsLock'];
      if (navigationKeys.includes(e.key)) {
        return;
      }

      // For any other key (character, number, backspace, etc), clear the pattern
      if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') {
        input.classList.remove('input--pattern');
        input.value = '';
      }
    }
  });
};

/**
 * Initialize phone input mask
 */
export const initPhoneMask = () => {
  const phoneInput = document.querySelector('input[type="tel"]');
  const patternHint = '+7 (000)-000-00-00';

  initInputMask(phoneInput, patternHint);
};

/**
 * Initialize email input mask
 */
export const initEmailMask = () => {
  const emailInput = document.querySelector('input[type="email"]');
  const patternHint = 'example@mail.ru';

  initInputMask(emailInput, patternHint);
};

/**
 * Initialize all input masks
 */
export const initInputMasks = () => {
  initPhoneMask();
  initEmailMask();
};
