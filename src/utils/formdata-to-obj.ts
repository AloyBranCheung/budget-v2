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
    return obj
}

export default formDataToObj