import { describe, expect, it } from 'vitest';
import fs from 'fs'
import path from 'path'
// test this
import BinaryUtil from '@/utils/BinaryUtil';


describe("test BinaryUtil", () => {
    it("should return data:image/png;base64 prepended", () => {
        const file = fs.readFileSync(path.join(__dirname, '../../../prisma/static-data/assets/add-icon.png'))
        const result = new BinaryUtil(Buffer.from(file)).pngBinaryToBase64()

        expect(result).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACH0lEQVR4nO2ay0ocQRSGv1XGLBQFo+70OdSlKAFDXHp5hpBh3sLLQlEI2eYRkoyJbyDiWmdGV142oq694ZGCI8jQPd1TXTVd3fjDDw09030+6vTpOlUN7yqvhoAFYB2oAw3gFrhXm+NjPWd+8xUYJBBVgBVgD3gCpEub//wDlvVaPddHoAZcWgQf5wugCvT1CuIzcOoQoN0nwJxPADP0Wx4B2v1LR96pRoHDHkKI+gAYcQUxocMtObmlMWTSJy2jkrNPgTFbiL6c0kk6pJlVif4RQPDS5m2bEiuBejYthBm+ZgABS4xP0r40awEEKwn+nmY0LgIIVBJ8nvTgrwQQpKT0UieQPQ83nASmPFx3t1M/YTMVT/KrXF/3ERiIAlnwlAK+QASYjwLZKCDIWhRIvYAgv6NAWgUEaUSB3BQQ5CoK5D5jibVVltJ85xrEBGOradcgN2VJrWYBQY5LXX7XCwiyWuopymDBJo0PcZNGo/8ebjiVscRKjP/SQcueUsCHF8vS6n4gQdUAApUEf0uCeB2VEJZJJcatblYc5wIIWCL8DMzQpXYCCFzavImFKrpwLIF4P80DHqfhgLYVRsmoCY9tcBo3gXEcaSSnNNvXzSYvm6HPPYL46XvvfdZzqjVsSqytKrq0f+4Q4Ezf2Ll8AVHRVfG6rsV2G/yjzmIXs5RW1zK9wRddxvyj/fT1m49qzPGRtqer2hT1O4/iXYShFwEYOqh4OPqjAAAAAElFTkSuQmCC')
    })
})