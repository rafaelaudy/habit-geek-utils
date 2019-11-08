export const START_NEW_WEEK = "START_NEW_WEEK";
export const startNewWeek = () => ({
  type: START_NEW_WEEK
});

export const SAVE_HABIT = "SAVE_HABIT";
export const saveHabit = (id, name, type, frequency) => ({
  type: SAVE_HABIT,
  payload: {
    id,
    name,
    type,
    frequency
  }
});

export const DELETE_HABIT = "DELETE_HABIT";
export const deleteHabit = id => ({
  type: DELETE_HABIT,
  payload: {
    id
  }
});

export const TOGGLE_DAY_HABIT = "TOGGLE_DAY_HABIT";
export const toggleDayHabit = (week, name, day) => ({
  type: TOGGLE_DAY_HABIT,
  payload: {
    week,
    name,
    day
  }
});
