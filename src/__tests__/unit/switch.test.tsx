// extend vitest expect
// https://github.com/testing-library/jest-dom/issues/439
// import * as matchers from "@testing-library/jest-dom/matchers";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
// test this
import Switch from "@/components/Switch";

// expect.extend(matchers);

const toHaveClass = (className: string, element: HTMLElement) =>
  element.className.split(" ").includes(className);

describe("test Switch UI component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render switch off", () => {
    render(<Switch isOn={false} onChange={vi.fn()} />);
    const switchElement = screen.getByTestId("switch-ui");
    expect(toHaveClass("bg-secondary", switchElement)).toBeTruthy();
  });

  it("should render switch on", () => {
    render(<Switch isOn={true} onChange={vi.fn()} />);
    const switchElement = screen.getByTestId("switch-ui");
    expect(toHaveClass("bg-green-200", switchElement)).toBeTruthy();
  });
});
