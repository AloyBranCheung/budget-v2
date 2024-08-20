import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { TransactionType } from "@prisma/client";
// mocks
import mockIcon from "../mocks/mock-icon";
import mockUseAxios from "@/hooks/__mocks__/useAxios";
// test this
import TodaysExpenses from "@/containers/home-page/TodaysExpenses";

vi.mock("@/hooks/useAxios");
vi.mock("react-dom", () => ({
  useFormStatus: vi.fn().mockReturnValue({ pending: false }),
}));

// mock next/navigation
// https://stackoverflow.com/questions/76858797/error-invariant-expected-app-router-to-be-mounted-why-this-happened-when-using
vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      // get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

describe("test TodaysExpenses component", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should should loading...", () => {
    mockUseAxios.mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    });
    render(<TodaysExpenses icons={{ borderAllIconB64: mockIcon }} />);

    expect(screen.getByText("Loading...")).toBeDefined();
  });

  it("should render -amount for expenses and +amount for income", () => {
    mockUseAxios.mockReturnValue({
      data: new Array(2).fill(0).map((_, i) => ({
        id: `${Math.random()}-${i}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: `name-${i}`,
        type: i % 2 === 0 ? TransactionType.Expense : TransactionType.Income,
        amount: 100,
        date: new Date(),
        notes: null,
        userId: "",
        paycheckId: "",
        categoryId: "",
      })),
      isLoading: false,
      isError: false,
    });

    render(<TodaysExpenses icons={{ borderAllIconB64: mockIcon }} />);

    expect(screen.getByText("name-0")).toBeDefined();
    expect(screen.getByText("name-1")).toBeDefined();
    expect(screen.getByText("+$100")).toBeDefined();
    expect(screen.getByText("-$100")).toBeDefined();
  });

  it("should render get started button", () => {
    mockUseAxios.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    render(<TodaysExpenses icons={{ borderAllIconB64: mockIcon }} />);

    expect(screen.getByText("Get Started"));
  });

  it("should render error message", () => {
    mockUseAxios.mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    });

    render(<TodaysExpenses icons={{ borderAllIconB64: mockIcon }} />);

    expect(
      screen.getByText("Error fetching data, please try again later.")
    ).toBeDefined();
  });
});
