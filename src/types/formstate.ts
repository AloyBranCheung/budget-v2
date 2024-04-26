export interface GenericFormState {
    status: "success" | "error" | null,
    message: string | null,
    error: string | string[] | null
}

export const defaultGenericFormState: GenericFormState = {
    status: null,
    message: null,
    error: null
}