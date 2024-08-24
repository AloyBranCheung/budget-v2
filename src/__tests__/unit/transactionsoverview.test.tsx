import { beforeEach, afterEach, describe, it, vi, expect } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// mocks
import mockIcon from "../mocks/mock-icon";
import mockGetUser from "@/auth/__mocks__/get-user";
import mockUser from "../mocks/mock-user";
// test this
import TransactionsOverview from "@/containers/transactions-page/TransactionsOverview";
import { Tag } from "@prisma/client";

vi.mock("@/auth/get-user");

describe("test TransactionsOverview component", () => {
  beforeEach(() => {
    mockGetUser.mockReturnValue(mockUser);
    // shouldAdvanceTimeOption - https://github.com/testing-library/react-testing-library/issues/1198
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    cleanup();
  });

  it("should render TransactionOverview component", () => {
    const date = new Date(2024, 8, 1); // september first
    vi.setSystemTime(date);

    render(
      <TransactionsOverview
        categories={[
          { id: "1", name: "category1" },
          { id: "2", name: "category2" },
        ]}
        tags={
          [
            { id: "1", name: "test123" },
            { id: "2", name: "test234" },
            { id: "3", name: "test345" },
          ] as Tag[]
        }
        editIcon={mockIcon}
        trashIcon={mockIcon}
        closeIcon={mockIcon}
        addIcon={mockIcon}
      />
    );

    expect(screen.getByDisplayValue("2024-08-02")).toBeDefined();
    expect(screen.getByDisplayValue("2024-09-01")).toBeDefined();
    expect(screen.getByText("test123")).toBeDefined();
    expect(screen.getByText("Expense")).toBeDefined();
    expect(
      (screen.getByText("Last 30 days") as HTMLOptionElement).selected
    ).toBeTruthy();
    expect(
      (screen.getByText("Last 7 days") as HTMLOptionElement).selected
    ).toBeFalsy();
  });

  it("should switch date range and corresponding from/to dates", async () => {
    // when use faking timers set advanced timer- https://testing-library.com/docs/user-event/options/#advancetimers
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    const date = new Date(2024, 8, 1); // september first
    vi.setSystemTime(date);

    render(
      <TransactionsOverview
        categories={[
          { id: "1", name: "category1" },
          { id: "2", name: "category2" },
        ]}
        tags={
          [
            { id: "1", name: "test123" },
            { id: "2", name: "test234" },
            { id: "3", name: "test345" },
          ] as Tag[]
        }
        editIcon={mockIcon}
        trashIcon={mockIcon}
        closeIcon={mockIcon}
        addIcon={mockIcon}
      />
    );

    expect(
      (screen.getByTestId("Last 7 days") as HTMLOptionElement).selected
    ).toBeFalsy();
    expect(screen.queryByDisplayValue("2024-08-25")).toBeNull();

    await user.selectOptions(
      screen.getByTestId("Date Range"),
      screen.getByTestId("Last 7 days")
    );

    expect(
      (screen.getByTestId("Last 7 days") as HTMLOptionElement).selected
    ).toBeTruthy();
    expect(screen.getByDisplayValue("2024-08-25")).toBeDefined();
  });
});
