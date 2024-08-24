import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { defaultGenericFormState, GenericFormState } from "@/types/formstate";
import { render, screen } from "@testing-library/react";
// mocks
import mockIcon from "../mocks/mock-icon";
import mockTransactionOverviewTransaction from "../mocks/mock-transaction";
// test this
import EditTransactionModal from "@/containers/transactions-page/EditTransactionModal";

vi.mock("react-dom", () => ({
  useFormState: vi.fn().mockReturnValue([defaultGenericFormState, 'vi.fn()']),
  useFormStatus: vi.fn().mockReturnValue({ pending: false })
}));

describe("test EditTransactionModal", () => {
  beforeAll(() => {
    window.scrollTo = vi.fn(() => ({
      value: vi.fn(),
      writable: true,
    }));
  })

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers();
  })

  it("should preload fields with default values", () => {
    const date = new Date(2024, 8, 1, 1)
    vi.setSystemTime(date);

    render(
      <EditTransactionModal
        isOpen={true}
        onClose={vi.fn()}
        closeIcon={mockIcon}
        transaction={mockTransactionOverviewTransaction(date)}
        categories={[{ id: '1', name: '1' }]}
        tags={[{
          'description': "none", createdAt: new Date(), id: '4', name: 'test-tag', updatedAt: new Date(), userId: '123'
        }]}
        addIcon={mockIcon}
        onSuccess={vi.fn()}
      />
    );

    expect((screen.getByLabelText('Date') as HTMLInputElement).value).toBe('2024-09-01T01:00')
    screen.debug();
  });
});
