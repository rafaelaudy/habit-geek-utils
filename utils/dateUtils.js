import i18next from "i18next";

const getDateOfWeek = week => {
  const [yearNumber, weekNumber] = week.substr(1).split("w");

  const simple = new Date(yearNumber, 0, 1 + (weekNumber - 1) * 7);
  const dow = simple.getDay();
  const weekStart = simple;
  if (dow <= 4) weekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else weekStart.setDate(simple.getDate() + 8 - simple.getDay());

  let weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  return { weekStart, weekEnd };
};

const getShortDate = date => `${date.getDate()}/${getShortMonth(date)}`;

export const getCurrentWeek = providedDate => {
  const date = providedDate || new Date();
  date.setHours(0, 0, 0, 0);
  const weekCalc = new Date(date.getFullYear(), 0, 1);
  const currentWeek = Math.ceil(
    ((date - weekCalc) / 86400000 + weekCalc.getDay()) / 7
  );
  return `y${date.getFullYear()}w${currentWeek}`;
};

export const getTodayIndex = () => {
  const now = new Date();
  return now.getDay() === 0 ? 6 : now.getDay() - 1;
};

export const getWeekIntervalText = week => {
  const { weekStart, weekEnd } = getDateOfWeek(week);
  const weekNumber = week.split("w")[1];

  return `${i18next.t("week-description")} ${weekNumber}: ${getShortDate(
    weekStart
  )} - ${getShortDate(weekEnd)}`;
};

export const getShortMonth = date => {
  const monthShortNames = i18next.t("date-months-short", {
    returnObjects: true
  });
  return monthShortNames[date.getMonth()];
};

export const isToday = (week, day) => {
  const todayIndex = getTodayIndex();
  const currentWeek = getCurrentWeek();
  const isToday = todayIndex === day;
  return week === currentWeek && isToday;
};
