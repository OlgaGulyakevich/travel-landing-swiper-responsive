# Tour Detail - Module for detailed information about the tour

A modal window with detailed information about the tour, gallery of images and a booking form.

## Module architecture

The module is split into **3 specialized submodules** + **1 coordinator**:

```
tour-detail.js (coordinator, facade pattern)
├── tour-detail-ui.js       (UI management, content filling)
├── tour-detail-gallery.js  (gallery, Swiper slider)
└── tour-detail-booking.js  (booking form processing)
```

---

## Modules

### 🎯 tour-detail.js (Coordinator)
**Role:** Facade pattern - single entry point, delegates tasks to specialized modules

**Exports:**  
- `initTourDetail()` - Initializes the tour-detail module

**What it does:**
1. Finds all tour cards on the page
2. Attaches event handlers to the "Подробнее" buttons
3. When clicked:
   - Extracts tour data from data-attributes of the card
   - Calls `populateTourDetail()` to fill the UI
   - Calls `initTourGallery()` to initialize the gallery
   - Opens the modal window through `openModal('tour-detail')`

**Used in:**
- `main.js` - initialization on DOMContentLoaded

**Example:**
```javascript
import { initTourDetail } from './modules/tour-detail.js';

document.addEventListener('DOMContentLoaded', () => {
  initTourDetail();
});
```

---

### 🖼️ tour-detail-ui.js
**Role:** Management of UI elements, filling the content of the tour

**Экспорты:**
- `populateTourDetail(tourData)` - Fills the modal window with the tour data

**What it does:**
1. **Fills the tour metadata:**
   - Title, location, duration
   - Difficulty (easy/medium/hard)
   - Group (number of people)

2. **Generates content areas** (cascade styling):
   - Tour description (`<p>` in `.tour-detail__content`)
   - List of included (`<ul><li>` in `.tour-detail__content--list`)
   - Tour program (`<article>` with `<h4>`, `<strong>`, `<p>` in `.tour-detail__content--program`)

3. **Applies fade-in animations:**
   - Adds `data-animate` attribute to the form sections
   - Intersection Observer starts the animation when appearing in the viewport

**Структура tourData:**
```javascript
{
  title: "Название тура",
  location: "Локация",
  duration: "5 дней / 4 ночи",
  group: "до 12 человек",
  difficulty: "легкий",
  images: ["img1.jpg", "img2.jpg", "img3.jpg"],
  description: "Текст описания...",
  included: ["Проживание", "Питание", "Гид"],
  program: [
    { day: 1, title: "День 1", description: "Описание дня" },
    { day: 2, title: "День 2", description: "Описание дня" }
  ]
}
```

**Пример:**
```javascript
import { populateTourDetail } from './tour-detail/tour-detail-ui.js';

const tourData = {
  title: "Поход к озеру",
  location: "Кавказ",
  duration: "3 дня",
  group: "до 10 человек",
  difficulty: "легкий",
  images: ["img1.jpg", "img2.jpg"],
  description: "Описание тура",
  included: ["Проживание", "Питание"],
  program: [{ day: 1, title: "День 1", description: "Старт" }]
};

populateTourDetail(tourData);
```

---

### 📸 tour-detail-gallery.js
**Role:** Initialization and management of the Swiper gallery

**Экспорты:**
- `initTourGallery(images)` - Initializes the gallery with the given images

**What it does:**
1. **Clears the previous gallery:**
   - Destroys the old Swiper instance (`swiper.destroy(true, true)`)
   - Clears the HTML container of the slides

2. **Creates new slides:**
   - Generates `<div class="swiper-slide">` for each image
   - Adds `<img>` with `srcset` for retina displays (@1x and @2x)
   - Sets `width` and `height` attributes (500x400)

3. **Инициализирует Swiper:**
   - Modules: Navigation, Keyboard
   - Navigation: prev/next buttons at the bottom of the slider
   - Keyboard: arrows for switching slides
   - Adaptive speed: 400ms (mobile) → 800ms (desktop)

4. **Manages the loading state:**
   - Adds `.is-loading` (opacity: 0) before initialization
   - Removes the class after initialization (fade-in effect)

**Swiper configuration:**
```javascript
{
  modules: [Navigation, Keyboard],
  navigation: {
    nextEl: '.tour-detail__slider-button.swiper-button-next',
    prevEl: '.tour-detail__slider-button.swiper-button-prev',
  },
  keyboard: { enabled: true, onlyInViewport: true },
  loop: true,
  speed: 400,
  breakpoints: {
    768: { speed: 600 },
    1440: { speed: 800 }
  },
  on: {
    init: function() {
      addNavigationIcons(this);
    }
  }
}
```

**Пример:**
```javascript
import { initTourGallery } from './tour-detail/tour-detail-gallery.js';

const images = [
  'img/tours/tour-1.jpg',
  'img/tours/tour-2.jpg',
  'img/tours/tour-3.jpg'
];

initTourGallery(images);
```

---

### 📋 tour-detail-booking.js
**Role:** Processing of the booking form (validation, sending, feedback)

**Exports:**
- `handleBookingSubmit(event)` - Event handler for the submit event of the form

**What it does:**
1. **Validation of fields:**
   - Checks the required fields: firstname, lastname, phone, email, people, city, experience
   - If validation fails - return (the validation module shows errors)

2. **Sending the form:**
   - Blocks the submit button
   - Changes the text of the button to "Sending..."
   - Sends FormData through fetch to `https://echo.htmlacademy.ru`
   - Restores the button after the response

3. **Processing the result:**
   - **Success (response.ok):**
     - Shows success message through `showMessage()`
     - Through 500ms: clears the form through `clearForm()` + hides the errors
     - Through 1000ms: closes the modal window through `closeModal('tour-detail')`

   - **Error (response !ok or catch):**
     - Shows error message through `showMessage()`
     - Restores the submit button
     - Saves the form data (does not clear)

**Used in:**
- `tour-detail.js` - attaches to the booking form at initialization

**Пример:**
```javascript
import { handleBookingSubmit } from './tour-detail/tour-detail-booking.js';

const bookingForm = document.querySelector('[data-tour-booking-form]');
if (bookingForm) {
  bookingForm.addEventListener('submit', handleBookingSubmit);
}
```

---

## Data flow

### 1. Opening the tour-detail modal

```
User clicks "Подробнее" on the tour card
    ↓
tour-detail.js extracts data from data-attributes of the card
    ↓
tour-detail-ui.js fills the UI (metadata, content, program)
    ↓
tour-detail-gallery.js creates a gallery with images
    ↓
modal.js opens the modal window
    ↓
scroll-animations.js starts fade-in animations of the form sections
```

### 2. Sending the booking form

```
User fills the form and clicks "Отправить заявку"
    ↓
booking-form-validation.js checks the validity (real-time)
    ↓
tour-detail-booking.js processes the submit
    ↓
Sending fetch request to the server
    ↓
Success: showMessage → clearForm (500ms) → closeModal (1000ms)
Error: showMessage → button enabled, data saved
```

---

## Relationship with other modules

### Dependencies:
- **modal.js** - opening/closing the modal window
- **scroll-animations.js** - fade-in animations of the sections
- **booking-form-validation.js** - real-time validation of the form
- **booking-form-masks.js** - pattern hints for phone/email
- **utils/message-helpers.js** - showing success/error messages
- **utils/form-helpers.js** - clearing the form
- **utils/slider-helpers.js** - adding icons to the navigation buttons
- **utils/constants.js** - timing constants (FORM_CLEAR_DELAY, MODAL_CLOSE_DELAY)

### Используется в:
- **main.js** - initialization through `initTourDetail()`

---

## Cascade Styling for the content

The content areas in tour-detail use **cascade styling** (without BEM classes):

```html
<!-- Description -->
<div class="tour-detail__content">
  <p>Tour description...</p>
</div>

<!-- Included list -->
<div class="tour-detail__content tour-detail__content--list">
  <ul>
    <li>List item 1</li>
    <li>List item 2</li>
  </ul>
</div>

<!-- Program -->
<div class="tour-detail__content tour-detail__content--program">
  <article>
    <h4>Day 1</h4>
    <strong>Day title</strong>
    <p>Program description...</p>
  </article>
</div>
```

**Styles are applied through cascade** (tour-detail.scss):
```scss
.tour-detail__content {
  p { font-size: $font-size-base; }
}

.tour-detail__content--list {
  ul { display: flex; flex-direction: column; }
  li::before { content: "✓"; }
}

.tour-detail__content--program {
  article { padding: $spacing-md; }
  h4 { color: $color-primary-blue; }
}
```

## Future improvements

1. **Caching Swiper instance** - do not recreate when opening the same tour again
2. **Lazy loading images** - load only visible slides
3. **Preloading** - preload images of the next/previous slide
4. **Transition between tours** - smooth content change without closing the modal
5. **History navigation** - support browser history for deep linking
