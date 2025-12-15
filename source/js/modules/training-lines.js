/**
 * Training Process - Adaptive Lines (Mobile + Desktop)
 *
 * Mobile (< 768px): Vertical lines between circles
 * - Dynamically calculated based on item height
 * - Adapts to text changes
 *
 * Tablet (768px - 1439px): No lines
 *
 * Desktop (1440px+): Horizontal lines below each row
 * - Dynamically calculated based on grid layout
 * - Works with any number of items (1-5 per row)
 */

import { TIMING } from './utils/constants.js';

export function initTrainingLines() {
  const processSection = document.querySelector('.training__process');
  const processList = document.querySelector('.training__process-list');

  if (!processSection || !processList) {
    return;
  }

  // Container for dynamically created lines
  let linesContainer = null;

  // Function to calculate and update lines
  function updateLines() {
    const processItems = Array.from(processList.querySelectorAll('.training__process-item'));

    if (processItems.length === 0) {
      return;
    }

    const viewportWidth = window.innerWidth;

    // Remove old lines container if exists
    if (linesContainer) {
      linesContainer.remove();
      linesContainer = null;
    }

    // Tablet: no lines at all
    if (viewportWidth >= 768 && viewportWidth < 1440) {
      processList.style.rowGap = '';
      return;
    }

    // Mobile: vertical lines
    if (viewportWidth < 768) {
      createMobileLines(processItems);
      return;
    }

    // Desktop: horizontal lines
    if (viewportWidth >= 1440) {
      createDesktopLines(processItems);

    }
  }

  // Mobile: Create vertical lines between circles
  function createMobileLines(processItems) {
    // Create lines container
    linesContainer = document.createElement('div');
    linesContainer.className = 'training__process-lines';
    linesContainer.setAttribute('aria-hidden', 'true');

    const containerRect = processSection.getBoundingClientRect();

    // Create vertical line for each item (except last)
    processItems.forEach((item, index) => {
      if (index === processItems.length - 1) {
        // Last item: line from top of item to circle
        const line = document.createElement('div');
        line.className = 'training__process-line--vertical';

        const itemRect = item.getBoundingClientRect();

        // Circle is at: left: 0, top: 50% (transform: translateY(-50%))
        // Circle center Y: itemRect.top + itemRect.height / 2
        const circleY = itemRect.top + itemRect.height / 2 - containerRect.top;

        line.style.left = '6px'; // Center of circle (14px / 2 = 7px, but line 2px wide, so 6px)
        line.style.top = `${itemRect.top - containerRect.top}px`;
        line.style.height = `${circleY - (itemRect.top - containerRect.top) - 7}px`; // -7px to stop at circle edge

        linesContainer.appendChild(line);
      } else {
        // Regular item: line from current circle to next circle
        const line = document.createElement('div');
        line.className = 'training__process-line--vertical';

        const currentRect = item.getBoundingClientRect();
        const nextRect = processItems[index + 1].getBoundingClientRect();

        // Current circle center Y
        const currentCircleY = currentRect.top + currentRect.height / 2 - containerRect.top;
        // Next circle center Y
        const nextCircleY = nextRect.top + nextRect.height / 2 - containerRect.top;

        line.style.left = '6px'; // Center of circle
        line.style.top = `${currentCircleY + 7}px`; // +7px to start from bottom of circle
        line.style.height = `${nextCircleY - currentCircleY - 14}px`; // -14px (7px + 7px) for both circles

        linesContainer.appendChild(line);
      }
    });

    processSection.appendChild(linesContainer);
  }

  // Desktop: Create horizontal lines below each row
  function createDesktopLines(processItems) {
    // Group items into rows by comparing their Y positions
    // Items with same top position (±5px tolerance) = same row
    const rows = [];
    let currentRow = [];
    let currentTop = null;

    processItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemTop = Math.round(rect.top);

      // If first item or same row (same Y position ±5px tolerance)
      if (currentTop === null || Math.abs(itemTop - currentTop) < 5) {
        currentRow.push(item);
        currentTop = itemTop;
      } else {
        // New row detected - save previous row and start new one
        rows.push(currentRow);
        currentRow = [item];
        currentTop = itemTop;
      }
    });

    // Don't forget the last row
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    // Set row-gap based on number of rows
    if (rows.length > 1) {
      processList.style.rowGap = '100px';
    } else {
      processList.style.rowGap = '0';
    }

    // Create new lines container
    linesContainer = document.createElement('div');
    linesContainer.className = 'training__process-lines';
    linesContainer.setAttribute('aria-hidden', 'true');

    // Create a line for each row
    rows.forEach((row) => {
      const line = document.createElement('div');
      line.className = 'training__process-line';

      // Get positions from first item in row
      const firstItem = row[0];
      const firstRect = firstItem.getBoundingClientRect();
      const containerRect = processSection.getBoundingClientRect();

      // Calculate line position relative to container
      // lineTop: distance from container top to item bottom + 1px offset
      // To move line DOWN: increase offset (e.g., +1 → +11 moves 10px down)
      // To move line UP: decrease offset (e.g., +1 → -9 moves 10px up)
      const lineTop = firstRect.bottom - containerRect.top - 4;

      // lineLeft: horizontal position from container left + 20px (circle left position from SCSS)
      const lineLeft = firstRect.left - containerRect.left + 20;

      line.style.top = `${lineTop}px`;
      line.style.left = `${lineLeft}px`;
      line.style.width = '1180px'; // Fixed width from design

      linesContainer.appendChild(line);
    });

    // Add lines container to process section
    processSection.appendChild(linesContainer);
  }

  // Update on load
  updateLines();

  // Update on resize (debounced)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateLines, TIMING.DEBOUNCE_RESIZE);
  });

  // Update when fonts load (affects item height)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateLines);
  }

  // Observe content changes (text changes, DOM mutations)
  const observer = new ResizeObserver(() => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateLines, TIMING.DEBOUNCE_RESIZE);
  });

  // Observe all process items for size changes
  const items = processList.querySelectorAll('.training__process-item');
  items.forEach((item) => observer.observe(item));

  // Also observe the list itself for added/removed items
  const mutationObserver = new MutationObserver(() => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateLines, TIMING.DEBOUNCE_RESIZE);
  });

  mutationObserver.observe(processList, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}
