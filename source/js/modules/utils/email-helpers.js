/**
 * @fileoverview Email utility functions
 * @module utils/email-helpers
 * @author Olga Gulakevich
 * @version 1.0.0
 */

/**
 * Fixes double Punycode encoding bug for .рф (Russian) domains
 *
 * Browser bug: When user types email@domain.рф, some browsers encode it
 * incorrectly as email@domain.xn--p1ai.xn--p1ai (double encoding).
 * This function detects and fixes this specific bug.
 *
 * @param {string} email - Email address that may contain double-encoded Punycode
 * @returns {string} Email with corrected single Punycode encoding
 *
 * @example
 * fixDoublePunycodeEncoding('test@mail.xn--p1ai.xn--p1ai')
 * // Returns: 'test@mail.xn--p1ai'
 *
 * @example
 * fixDoublePunycodeEncoding('test@gmail.com')
 * // Returns: 'test@gmail.com' (unchanged)
 */
export const fixDoublePunycodeEncoding = (email) => {
  if (!email) {
    return email;
  }

  // Fix only the specific bug: double .xn--p1ai encoding
  return email.replace(/\.xn--p1ai\.xn--p1ai$/i, '.xn--p1ai');
};
