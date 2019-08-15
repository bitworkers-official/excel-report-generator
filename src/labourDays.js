import Holidays from "date-holidays";
import { differenceInDays } from "date-fns";
const holidays = new Holidays("US", "la", "no");

holidays.getHolidays(2019).map(x => {
  const difference = differenceInDays(x.start, x.end); //?
  if (difference === 0) {
    x;
  }
});

// holidays.get; //?
/** Calculating or simply get the Number of Labor Days in Slovakia */
// eslint-disable-next-line no-unused-vars
const Months = {
  January: "January",
  February: "February",
  March: "March",
  April: "April",
  May: "May",
  June: "June",
  Juli: "Juli",
  August: "August",
  September: "September",
  October: "October",
  November: "November",
  December: "December"
};

/**
 *
 * @param {keyof typeof Months} month
 */
// eslint-disable-next-line no-unused-vars
export function numberOfLabourDays(month) {
  return 22;
}
