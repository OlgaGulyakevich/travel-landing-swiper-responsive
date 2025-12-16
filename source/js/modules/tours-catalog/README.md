# Tours Catalog - Module for the tours catalog

A modal window with a filterable catalog of all available tours.

## Module architecture

The module is split into **2 specialized submodules** + **1 coordinator**:

```
tours-catalog.js (coordinator, facade pattern)
├── tours-catalog-data.js   (tour data, filtering logic)
└── tours-catalog-render.js (UI rendering, event handling)
```

---

## Modules

### 🎯 tours-catalog.js (Coordinator)
**Role:** Facade pattern - single entry point, coordinates data and render modules

**Exports:**
- `initToursCatalog()` - Initializes the tours catalog module

**What it does:**
1. Loads tours data from JSON file
2. Attaches event listeners to difficulty filter buttons
3. When a filter button is clicked:
    - Updates active state of buttons
    - Calls `filterTours(filter)` with difficulty level ('all', 'easy', 'medium', 'hard')
    - Calls `renderTours()` to update the UI
4. Handles "Подробнее" button clicks to open tour detail modal

**Used in:**
- `main.js` - initialization on DOMContentLoaded

**Example:**
```javascript
import { initToursCatalog } from './modules/tours-catalog.js';

document.addEventListener('DOMContentLoaded', () => {
  initToursCatalog();
});
```

---

### 📊 tours-catalog-data.js
**Role:** Storage of tour data and filtering logic

**Exports:**
- `tours` - Array of all tours with full information
- `filterTours(filters)` - Filters tours by given criteria

**Structure of the tour data:**
```javascript
{
  id: 1,
  title: "Поход в Петру — Вади Рам",
  location: "кавказ",
  duration: "5",
  difficulty: "легкий",
  group: "до 12 человек",
  price: 86000,
  images: [
    "img/tours/tour-1.jpg",
    "img/tours/tour-1-2.jpg",
    "img/tours/tour-1-3.jpg"
  ],
  description: "Текст описания тура...",
  included: [
    "Проживание в гостинице, отеле, кемпинге",
    "Трансфер от аэропорта до места старта похода и обратно",
    "..."
  ],
  program: [
    {
      day: 1,
      title: "Акаба – Маленькая Петра",
      description: "Описание программы дня..."
    },
    // ...
  ]
}
```

**Filtering logic:**
```javascript
filterTours(filter)
```

Filter by difficulty level:
- `'all'` - Returns all tours
- `'easy'` - Returns tours with difficulty 1-2 (легкий)
- `'medium'` - Returns tours with difficulty 3 (средний)
- `'hard'` - Returns tours with difficulty 4-5 (сложный)

**Examples:**
```javascript
import { getToursData, getDifficultyLevel } from './tours-catalog/tours-catalog-data.js';
import { filterTours } from './tours-catalog.js';

// All tours
const allTours = filterTours('all'); // Returns all 6 tours

// Only easy tours
const easyTours = filterTours('easy'); // Returns tours with difficulty 1-2

// Only medium tours
const mediumTours = filterTours('medium'); // Returns tours with difficulty 3

// Only hard tours
const hardTours = filterTours('hard'); // Returns tours with difficulty 4-5
```

---

### 🎨 tours-catalog-render.js
**Role:** Rendering tour cards and handling UI events

**Exports:**
- `initToursCatalogRender()` - Initialization (rendering all tours)
- `renderTours(tours)` - Rendering an array of tours in UI

**What it does:**
1. Imports all tours from `tours-catalog-data.js`
2. Calls `renderTours(tours)` for rendering

**What it does:**
1. **Cleans the container** - removes old cards
2. **Creates tour cards** for each tour in the array:
    ```html
    <article class="tours-catalog__card card" data-tour-id="${tour.id}">
        <a class="card__link" data-open-tour-detail>
            <div class="card__image-wrapper">
                <img srcset="..." alt="${tour.title}">
            </div>
            <div class="card__content">
                <h3 class="card__title">${tour.title}</h3>
                <div class="card__details">
                    <p class="card__location">${tour.location}</p>
                    <p class="card__duration">${tour.duration} дней / ночей</p>
                    <p class="card__difficulty">${difficulty}</p>
                </div>
            </div>
        </a>
        <div class="card__footer">
            <p class="card__price">от ${tour.price.toLocaleString('ru-RU')} ₽</p>
            <button class="button card__button" data-open-tour-detail>Подробнее</button>
        </div>
    </article>
    ```

3. **Adds data-attributes** for the tour-detail module:
    - `data-tour-id` - ID of the tour
    - `data-tour-title`, `data-tour-location`, `data-tour-duration` and more
    - `data-tour-images`, `data-tour-included`, `data-tour-program` (JSON.stringify)

4. **Handles empty result:**
    - If there are no tours - shows the message "Tours not found"
    - Applies styles for centering the text

**Formatting data:**
- **Difficulty:** Displayed as text labels (easy/medium/hard)
- **Price:** Formatting with thousands separators
  - `86000` → `86 000 ₽`
- **Images:** Srcset for retina displays
  - `tour-1.jpg` → `tour-1.jpg 1x, tour-1@2x.jpg 2x`
- **Rating:** SVG stars generated via `generateStars()`

**Examples:**
```javascript
import { renderTours } from './tours-catalog/tours-catalog-render.js';
import { getToursData } from './tours-catalog/tours-catalog-data.js';

// Show all tours
const allTours = getToursData();
renderTours(allTours);

// Show filtered tours (from tours-catalog.js)
const easyTours = filterTours('easy');
renderTours(easyTours);

// Empty result
renderTours([]); // "Туры не найдены. Попробуйте изменить фильтры."
```

---

## Data flow

### 1. Opening the tours catalog

```
User clicks "All tours" in the navigation
    ↓
modal.js opens the modal window [data-modal="tours-catalog"]
    ↓
tours-catalog-render.js already rendered all tours during initialization
    ↓
User sees the catalog with 11 tour cards
```

### 2. Filtering tours by difficulty

```
User clicks the filter button (e.g. "Easy")
    ↓
tours-catalog.js handles the 'click' event
    ↓
The active state of the buttons is updated (.tours-catalog__filter--active)
    ↓
filterTours('easy') filters the array of tours by difficulty 1-2 (easy)
    ↓
tours-catalog-render.js renders the filtered tours
    ↓
UI is updated (only easy tours are shown)
```

### 3. Transition to tour-detail

```
User clicks "Подробнее" on the card
    ↓
tour-detail.js extracts data from data-attributes of the card
    ↓
modal.js closes tours-catalog and opens tour-detail
    ↓
tour-detail-ui.js fills the modal window with data
```

---

## Relationship with other modules

### Dependencies:
- **modal.js** - opening/closing the modal window
- **tour-detail.js** - opening detailed information about the tour
- **utils/ui-helpers.js** - generation of rating stars for tour cards

### Used in:
- **main.js** - initialization via `initToursCatalog()`

### Provides data for:
- **tour-detail.js** - through data-attributes on the cards
  - `data-tour-id`, `data-tour-title`, `data-tour-location`, and more
  - `data-tour-images`, `data-tour-included`, `data-tour-program` (JSON)

---

## Catalog filters

### Available filters:

**Difficulty (difficulty):**
- All (all) - shows all tours
- Легкие (easy) - difficulty 1-2
- Medium (medium) - difficulty 3
- Hard (hard) - difficulty 4-5

### Logic of applying filters:

Filters are implemented through **buttons** with the `data-filter` attribute:
```html
<button data-filter="all">All</button>
<button data-filter="easy">Easy</button>
<button data-filter="medium">Medium</button>
<button data-filter="hard">Hard</button>
```

**Examples:**
```javascript
// All tours
filterTours('all') // Returns all 6 tours

// Only easy tours (difficulty 1-2)
filterTours('easy') // Filters by difficulty 1-2

// Only medium tours (difficulty 3)
filterTours('medium')

// Only hard tours (difficulty 4-5)
filterTours('hard')
```

**Important:**
- The filter is applied only to one parameter - difficulty
- When the filter button is clicked, it gets the class `.tours-catalog__filter--active`
- If no tour matches - the message "Tours not found" is shown

---

## Principles of architecture

### Separation of Concerns
Clear separation of responsibilities:
- **Data** - storing and filtering data
- **Render** - rendering UI
- **Coordinator** - linking data and render

### Data-Driven UI
UI is generated from data:
- Tour data in a separate module
- Easy to add new tours without changing the code
- Changing filters = re-rendering with new data

### Pure Functions
Pure functions without side effects:
- `filterTours()` returns a new array, does not mutate the original
- `renderTours()` simply renders, does not affect the data
- Easy to test and debug

### Progressive Enhancement
The catalog works without JavaScript:
- Tour cards are available in HTML on the main page
- Modal window - enhancement for convenience
- Filters - additional functionality

---

## Adding new tours

To add a new tour:

1. **Open** `source/data/tours.json`
2. **Add an object** to the array:
    ```json
    {
        "id": "tour-slug",
        "title": "Название тура",
        "region": "Кавказ",
        "difficulty": 2,
        "duration": {
            "days": 5,
            "nights": 4
        },
        "price": 95000,
        "shortDescription": "Краткое описание для карточки",
        "fullDescription": "Полное описание тура для модального окна",
        "included": [
            "Проживание в гостиницах",
            "Трёхразовое питание",
            "Услуги гида"
        ],
        "program": [
            {
                "day": 1,
                "title": "День 1",
                "description": "Описание программы дня"
            }
        ],
        "images": [
            "img/tour-7@1x.jpg",
            "img/tour-7.2@1x.jpg",
            "img/tour-7.3@1x.jpg"
        ],
        "heroSlideIndex": null,
        "dates": "12.06-19.06",
        "groupSize": "до 15 чел."
    }
    ```

3. **Add images** to `source/img/`:
    - `tour-7@1x.jpg` and `tour-7@2x.jpg` (main image)
    - `tour-7.2@1x.jpg` and `tour-7.2@2x.jpg` (gallery)
    - `tour-7.3@1x.jpg` and `tour-7.3@2x.jpg` (gallery)
    - And so on for additional gallery photos

4. **Restart the dev-server** to load the updated JSON:
    ```bash
    npm run dev
    ```

5. **Done!** The tour will appear in the catalog automatically.

**Важные поля:**
- `id` - Unique slug (string, e.g. "elbrus-journey")
- `region` - "Caucasus", "Altai" or "Dagestan"
- `difficulty` - Number 1-5 (1-2: easy, 3: medium, 4-5: hard)
- `duration` - Object with `days` and `nights` fields
- `heroSlideIndex` - Index of the hero slide (number) or `null` if the tour is not on the main slide
- `dates` - String with dates in format "DD.MM-DD.MM"
- `groupSize` - String, e.g. "up to 15 people"

**Do not need to:**
- Change HTML
- Update JavaScript code
- Add new event handlers

---

## Future improvements

1. **Multiple selection in filters** - checkbox instead of select
2. **Sorting** - by price, duration, popularity
3. **Search** - by name and description of the tour
4. **Pagination** - if the number of tours becomes more than 20
5. **URL state** - saving filters in URL for direct links
6. **Animations** - smooth appearance/disappearance of cards when filtering
7. **Loading data from the server** - instead of hardcoded array
