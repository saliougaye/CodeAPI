export interface ResponseBase {
    result: boolean,
    data: any[] | undefined,
    errors: ErrorBase | any | undefined,
    count: number | undefined
}

export interface ErrorBase {
    message: string
}