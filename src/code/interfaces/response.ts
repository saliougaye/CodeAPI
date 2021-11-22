import { Snippet } from "../schemas/snippet";

export interface ResponseBase {
    data: Snippet[] | Snippet | any |undefined
    count: number | undefined
}

export interface ErrorBase {
    message: string
}