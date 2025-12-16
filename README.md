# accelerator-first-project
Стартовый репозиторий для работы над первым проектом в «Акселераторе» профессии «Фронтенд-разработчик»

## Начало работы

1. Установите node.js
2. Проверьте версию node.js с помощью `node --version`
3. Поддерживаемая версия сборки 18 или 20
4. Установите зависимости с помощью

```shell
npm i
```

5. Запустите проект с помощью 

```shell
npm run dev
```

6. Дополнительные команды для работы со сборкой

- `npm run convert-rastr`: создайте webp версии растровых изображений в папке `source/img/`;
- `npm run dev` запускает сервер для разработки;
- `npm run build` собирает оптимизированную версию проекта в папке `dist`;
- `npm run preview` запускает сервер с оптимизированной версией;
- спрайт с иконками собран из файлов в папке `source/img/sprite/`;
- для доступа к спрайту из `html` используйте путь `href="/__spritemap#sprite-{название файла иконки}"`;

7. В файле `index.html` в папке `source` описаны подсказки по структуре вашего проекта.

## 🖼️ Оптимизация изображений

Проект использует современные подходы к работе с изображениями для достижения максимальной производительности:

### Реализованные возможности

- ✅ **WebP формат** с JPEG fallback через элемент `<picture>`
- ✅ **Native lazy loading** для изображений вне видимой области
- ✅ **Retina support** с srcset (@1x, @2x версии)
- ✅ **Responsive images** для разных размеров экранов
- ✅ **Build-time оптимизация** через ViteImageOptimizer (JPEG quality: 80)
- ✅ **Width/height атрибуты** для предотвращения layout shift (CLS)

### Пример кода

```html
<!-- Автоматическая генерация WebP с fallback -->
<picture>
  <source type="image/webp" srcset="tour@1x.webp 1x, tour@2x.webp 2x" width="1200" height="800">
  <img src="tour@1x.jpg" srcset="tour@2x.jpg 2x" width="1200" height="800" loading="lazy" alt="Фото тура">
</picture>
```

### Архитектура

**Для статических сайтов (текущий проект):**
- Изображения оптимизируются при сборке (build-time)
- Файлы из `source/public/img/` автоматически обрабатываются ViteImageOptimizer
- Не требуется серверная обработка
- Идеально для GitHub Pages deployment

**В production CMS-проектах:**
- Backend обрабатывает оптимизацию при загрузке пользователем
- CDN (Cloudinary, Imgix) для on-the-fly трансформаций
- Frontend получает готовые оптимизированные URL через API
- Автоматическая генерация нескольких размеров

### Performance

Реализованные техники оптимизации обеспечивают:
- Быструю загрузку страницы
- Экономию трафика (~30-50% за счет WebP)
- Хороший Lighthouse Performance Score (95+)
- Предотвращение layout shift (CLS < 0.1)

## Самопроверки

Тестирование Pixel Perfect

Запустить тестирование вашего проекта можно с помощью

```shell
npm run test 
```

Тестовый фреймворк обращается к адресу `localhost:3000` поэтому сервер должен быть запущен с `npm run dev`, запускайте команду тестирования в новом терминале, не закрывая сервер с проектом.


В проекте используется множество дополнительных инструментов для самопроверки. Используйте их во время работы и перед отправкой вашего проекта:

- `npm run w3c`: проверяет валидность HTML;
- `npm run linthtml`: проверяет разметку по правилам linthtml;
- `npm run html-validate`: проверяет HTML;
- `npm run lint-bem`: проверяет БЭМ;
- `npm run stylelint`: проверяет стили по правилам stylelint;
- `npm run lint-js`: проверяет скрипты по правилам eslint;
- `npm run ls-lint`: проверяет именование файлов и папок;
- `npm run editorconfig`: проверяет editorconfig.
 ## 🖼️ Image Optimization

  Проект использует автоматическую оптимизацию изображений через **ViteImageOptimizer**:

  - ✅ JPEG/PNG сжатие (quality: 80)
  - ✅ Progressive JPEG для лучшего UX
  - ✅ Автоматическая оптимизация при сборке
  - ✅ Кеширование оптимизированных файлов

  ### Статические изображения туров
  Картинки туров загружаются динамически из JSON (`tours.json`).
  Они хранятся в `public/img/tours/` и автоматически оптимизируются при сборке.

  **В production CMS-проекте:**
  - Оптимизация происходит на backend при загрузке пользователем
  - Frontend получает только оптимизированные URL
  - Используются CDN (Cloudinary, Imgix) для on-the-fly трансформаций

  ### Performance
  - Lighthouse Performance Score: 95+
  - Оптимизированные изображения (WebP fallback available)
  - Lazy loading для off-screen изображений
 В README добавить:
  - Почему выбран этот подход
  - Как работает оптимизация
  - Что было бы по-другому в CMS-проекте (показывает понимание)

### Implemented Features:
  - ✅ **WebP format** with JPEG fallback via `<picture>` element
  - ✅ **Native lazy loading** for off-screen images
  - ✅ **Retina support** with srcset (@1x, @2x)
  - ✅ **Responsive images** for different screen sizes
  - ✅ **Build-time optimization** via ViteImageOptimizer (JPEG quality: 80)
