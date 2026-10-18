import { describe, it, expect } from "vitest";
import { generateCalendarDays, WEEKDAY_LABELS, MONTH_LABELS } from "./calendar";

describe("calendar utils", () => {
  it("WEEKDAY_LABELS has 7 days starting with Monday", () => {
    expect(WEEKDAY_LABELS).toHaveLength(7);
    expect(WEEKDAY_LABELS[0]).toBe("Mon");
    expect(WEEKDAY_LABELS[6]).toBe("Sun");
  });

  it("MONTH_LABELS has 12 months", () => {
    expect(MONTH_LABELS).toHaveLength(12);
    expect(MONTH_LABELS[0]).toBe("January");
    expect(MONTH_LABELS[11]).toBe("December");
  });

  it("generateCalendarDays returns 35 grid cells", () => {
    const days = generateCalendarDays(2026, 9); // October 2026
    expect(days).toHaveLength(35);
    expect(days.some((d) => d.isCurrentMonth && d.day === 1)).toBe(true);
  });
});
