import { ZodError } from "zod"
const joinZodErrmsg = (errorsArr: ZodError) => {
    let msg = ''
    for (const err of errorsArr.issues) {
        if (msg.length > 0) {
            msg += ', '
        }
        msg += `${err.path.join(', ')}: ${err.message}`
    }
    return msg
}

export default joinZodErrmsg