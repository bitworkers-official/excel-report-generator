/** Calculating or simply get the Number of Labor Days in Slovakia */

const Months = {
  January: 'January',
  February: 'February',
  March: 'March',
  April: 'April',
  May: 'May',
  June: 'June',
  Juli: 'Juli',
  August: 'August',
  September: 'September',
  October: 'October',
  November: 'November',
  December: 'December',
}

/**
 *
 * @param {keyof typeof Months} period
 */
export function numberOfLabourDays(month) {
  return 22
}
