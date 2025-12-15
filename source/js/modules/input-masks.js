/**
 * Input Masks Module
 * Shows pattern hints on focus for phone and email inputs
 * User can type freely, pattern is just a visual guide with opacity 0.5
 */

import { initInputMask } from './utils/input-mask-helper.js';

/**
 * Initialize phone input mask
 * Private function, not exported
 */
const initPhoneMask = () => {
  const phoneInput = document.querySelector('input[type="tel"]');
  const patternHint = '+7 (000)-000-00-00';

  initInputMask(phoneInput, patternHint);
};

/**
 * Initialize email input mask
 * Private function, not exported
 */
const initEmailMask = () => {
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
