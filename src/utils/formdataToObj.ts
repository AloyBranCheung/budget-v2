const formDataToObj = (formData: FormData) => {
    const obj: { [key: string]: unknown } = {}
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