import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
// test this
import OverviewCard from "@/containers/home-page/OverviewCard";
import mockIcon from "../mocks/mock-icon";

// animation not finishing and waitFor does not work
vi.mock("react-countup", () => ({
  default: () => <div>$ 1,000.00</div>,
}));

describe("test OverviewCard component", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render balance", async () => {
    const date = new Date("2024-04-23");
    vi.useFakeTimers();
    vi.setSystemTime(date);
    render(
      <OverviewCard
        totalRemaining={1000}
        closeIconB64={mockIcon}
        paycheckDate={date}
      />
    );

    expect(screen.queryByText("$ 1,000.00")).not.toBeNull();
    expect(screen.queryByText("Since Monday, April 22, 2024")).not.toBeNull();
  });
});
