/**
 * @fileoverview Text utility functions for Russian language declensions
 * @module utils/text-helpers
 * @author Olga Gulakevich
 * @version 1.0.0
 */

/**
 * Get days text with correct Russian declension
 *
 * Returns properly declined form of "день" (day) based on the number:
 * - 1 день (1 day)
 * - 2-4 дня (2-4 days)
 * - 5+ дней (5+ days)
 *
 * @param {number} days - Number of days
 * @returns {string} Days text with correct declension
 *
 * @example
 * getDaysText(1)
 * // Returns: '1 день'
 *
 * @example
 * getDaysText(3)
 * // Returns: '3 дня'
 *
 * @example
 * getDaysText(7)
 * // Returns: '7 дней'
 */
export const getDaysText = (days) => {
  if (days === 1) {
    return '1 день';
  }
  if (days >= 2 && days <= 4) {
    return `${days} дня`;
  }
  return `${days} дней`;
};

/**
 * Get nights text with correct Russian declension
 *
 * Returns properly declined form of "ночь" (night) based on the number:
 * - 1 ночь (1 night)
 * - 2-4 ночи (2-4 nights)
 * - 5+ ночей (5+ nights)
 *
 * @param {number} nights - Number of nights
 * @returns {string} Nights text with correct declension
 *
 * @example
 * getNightsText(1)
 * // Returns: '1 ночь'
 *
 * @example
 * getNightsText(2)
 * // Returns: '2 ночи'
 *
 * @example
 * getNightsText(10)
 * // Returns: '10 ночей'
 */
export const getNightsText = (nights) => {
  if (nights === 1) {
    return '1 ночь';
  }
  if (nights >= 2 && nights <= 4) {
    return `${nights} ночи`;
  }
  return `${nights} ночей`;
};
