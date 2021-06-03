export interface BaseModel {
    readonly id: string,
    is_active: boolean,
    readonly created_at: string,
    readonly updated_at: string,
    readonly deleted_at: string | null
}