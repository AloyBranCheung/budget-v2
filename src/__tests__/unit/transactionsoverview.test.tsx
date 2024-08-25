import { beforeEach, afterEach, describe, it, vi, expect } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
// mocks
import mockIcon from "../mocks/mock-icon";
import mockGetUser from "@/auth/__mocks__/get-user";
import mockUser from "../mocks/mock-user";
import mockUseAxios from "@/hooks/__mocks__/useAxios";

// test this
import TransactionsOverview from "@/containers/transactions-page/TransactionsOverview";
import { Tag } from "@prisma/client";

vi.mock("@/auth/get-user");
vi.mock("@/hooks/useAxios");
vi.mock("next/navigation", () => ({
  // useSearchParams: vi.fn(() => ({ get: vi.fn().mockReturnValue(JSON.stringify({ fromDate: new Date(2023, 1, 1), isToday: true })) })),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  useRouter: vi.fn(),
}));

describe("test TransactionsOverview component", () => {
  beforeEach(() => {
    mockGetUser.mockReturnValue(mockUser);
    // shouldAdvanceTimeOption - https://github.com/testing-library/react-testing-library/issues/1198
    vi.useFakeTimers({ shouldAdvanceTime: true });

    mockUseAxios.mockReturnValue({ data: [], isLoading: false });
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
      />,
    );

    expect(screen.getByDisplayValue("2024-08-02")).toBeDefined();
    expect(screen.getByDisplayValue("2024-09-01")).toBeDefined();
    expect(screen.getByText("test123")).toBeDefined();
    expect(screen.getByText("Expense")).toBeDefined();
    expect(
      (screen.getByText("Last 30 days") as HTMLOptionElement).selected,
    ).toBeTruthy();
    expect(
      (screen.getByText("Last 7 days") as HTMLOptionElement).selected,
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
      />,
    );

    expect(
      (screen.getByTestId("Last 7 days") as HTMLOptionElement).selected,
    ).toBeFalsy();
    expect(screen.queryByDisplayValue("2024-08-25")).toBeNull();

    await user.selectOptions(
      screen.getByTestId("Date Range"),
      screen.getByTestId("Last 7 days"),
    );

    expect(
      (screen.getByTestId("Last 7 days") as HTMLOptionElement).selected,
    ).toBeTruthy();
    expect(screen.getByDisplayValue("2024-08-25")).toBeDefined();
    expect(screen.queryByDisplayValue("Custom")).toBeNull();
  });

  it("should show 'Custom' in date range selector if fromDate and toDate do not fall in the date range selector values", async () => {
    const mockUseSearchParams = vi.mocked(useSearchParams);
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set(
      "jsonData",
      JSON.stringify({ fromDate: new Date(2023, 1, 1), isToday: true }),
    );
    mockUseSearchParams.mockReturnValueOnce(
      urlSearchParams as ReadonlyURLSearchParams,
    );

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
      />,
    );

    expect(screen.queryByDisplayValue("Custom")).not.toBeNull();
  });
});
