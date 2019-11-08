import { getCurrentWeek, getTodayIndex, isToday } from "./dateUtils";

describe("dateUtils component", () => {
  const RealDate = Date;

  beforeEach(() => {
    global.Date.prototype.getFullYear = () => 2019;
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  describe("getCurrentWeek", () => {
    it("used current date if one is not provided", () => {
      expect(getCurrentWeek()).toContain("y2019");
    });

    it("calculates the week correctly", () => {
      expect(getCurrentWeek(new Date("2019-01-12T12:34:56z"))).toBe("y2019w2");
    });

    it("considers sunday as the last day of the week", () => {
      expect(getCurrentWeek(new Date("2019-01-13T23:54:56z"))).toBe("y2019w2");
      expect(getCurrentWeek(new Date("2019-01-14T00:00:00z"))).toBe("y2019w3");
    });
  });

  describe("getTodayIndex", () => {
    it("returns the today index", () => {
      global.Date.prototype.getDay = () => 3;
      expect(getTodayIndex()).toBe(2);
    });

    it("monday is considered 0 and sunday 6", () => {
      global.Date.prototype.getDay = () => 0;
      expect(getTodayIndex()).toBe(6);

      global.Date.prototype.getDay = () => 1;
      expect(getTodayIndex()).toBe(0);
    });
  });
});
