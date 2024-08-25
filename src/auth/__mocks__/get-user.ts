import { beforeEach, vi } from "vitest";
import { mockReset } from "vitest-mock-extended";

beforeEach(() => {
  mockReset(mockGetUser);
});

const mockGetUser = vi.fn();

export default mockGetUser;
