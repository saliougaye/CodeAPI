import { Snippet } from "../schemas/snippet";

export interface ResponseBase {
    result: boolean,
    data: Snippet[] | Snippet | undefined,
    errors: ErrorBase | any | undefined,
    count: number | undefined
}

export interface ErrorBase {
    message: string
}