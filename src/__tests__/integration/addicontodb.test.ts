import { describe, expect, it, afterEach } from "vitest";
import prisma from "./utils/prisma";

// test this
import addIconToDb from "../../../prisma/utils/add-icon-to-db";

describe("test adding icon to db util fn", () => {
  afterEach(async () => {
    const image = await prisma.images.findFirst({
      where: { name: "test-icon.png" },
    });
    if (!image) throw new Error("Failed to cleanup, image not found.");
    await prisma.images.delete({ where: { id: image.id } });
  });

  it("should have already migrated border-all.png with no tag", async () => {
    await addIconToDb("test-icon.png"); // to pass the afterEach

    const filename = "border-all.png";
    const borderAllPng = await prisma.images.findFirst({
      where: { name: filename },
      include: { tag: true },
    });

    expect(borderAllPng).not.toBeNull();
    expect(borderAllPng?.name).toBe(filename);
    expect(borderAllPng?.tag).toBeNull();
  });

  it("should add icon to db", async () => {
    const filename = "test-icon.png";
    await addIconToDb(filename);

    const icon = await prisma.images.findFirst({
      where: {
        name: filename,
      },
    });

    expect(icon).not.toBeNull();
    expect(icon?.name).toBe(filename);
  });

  it("should add icon and connect to a tag", async () => {
    const filename = "test-icon.png";
    const tagName = "Housing";
    await addIconToDb(filename, { connectToTag: true, tagName });

    const tag = await prisma.tag.findFirst({
      where: { name: tagName },
      include: { image: true },
    });

    expect(tag).not.toBeNull();
    expect(tag?.name).toBe(tagName);
    expect(tag?.image?.name).toBe(filename);
  });
});
