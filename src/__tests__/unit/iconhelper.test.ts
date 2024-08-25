import { describe, it, expect, vi } from "vitest";
import fs from "fs";
import path from "path";
import prisma from "@/libs/__mocks__/prisma";
// test this
import IconHelper from "@/utils/IconHelper";

vi.mock("@/libs/prisma");

describe("test IconHelper util class", () => {
  it("should return base64 string", async () => {
    const file = fs.readFileSync(
      path.join(__dirname, "../../../prisma/static-data/assets/add-icon.png"),
    );
    const buffer = Buffer.from(file);
    prisma.images.findFirst.mockResolvedValueOnce({
      bytes: buffer,
      createdAt: new Date(),
      id: "test-uuid",
      name: "add-icon.png",
      updatedAt: new Date(),
    });

    const iconHelper = new IconHelper("add-icon.png");
    const result = await iconHelper.getIcon64();

    expect(iconHelper.iconName).toBe("add-icon.png");
    expect(result).toBe(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACH0lEQVR4nO2ay0ocQRSGv1XGLBQFo+70OdSlKAFDXHp5hpBh3sLLQlEI2eYRkoyJbyDiWmdGV142oq694ZGCI8jQPd1TXTVd3fjDDw09030+6vTpOlUN7yqvhoAFYB2oAw3gFrhXm+NjPWd+8xUYJBBVgBVgD3gCpEub//wDlvVaPddHoAZcWgQf5wugCvT1CuIzcOoQoN0nwJxPADP0Wx4B2v1LR96pRoHDHkKI+gAYcQUxocMtObmlMWTSJy2jkrNPgTFbiL6c0kk6pJlVif4RQPDS5m2bEiuBejYthBm+ZgABS4xP0r40awEEKwn+nmY0LgIIVBJ8nvTgrwQQpKT0UieQPQ83nASmPFx3t1M/YTMVT/KrXF/3ERiIAlnwlAK+QASYjwLZKCDIWhRIvYAgv6NAWgUEaUSB3BQQ5CoK5D5jibVVltJ85xrEBGOradcgN2VJrWYBQY5LXX7XCwiyWuopymDBJo0PcZNGo/8ebjiVscRKjP/SQcueUsCHF8vS6n4gQdUAApUEf0uCeB2VEJZJJcatblYc5wIIWCL8DMzQpXYCCFzavImFKrpwLIF4P80DHqfhgLYVRsmoCY9tcBo3gXEcaSSnNNvXzSYvm6HPPYL46XvvfdZzqjVsSqytKrq0f+4Q4Ezf2Ll8AVHRVfG6rsV2G/yjzmIXs5RW1zK9wRddxvyj/fT1m49qzPGRtqer2hT1O4/iXYShFwEYOqh4OPqjAAAAAElFTkSuQmCC",
    );
  });
});
