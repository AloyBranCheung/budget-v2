import { describe, expect, it } from "vitest";
import prisma from "./utils/prisma";

// test this
import addIconToDb from "../../../prisma/utils/add-icon-to-db";

describe('test adding icon to db util fn', () => {
    it("should add icon to db", async () => {
        const filename = 'test-icon.png'
        await addIconToDb(filename)

        const icon = await prisma.images.findFirst({
            where: {
                name: filename
            }
        })

        expect(icon).not.toBeNull()
        expect(icon?.name).toBe(filename)
    })
})