/**
 * utils/index.ts
 * 
 * Centralized utility functions for the application.
 * Contains helper functions for formatting, date calculations, and validations.
 * 
 * All utility functions are pure functions with no side effects.
 */

/**
 * Formats a currency value to a string with $ prefix and 2 decimal places.
 * 
 * @param {string | number} value - The value to format (can be string or number)
 * @returns {string} Formatted currency string (e.g., "$50.00")
 * 
 * @example
 * formatCurrency(50) // "$50.00"
 * formatCurrency("50.5") // "$50.50"
 * formatCurrency("invalid") // "$0.00"
 */
export const formatCurrency = (value: string | number): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return '$0.00';
  return `$${numValue.toFixed(2)}`;
};

/**
 * Formats a Date object to a readable string format.
 * 
 * @param {Date} date - The date object to format
 * @returns {string} Formatted date string (e.g., "Apr 12, 2025")
 * 
 * @example
 * formatDate(new Date(2025, 3, 12)) // "Apr 12, 2025"
 */
export const formatDate = (date: Date): string => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${month} ${day}, ${year}`;
};

/**
 * Calculates the number of days in a given month and year.
 * Handles leap years correctly.
 * 
 * @param {number} month - Month index (0-11, where 0 = January)
 * @param {number} year - The year
 * @returns {number} Number of days in the month
 * 
 * @example
 * getDaysInMonth(1, 2024) // 29 (February in leap year)
 * getDaysInMonth(1, 2025) // 28 (February in non-leap year)
 * getDaysInMonth(3, 2025) // 30 (April)
 */
export const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Generates an array of years for date picker.
 * Returns current year ± 25 years (51 years total).
 * 
 * @returns {number[]} Array of years from (current - 25) to (current + 25)
 * 
 * @example
 * // If current year is 2025
 * getYears() // [2000, 2001, ..., 2024, 2025, 2026, ..., 2050]
 */
export const getYears = (): number[] => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let i = currentYear - 25; i <= currentYear + 25; i++) {
    years.push(i);
  }
  return years;
};

/**
 * Validates if a value is a valid Date object.
 * 
 * @param {Date} date - The date to validate
 * @returns {boolean} True if date is valid, false otherwise
 * 
 * @example
 * isValidDate(new Date()) // true
 * isValidDate(new Date('invalid')) // false
 * isValidDate(null) // false
 */
export const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

