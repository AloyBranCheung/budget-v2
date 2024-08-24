import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(tz);

const formDataToObj = (formData: FormData) => {
    // type unknown throws build error 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: { [key: string]: any } = {}
    for (const [key, value] of formData) {
        if (key.startsWith('$')) continue
        if (!(key in obj)) {
            obj[key] = value
        } else {
            if (key in obj) {
                if (!Array.isArray(obj[key])) {
                    obj[key] = [obj[key], value]
                } else {
                    obj[key].push(value)
                }
            }
        }

    }

    // post process

    // sometimes default input value (uncontrolled component) sends '2024-08-01' or '2024-08-01T01:23' etc. with no offset/not in UTC format 
    if ('date' in obj && !(obj['date'].includes('z')) && '_clientTimezone' in obj) {
        obj['date'] = dayjs.tz(obj.date, obj._clientTimezone).toISOString(); // convert to UTc
        delete obj._clientTimezone
    }

    return obj
}

export default formDataToObj