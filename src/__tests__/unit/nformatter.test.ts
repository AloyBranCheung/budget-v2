import { describe, expect, it } from "vitest";
// test this
import nFormatter from "@/utils/format-number";

describe("format number e.g. 1000 becomes 1k", () => {
  it("should format 1100 to 1.1k", () => {
    expect(nFormatter(1100, 1)).toBe("1.1k");
  });

  it("should format 1000000 to 1M", () => {
    expect(nFormatter(1000000, 1)).toBe("1M");
  });

  it("should format 12 to 12", () => {
    expect(nFormatter(12, 1)).toBe("12");
  });

  // does not work with negative numbers
  it("should format -1234 to 0", () => {
    expect(nFormatter(-1234, 1)).toBe("0");
  });
});
