import {
  SAVE_HABIT,
  TOGGLE_DAY_HABIT,
  START_NEW_WEEK,
  DELETE_HABIT
} from "../../actions/habitActions";
import { getCurrentWeek, getTodayIndex } from "../../utils/dateUtils";

const getDefaultState = () =>
  typeof window !== "undefined" && window.Cypress
    ? require(`../mock/${window.Cypress.habitMock}.json`)
    : {
        weeks: {
          [getCurrentWeek()]: {}
        },
        currentWeek: getCurrentWeek()
      };

const getHabitStatus = (frequency, checked, isPreviousWeek) => {
  const todayIndex = getTodayIndex();
  const daysUntilEndOfWeek = checked[todayIndex]
    ? -todayIndex + 6
    : -todayIndex + 7;
  const checkedDays = checked.filter(checkedDay => checkedDay).length;

  const habitSucceded = frequency <= checkedDays;
  const habitFailed = isPreviousWeek
    ? !habitSucceded
    : frequency > checkedDays + daysUntilEndOfWeek;

  return {
    habitSucceded,
    habitFailed
  };
};

const habitsReducer = (state = getDefaultState(), { type, payload }) => {
  switch (type) {
    case START_NEW_WEEK: {
      const newWeekHabits = {};
      const previousWeekHabits = {};

      Object.keys(state.weeks[state.currentWeek]).forEach(key => {
        const habit = state.weeks[state.currentWeek][key];
        const { name, type, frequency, checked } = habit;

        const { habitSucceded, habitFailed } = getHabitStatus(
          frequency,
          checked,
          true
        );

        previousWeekHabits[key] = {
          ...habit,
          habitSucceded,
          habitFailed
        };

        newWeekHabits[key] = {
          name,
          type,
          frequency,
          checked: [false, false, false, false, false, false, false]
        };
      });

      const currentWeek = getCurrentWeek();
      const [currentYearString, currentWeekString] = currentWeek.split("w");
      const previousWeekKey = `${currentYearString}w${currentWeekString - 1}`;
      const previousWeek = state.weeks[previousWeekKey]
        ? previousWeekKey
        : undefined;

      return {
        ...state,
        currentWeek,
        previousWeek,
        weeks: {
          ...state.weeks,
          [state.currentWeek]: previousWeekHabits,
          [currentWeek]: newWeekHabits
        }
      };
    }

    case SAVE_HABIT: {
      const checked = payload.id
        ? state.weeks[state.currentWeek][payload.id].checked
        : [false, false, false, false, false, false, false];

      const name = payload.name.trim();
      const { frequency, type } = payload;

      const { habitSucceded, habitFailed } = getHabitStatus(
        payload.frequency,
        checked
      );

      const habits = {
        ...state.weeks[state.currentWeek],
        [name]: { name, frequency, type, checked, habitSucceded, habitFailed }
      };

      if (payload.id && payload.id !== name) delete habits[payload.id];

      return {
        ...state,
        weeks: {
          ...state.weeks,
          [state.currentWeek]: habits
        }
      };
    }

    case DELETE_HABIT: {
      const habits = {
        ...state.weeks[state.currentWeek]
      };

      delete habits[payload.id.trim()];

      return {
        ...state,
        weeks: {
          ...state.weeks,
          [state.currentWeek]: habits
        }
      };
    }

    case TOGGLE_DAY_HABIT: {
      const week = payload.week;
      const { frequency } = state.weeks[week][payload.name];
      const updatedChecked = state.weeks[week][payload.name].checked.map(
        (item, index) => (index !== payload.day ? item : !item)
      );
      const isPreviousWeek = payload.week !== state.currentWeek;

      const { habitSucceded, habitFailed } = getHabitStatus(
        frequency,
        updatedChecked,
        isPreviousWeek
      );

      return {
        ...state,
        weeks: {
          ...state.weeks,
          [week]: {
            ...state.weeks[week],
            [payload.name]: {
              ...state.weeks[week][payload.name],
              habitSucceded,
              habitFailed,
              checked: state.weeks[week][payload.name].checked.map(
                (item, index) => (index !== payload.day ? item : !item)
              )
            }
          }
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default habitsReducer;
