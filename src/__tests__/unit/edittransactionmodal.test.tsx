import { describe, it, vi } from "vitest";
import { defaultGenericFormState, GenericFormState } from "@/types/formstate";
import { render, screen } from "@testing-library/react";
// mocks
import mockIcon from "../mocks/mock-icon";
// test this
import EditTransactionModal from "@/containers/transactions-page/EditTransactionModal";

vi.mock("react-dom", () => ({
  useFormState: vi.fn().mockReturnValue([defaultGenericFormState, vi.fn()]),
}));

describe("test EditTransactionModal", () => {
  it("should preload fields with default values", () => {
    render(
      <EditTransactionModal
        isOpen={false}
        onClose={vi.fn()}
        closeIcon={mockIcon}
        transaction={undefined}
        categories={[]}
        tags={[]}
        addIcon={""}
        onSuccess={function (state: GenericFormState): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    screen.debug();
  });
});
