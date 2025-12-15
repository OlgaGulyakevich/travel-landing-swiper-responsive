/**
 * @fileoverview Tours Catalog Data Module
 * Handles tours data loading and access
 * @module tours-catalog/tours-catalog-data
 * @author Olga Gulakevich
 * @version 1.0.0
 */

/**
 * Tours data storage
 * @type {Array<Object>}
 */
let toursData = [];

/**
 * Load tours data from JSON file
 *
 * Fetches tours data from /data/tours.json and stores it in module-level variable.
 * Handles errors gracefully by logging to console and returning empty array.
 *
 * @returns {Promise<Array<Object>>} Tours data array
 *
 * @example
 * // Load tours on initialization
 * const tours = await loadToursData();
 * console.log(`Loaded ${tours.length} tours`);
 */
export const loadToursData = async () => {
  try {
    const response = await fetch('/data/tours.json');
    if (!response.ok) {
      throw new Error('Failed to load tours data');
    }
    toursData = await response.json();
    return toursData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error loading tours:', error);
    return [];
  }
};

/**
 * Get tours data
 *
 * Returns reference to loaded tours data. Used by other modules (e.g., tour-detail.js)
 * to access tours without reloading.
 *
 * @returns {Array<Object>} Tours data array
 *
 * @example
 * // Get tours in another module
 * import { getToursData } from './tours-catalog/tours-catalog-data.js';
 * const tours = getToursData();
 * const tour = tours.find(t => t.id === 'elbrus-5-days');
 */
export const getToursData = () => toursData;

/**
 * Get difficulty level category from numeric difficulty
 *
 * Converts numeric difficulty (1-5) to text category for filtering:
 * - 1-2: 'easy'
 * - 3: 'medium'
 * - 4-5: 'hard'
 *
 * @param {number} difficulty - Difficulty level (1-5)
 * @returns {string} Difficulty category ('easy', 'medium', or 'hard')
 *
 * @example
 * // Get difficulty category
 * getDifficultyLevel(2); // 'easy'
 * getDifficultyLevel(3); // 'medium'
 * getDifficultyLevel(5); // 'hard'
 */
export const getDifficultyLevel = (difficulty) => {
  if (difficulty <= 2) {
    return 'easy';
  }
  if (difficulty <= 3) {
    return 'medium';
  }
  return 'hard';
};
