'use server'
import formDataToObj from "@/utils/formdataToObj";

const addTransaction = async (_currState: unknown, formData: FormData | null) => {
    if (!formData) return { error: "No data provided." }

    const data = formDataToObj(formData);

    console.log(data)
    // revalidate

    // redirect 
}

export default addTransaction