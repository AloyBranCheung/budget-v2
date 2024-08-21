import { beforeEach, vi } from "vitest";
import { mockReset } from "vitest-mock-extended";

beforeEach(() => {
  mockReset(mockUseAxios);
});

const mockUseAxios = vi.fn();

export default mockUseAxios;
