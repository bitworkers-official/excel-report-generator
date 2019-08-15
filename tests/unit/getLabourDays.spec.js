import { getLabourDays } from "../../src/labourDays";
import { format } from "date-fns";

const formatDay = day => format(day, "yyyy-MM-dd");
test("labour days in germany", () => {
  const labourDays = getLabourDays({
    period: new Date("2019-12-01"),
    region: ["DE", "BY"]
  }).map(formatDay);
  expect(labourDays).toStrictEqual([
    // "2019-12-01", sunday
    "2019-12-02",
    "2019-12-03",
    "2019-12-04",
    "2019-12-05",
    "2019-12-06",
    // "2019-12-07", saturday
    // "2019-12-08", sunday
    "2019-12-09",
    "2019-12-10",
    "2019-12-11",
    "2019-12-12",
    "2019-12-13",
    // "2019-12-14", saturday
    // "2019-12-15", sunday
    "2019-12-16",
    "2019-12-17",
    "2019-12-18",
    "2019-12-19",
    "2019-12-20",
    // "2019-12-21", saturday
    // "2019-12-22", sunday
    "2019-12-23",
    "2019-12-24",
    // "2019-12-25", christmas day
    // "2019-12-26", 2nd day of christmas
    "2019-12-27",
    // "2019-12-28", saturday
    // "2019-12-29", sunday
    "2019-12-30",
    "2019-12-31"
  ]);
});

test("labour days in slovakia", () => {
  const labourDays = getLabourDays({
    period: new Date("2019-05-01"),
    region: ["SK"]
  }).map(formatDay);
  expect(labourDays).toStrictEqual([
    // "2019-05-01", labour day
    "2019-05-02",
    "2019-05-03",
    // "2019-05-04", saturday
    // "2019-05-05", sunday
    "2019-05-06",
    "2019-05-07",
    // "2019-05-08", victory in europe day
    "2019-05-09",
    "2019-05-10",
    // "2019-05-11", saturday
    // "2019-05-12", sunday
    "2019-05-13",
    "2019-05-14",
    "2019-05-15",
    "2019-05-16",
    "2019-05-17",
    // "2019-05-18", saturday
    // "2019-05-19", sunday
    "2019-05-20",
    "2019-05-21",
    "2019-05-22",
    "2019-05-23",
    "2019-05-24",
    // "2019-05-25", saturday
    // "2019-05-26", sunday
    "2019-05-27",
    "2019-05-28",
    "2019-05-29",
    "2019-05-30",
    "2019-05-31"
  ]);
});
