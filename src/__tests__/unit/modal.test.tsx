import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
// mock
import mockIcon from "../mocks/mock-icon";
// test this
import Modal from "@/components/Modal";

describe("test Modal component", () => {
  beforeEach(() => {
    cleanup();
    // https://qiita.com/akameco/items/0edfdae02507204b24c8
    // https://stackoverflow.com/questions/43148351/how-to-spy-on-window-scrollto-in-jest
    window.scrollTo = vi.fn(() => ({
      value: vi.fn(),
      writable: true,
    }));
  });

  it("should render modal content", () => {
    render(
      <Modal
        isOpen={true}
        modalTitle={"test modal"}
        onClose={vi.fn()}
        closeIcon={mockIcon}
      >
        <div>helloworld</div>
      </Modal>
    );

    expect(screen.queryByText("helloworld")).not.toBeNull();
    expect(screen.queryByText("test modal")).not.toBeNull();
  });

  it("should not render modal content", () => {
    render(
      <Modal
        isOpen={false}
        modalTitle={"test modal"}
        onClose={vi.fn()}
        closeIcon={mockIcon}
      >
        <div>helloworld</div>
      </Modal>
    );

    expect(screen.queryByText("helloworld")).toBeNull();
    expect(screen.queryByText("test modal")).toBeNull();
  });
});
