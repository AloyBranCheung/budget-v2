import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
// mocks
import mockPiechartData from "../mocks/mock-piechart-data";
import mockIcon from "../mocks/mock-icon";
// test this
import CategoryExpense from "@/containers/add-expense-page/CategoryExpense";
import { afterEach } from "node:test";

const expectTextPresent = (text: string) => {
  expect(screen.getByText(text)).not.toBeNull();
};

describe("test CategoryExpense component", () => {
  beforeEach(() => {
    cleanup();

    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    // hides resizecontainer from recharts warning
    window.global.console = {
      ...window.global.console,
      error: vi.fn(),
      warn: vi.fn(),
    };
  });

  afterEach(() => {
    cleanup();
  });

  it("should render within 0 to starting budget category total boundaries", () => {
    render(
      <CategoryExpense
        pieChartData={mockPiechartData}
        upRightArrowIconB64={mockIcon}
      />
    );

    expectTextPresent("$400.00 / $400.00");
    expectTextPresent("$369.00 / $600.00");
    expectTextPresent("$123.00 / $1000.00");
    expect(screen.queryAllByText("spent")).toHaveLength(3);
    expect(screen.queryByText("saved")).toBeNull();
  });

  it("should render saved", () => {
    const mockData = [...mockPiechartData];
    mockData[0].spent = -100;

    render(
      <CategoryExpense upRightArrowIconB64={mockIcon} pieChartData={mockData} />
    );

    expectTextPresent("$1100.00 / $1000.00");
    expectTextPresent("saved");
  });
});
