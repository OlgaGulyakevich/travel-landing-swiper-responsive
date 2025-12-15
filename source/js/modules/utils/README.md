# Utils - Utilities modules

Reusable helper functions for various parts of the application.

## Module structure

### 📐 constants.js
**Purpose:** Centralized constants for breakpoints, timing and other magic numbers

**Exports:**
- `BREAKPOINTS` - Responsive breakpoints (MOBILE: 320, TABLET: 768, DESKTOP: 1440)
- `TIMING` - Timing constants для анимаций и задержек (MESSAGE_DISPLAY: 5000, DEBOUNCE_RESIZE: 150, и т.д.)

**Used in:**
- `message-helpers.js` - check breakpoint for scroll
- `training-lines.js` - debounce for resize
- `tour-detail-booking.js` - delays for closing the modal

**Example:**
```javascript
import { BREAKPOINTS, TIMING } from './constants.js';

if (window.innerWidth < BREAKPOINTS.TABLET) {
  setTimeout(doSomething, TIMING.SCROLL_DELAY);
}
```

---

### ✉️ email-helpers.js
**Purpose:** Validation of email addresses with support for Punycode for .рф domains

**Exports:**
- `isValidEmail(email)` - Checks the correctness of the email (including .рф domains)

**Features:**
- Support for Internationalized Domain Names (IDN) through Punycode
- Full support for Cyrillic domains (.рф, .москва)
- Format validation through native `input[type="email"]`

**Used in:**
- `booking-form-validation.js` - validation of the email field in the booking form

**Example:**
```javascript
import { isValidEmail } from './email-helpers.js';

isValidEmail('user@example.com'); // true
isValidEmail('ivan@pochta.рф'); // true (Punycode: xn--80a1acny@xn--80a1acn.xn--p1ai)
```

---

### 📝 form-helpers.js
**Purpose:** Universal functions for working with forms

**Exports:**
- `clearForm(form)` - Resets the form and clears the validation state

**What does it do:**
- Calls `form.reset()` to clear the values
- Removes the `.is-invalid` class from invalid fields
- Removes the `.input--pattern` class from input mask fields

**Used in:**
- `form-submit.js` - clearing the contact form after successful submission
- `tour-detail-booking.js` - clearing the booking form after successful submission

**Example:**
```javascript
import { clearForm } from './form-helpers.js';

const form = document.querySelector('[data-form="contact"]');
clearForm(form); // The form is cleared, the validation is reset
```

---

### 🎭 input-mask-helper.js
**Purpose:** Creating pattern hints for input fields (phone, email)

**Exports:**
- `initInputMask(input, patternHint)` - Initializes the pattern hint for the input element

**How it works:**
- Pattern appears when input is focused (class `.input--pattern`, opacity: 0.5)
- Pattern disappears when input starts
- Pattern automatically restores if the input is cleared during focus
- Handles edge cases (Backspace, Delete, navigation keys)

**Используется в:**
- `input-masks.js` - masks for the contact and booking forms (phone, email)
- `booking-form-masks.js` - masks for the booking form (phone, email)

**Example:**
```javascript
import { initInputMask } from './input-mask-helper.js';

const phoneInput = document.querySelector('input[type="tel"]');
initInputMask(phoneInput, '+7 (000)-000-00-00');
```

---

### 💬 message-helpers.js
**Purpose:** Displaying success/error messages to the user

**Exports:**
- `showMessage(type, text, options)` - Displays a message with auto-closing

**Parameters:**
- `type` - 'success' or 'error'
- `text` - Message text
- `options` - { container, duration, scrollTarget, containerSelector }

**Features:** 
- Adaptive behavior (mobile: fixed at the bottom, desktop: above the form)
- ARIA attributes for accessibility (role="status"/"alert", aria-live)
- Auto-closing through the specified duration (default: 5000ms)
- Scroll to the form on mobile after success (optional)
- Support for existing and dynamic containers

**Used in:**
- `form-submit.js` - messages for the contact form
- `tour-detail-booking.js` - messages for the booking form

**Example:**
```javascript
import { showMessage } from './message-helpers.js';

// Contact form
const container = document.querySelector('[data-form-message]');
const form = document.querySelector('[data-form="contact"]');
showMessage('success', 'Спасибо! Мы свяжемся с вами.', {
  container,
  scrollTarget: form
});

// Booking form (dynamic container)
showMessage('error', 'Error sending.', {
  containerSelector: '[data-booking-message]'
});
```

---

### 🎨 slider-helpers.js
**Purpose:** Adding icons to the navigation buttons of Swiper sliders

**Exports:**
- `addNavigationIcons(swiper)` - Adds SVG icons to the prev/next buttons

**Used in:**
- `sliders.js` - all sliders with navigation (tours, training, reviews, advantages, gallery, tour-detail)

**Example:**
```javascript
// In the Swiper configuration
on: {
  init: function() {
    addNavigationIcons(this);
  }
}
```

---

### 📏 text-helpers.js
**Purpose:** Working with text (capitalization, truncation, formatting)

**Exports:**
- `capitalizeFirstLetter(str)` - Makes the first letter uppercase

**Used in:**
- `tours-catalog-render.js` - capitalization of the tour difficulty ('easy' → 'Easy')

**Example:**
```javascript
import { capitalizeFirstLetter } from './text-helpers.js';

capitalizeFirstLetter('easy'); // 'Easy'
```

---

### 🎯 ui-helpers.js
**Purpose:** Generating HTML elements for UI components

**Exports:**
- `generateStars(count)` - Generates SVG stars for rating display

**Parameters:**
- `count` - Number of filled stars (0-5)

**Returns:**
- HTML string with 5 star SVG elements (filled + outlined)

**Used in:**
- `tours-catalog-render.js` - displaying tour rating in catalog cards
- `tour-detail-ui.js` - displaying tour rating in detail modal

**Example:**
```javascript
import { generateStars } from './ui-helpers.js';

// Generate 4 filled stars + 1 outlined star
const starsHTML = generateStars(4);

// Usage in template literal
const html = `
  <div class="rating">
    ${generateStars(5)}
  </div>
`;
```

---

### ✅ validation-helpers.js
**Purpose:** Functions for form validation

**Exports:**
- `showValidationError(input, errorElement)` - Shows the validation error
- `hideValidationError(input, errorElement)` - Hides the validation error

**What does it do:**  
- Adds/removes the `.is-invalid` class on the input
- Shows/hides the error message (removes the `hidden` attribute)

**Used in:**
- `form-validation.js` - validation of the contact form
- `booking-form-validation.js` - validation of the booking form

**Пример:**
```javascript
import { showValidationError, hideValidationError } from './validation-helpers.js';

const input = document.querySelector('#phone');
const error = document.querySelector('#phone-error');

if (!input.validity.valid) {
  showValidationError(input, error);
} else {
  hideValidationError(input, error);
}
```

## Adding new utilities

When creating a new utility, follow the pattern:

```javascript
/**
 * @fileoverview Brief description of the module
 * @module utils/module-name
 * @author Olga Gulakevich
 * @version 1.0.0
 */

/**
 * Detailed description of the function
 * @param {Type} param - Description of the parameter
 * @returns {Type} Description of the returned value
 * @example
 * // Example usage
 * functionName(param);
 */
export const functionName = (param) => {
  // Implementation
};
```

**Criteria for creating a new utility:**
1. The function is used in 2+ places (DRY)
2. The logic is not specific to a single component
3. The function solves a clear task
4. The code will be easier to test in isolation
