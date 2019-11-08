import habitsReducer from "./habitsReducer";
import {
  saveHabit,
  toggleDayHabit,
  startNewWeek,
  deleteHabit
} from "../../actions/habitActions";
import { getCurrentWeek, getTodayIndex } from "../../utils/dateUtils";

jest.mock("../../utils/dateUtils", () => ({
  getCurrentWeek: jest.fn().mockReturnValue("y1w1"),
  getTodayIndex: jest.fn().mockReturnValue("1")
}));

describe("habitsReducer - start new week", () => {
  const initialState = {
    weeks: {
      y1w0: {
        drive: {
          checked: [false, false, true, false, false, false, false],
          frequency: "3",
          name: "read",
          type: "hobby",
          habitFailed: true,
          habitSucceded: false
        },
        read: {
          checked: [false, true, false, true, false, false, false],
          frequency: "1",
          name: "read",
          type: "hobby",
          habitFailed: false,
          habitSucceded: true
        }
      }
    },
    currentWeek: "y1w0"
  };

  it("starts a new week with previous week set", () => {
    const state = habitsReducer(initialState, startNewWeek());
    expect(state.currentWeek).toEqual("y1w1");
    expect(state.previousWeek).toEqual("y1w0");
    expect(state.weeks).toEqual({
      ...initialState.weeks,
      y1w1: {
        drive: {
          ...initialState.weeks.y1w0.drive,
          checked: [false, false, false, false, false, false, false],
          habitFailed: undefined,
          habitSucceded: undefined
        },
        read: {
          ...initialState.weeks.y1w0.read,
          checked: [false, false, false, false, false, false, false],
          habitFailed: undefined,
          habitSucceded: undefined
        }
      }
    });
  });

  it("starts a new week without a previous week set", () => {
    getCurrentWeek.mockReturnValueOnce("y1w2");
    const state = habitsReducer(initialState, startNewWeek());
    expect(state.currentWeek).toEqual("y1w2");
    expect(state.previousWeek).toEqual(undefined);
    expect(state.weeks).toEqual({
      ...initialState.weeks,
      y1w2: {
        drive: {
          ...initialState.weeks.y1w0.drive,
          checked: [false, false, false, false, false, false, false],
          habitFailed: undefined,
          habitSucceded: undefined
        },
        read: {
          ...initialState.weeks.y1w0.read,
          checked: [false, false, false, false, false, false, false],
          habitFailed: undefined,
          habitSucceded: undefined
        }
      }
    });
  });

  it("sets failure and success status for the previous week habits", () => {
    const state = habitsReducer(initialState, startNewWeek());
    expect(state.weeks.y1w0.drive.habitSucceded).toEqual(false);
    expect(state.weeks.y1w0.drive.habitFailed).toEqual(true);
    expect(state.weeks.y1w0.read.habitSucceded).toEqual(true);
    expect(state.weeks.y1w0.read.habitFailed).toEqual(false);
  });
});

describe("habitsReducer - toggles a habit", () => {
  it("toggles a habit", () => {
    let state = habitsReducer(
      undefined,
      saveHabit(undefined, "read", "hobby", "2")
    );
    state = habitsReducer(state, toggleDayHabit("y1w1", "read", 1));
    expect(state.weeks).toEqual({
      y1w1: {
        read: {
          checked: [false, true, false, false, false, false, false],
          frequency: "2",
          name: "read",
          type: "hobby",
          habitFailed: false,
          habitSucceded: false
        }
      }
    });
  });

  it("toggles a habit in a different week", () => {
    let state = habitsReducer(
      undefined,
      saveHabit(undefined, "read", "hobby", "2")
    );
    getCurrentWeek.mockReturnValueOnce("y1w2");
    state = habitsReducer(state, startNewWeek());
    state = habitsReducer(state, toggleDayHabit("y1w1", "read", 1));
    state = habitsReducer(state, toggleDayHabit("y1w2", "read", 2));
    const week1Checked = [false, true, false, false, false, false, false];
    const week2Checked = [false, false, true, false, false, false, false];
    expect(state.weeks.y1w1.read.checked).toEqual(week1Checked);
    expect(state.weeks.y1w2.read.checked).toEqual(week2Checked);
  });

  it("marks habits as completed or incompleted on previous weeks", () => {
    let state = habitsReducer(
      undefined,
      saveHabit(undefined, "read", "hobby", "2")
    );
    getCurrentWeek.mockReturnValueOnce("y1w2");
    state = habitsReducer(state, startNewWeek());
    state = habitsReducer(state, toggleDayHabit("y1w1", "read", 1));
    expect(state.weeks.y1w1.read.habitFailed).toEqual(true);
    expect(state.weeks.y1w1.read.habitSucceded).toEqual(false);
    state = habitsReducer(state, toggleDayHabit("y1w1", "read", 2));
    expect(state.weeks.y1w1.read.habitFailed).toEqual(false);
    expect(state.weeks.y1w1.read.habitSucceded).toEqual(true);
  });

  it("marks habits that are completed for that week", () => {
    let state = habitsReducer(
      undefined,
      saveHabit(undefined, "read", "hobby", "1")
    );
    state = habitsReducer(state, toggleDayHabit("y1w1", "read", 1));
    expect(state.weeks).toEqual({
      y1w1: {
        read: {
          checked: [false, true, false, false, false, false, false],
          frequency: "1",
          name: "read",
          type: "hobby",
          habitSucceded: true,
          habitFailed: false
        }
      }
    });
  });

  it("marks habits that have failed for that week", () => {
    let state = habitsReducer(
      undefined,
      saveHabit(undefined, "read", "hobby", "7")
    );
    state = habitsReducer(state, toggleDayHabit("y1w1", "read", 1));
    expect(state.weeks).toEqual({
      y1w1: {
        read: {
          checked: [false, true, false, false, false, false, false],
          frequency: "7",
          name: "read",
          type: "hobby",
          habitSucceded: false,
          habitFailed: true
        }
      }
    });
  });

  it("marks habits correctly at the last day of the week", () => {
    getTodayIndex.mockReturnValueOnce("6").mockReturnValueOnce("6");
    let state = habitsReducer(
      undefined,
      saveHabit(undefined, "read", "hobby", "1")
    );
    state = habitsReducer(state, saveHabit(undefined, "write", "hobby", "2"));
    state = habitsReducer(state, toggleDayHabit("y1w1", "read", 6));
    state = habitsReducer(state, toggleDayHabit("y1w1", "write", 5));
    expect(state.weeks).toEqual({
      y1w1: {
        read: {
          checked: [false, false, false, false, false, false, true],
          frequency: "1",
          name: "read",
          type: "hobby",
          habitSucceded: true,
          habitFailed: false
        },
        write: {
          checked: [false, false, false, false, false, true, false],
          frequency: "2",
          name: "write",
          type: "hobby",
          habitSucceded: false,
          habitFailed: false
        }
      }
    });
  });
});

describe("habitsReducer - creates a habit", () => {
  it("creates a habit", () => {
    const state = habitsReducer(
      undefined,
      saveHabit(undefined, " read ", "hobby", "1")
    );
    expect(state.currentWeek).toEqual("y1w1");
    expect(state.weeks).toEqual({
      y1w1: {
        read: {
          checked: [false, false, false, false, false, false, false],
          frequency: "1",
          name: "read",
          type: "hobby",
          habitFailed: false,
          habitSucceded: false
        }
      }
    });
  });

  it("checks if the habit failed after creation", () => {
    const state = habitsReducer(
      undefined,
      saveHabit(undefined, "read", "hobby", "7")
    );
    expect(state.weeks).toEqual({
      y1w1: {
        read: {
          checked: [false, false, false, false, false, false, false],
          frequency: "7",
          name: "read",
          type: "hobby",
          habitFailed: true,
          habitSucceded: false
        }
      }
    });
  });
});

describe("habitsReducer - deletes a habit", () => {
  it("deletes a habit", () => {
    let state = habitsReducer(
      undefined,
      saveHabit(undefined, " read  ", "hobby", "1")
    );
    state = habitsReducer(state, deleteHabit(" read "));
    expect(state.weeks).toEqual({ y1w1: {} });
  });
});

describe("habitsReducer - updates a habit", () => {
  [
    {
      description: "updates a habit",
      name: " read ",
      type: "improvement",
      frequency: "2"
    },
    {
      description: "deletes old habit",
      name: " write ",
      type: "improvement",
      frequency: "2"
    },
    {
      description: "checks if the habit failed after updating",
      name: "read",
      type: "improvement",
      frequency: "7",
      habitFailed: true
    },
    {
      description: "checks if the habit succeded after updating",
      name: "read",
      type: "improvement",
      frequency: "1",
      habitSucceded: true
    }
  ].forEach(
    ({ description, name, type, frequency, habitFailed, habitSucceded }) => {
      it(description, () => {
        let state = habitsReducer(
          undefined,
          saveHabit(undefined, " read ", "hobby", "1")
        );
        state = habitsReducer(state, toggleDayHabit("y1w1", "read", 1));
        state = habitsReducer(state, saveHabit("read", name, type, frequency));
        expect(state.weeks).toEqual({
          y1w1: {
            [name.trim()]: {
              checked: [false, true, false, false, false, false, false],
              frequency,
              name: name.trim(),
              type,
              habitFailed: habitFailed ? true : false,
              habitSucceded: habitSucceded ? true : false
            }
          }
        });
      });
    }
  );
});

describe("habitsReducer - default state", () => {
  it("returns state when no recognized action is provided", () => {
    const initialState = { works: true };
    const state = habitsReducer(initialState, { type: "NOT_RECOGNIZED" });
    expect(state).toEqual(initialState);
  });
});
