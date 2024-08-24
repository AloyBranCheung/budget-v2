import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
// mock
import mockIcon from "../mocks/mock-icon";
// test this
import OverviewCard from "@/containers/home-page/OverviewCard";

// animation not finishing and waitFor does not work
vi.mock("react-countup", () => ({
  default: () => <div>$ 1,000.00</div>,
}));


describe("test OverviewCard component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  })
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render balance", async () => {
    const date = new Date("2024-04-23");
    vi.setSystemTime(date);

    render(
      <OverviewCard
        totalRemaining={1000}
        closeIconB64={mockIcon}
        paycheckDate={date}
      />
    );

    expect(screen.queryByText("$ 1,000.00")).not.toBeNull();

    // if there is an error here make sure to check that the TZ=UTC env is set
    try {
      expect(screen.queryByText("Since Tuesday, April 23, 2024")).not.toBeNull();
    } catch (error) {
      screen.debug()
      throw new Error(error as string)
    }
  });
}); 
