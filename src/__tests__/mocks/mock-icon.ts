import fs from "fs";
import path from "path";
import BinaryUtil from "@/utils/BinaryUtil";

const file = fs.readFileSync(
  path.join(__dirname, "../../../prisma/static-data/assets/add-icon.png"),
);
export const buffer = Buffer.from(file);
export const binaryUtil = new BinaryUtil(buffer);
const mockIcon = binaryUtil.pngBinaryToBase64();

export default mockIcon;
