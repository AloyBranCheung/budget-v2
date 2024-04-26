import prisma from "@/libs/prisma";
import BinaryUtil from "./BinaryUtil";

export default class IconHelper {
    iconName: string

    public constructor(iconName: string) {
        this.iconName = iconName
    }


    public async getIcon64() {
        const icon = await prisma.images.findFirst({
            where: {
                name: this.iconName
            }
        })
        if (!icon) {
            console.error(`${this.iconName} not found.`)
            return null
        }

        return new BinaryUtil(icon.bytes).pngBinaryToBase64()
    }
}