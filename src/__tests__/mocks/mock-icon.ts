import fs from 'fs';
import path from 'path';
import BinaryUtil from '@/utils/BinaryUtil';

const file = fs.readFileSync(path.join(__dirname, '../../../prisma/static-data/assets/add-icon.png'))
const buffer = Buffer.from(file);
const mockIcon = new BinaryUtil(buffer).pngBinaryToBase64()

export default mockIcon