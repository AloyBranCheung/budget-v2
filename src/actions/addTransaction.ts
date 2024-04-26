'use server'
import formDataToObj from "@/utils/formdataToObj";
import util from 'util'

const addTransaction = async (_currState: unknown, formData: FormData | null) => {
    if (!formData) return { error: "No data provided." }

    const data = formDataToObj(formData);
}

export default addTransaction