export interface GenericFormState {
    status: "success" | "error" | null,
    message: string | null,
    error: string | string[] | null
}