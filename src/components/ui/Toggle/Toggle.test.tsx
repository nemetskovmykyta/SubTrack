import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Toggle } from "./Toggle";

describe("Toggle component", () => {
  it("renders with correct aria attributes", () => {
    render(<Toggle checked={true} onChange={() => {}} label="Auto-convert foreign currencies" />);
    const toggle = screen.getByRole("switch", {
      name: /auto-convert foreign currencies/i,
    });
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  it("calls onChange when clicked", () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} onChange={handleChange} label="Email payment reminders" />);
    const toggle = screen.getByRole("switch", {
      name: /email payment reminders/i,
    });
    fireEvent.click(toggle);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
