import Holidays from "date-holidays";
import {
  eachDayOfInterval,
  isSunday,
  isSaturday,
  isSameDay,
  isSameMonth
} from "date-fns";

/**
 *
 * @param {{period:Date, region:string[]}} param0
 */
export function getLabourDays({ period, region }) {
  const year = period.getFullYear();
  const month = period.getMonth();
  // see https://stackoverflow.com/questions/13571700/get-first-and-last-date-of-current-month-with-javascript-or-jquery
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth
  });

  // @ts-ignore
  const holidays = new Holidays(...region)
    .getHolidays(year)
    .filter(holiday => isSameMonth(period, holiday.start))
    .filter(holiday => holiday.type === "bank" || holiday.type === "public")
    .map(holiday => holiday.start);

  return daysInMonth.filter(
    day =>
      !isSunday(day) &&
      !isSaturday(day) &&
      !holidays.some(holiday => isSameDay(day, holiday))
  );
}

// getLabourDays({ period: new Date("2019-12-01"), region: ["DE", "BY"] });
