import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
// mocks
import mockIcon from "../mocks/mock-icon";
// test this
import WelcomeText from "@/containers/home-page/WelcomeText";

vi.mock("next/navigation");

describe("test WelcomeText component", () => {
  it("should render username", () => {
    render(<WelcomeText profileIconB64={mockIcon} name="test name" />);
    expect(screen.queryByText("test name")).not.toBeNull();
  });
});
