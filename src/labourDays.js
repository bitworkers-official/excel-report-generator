import Holidays from "date-holidays";
import { eachDayOfInterval, isSunday, isSaturday } from "date-fns";

/**
 *
 * @param {{period:Date, region:string[]}} param0
 */
export function getLabourDays({ period, region }) {
  const year = period.getFullYear();
  const month = period.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth
  });

  // @ts-ignore
  const holidays = new Holidays(...region);
  return daysInMonth.filter(day => {
    const holiday = holidays.isHoliday(day);
    const isBankOrPublicHoliday =
      holiday.type === "bank" || holiday.type === "public";
    return !isBankOrPublicHoliday && !isSunday(day) && !isSaturday(day);
  });
}
