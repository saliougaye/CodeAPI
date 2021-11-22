export interface DbFilter {
    limit: number
}


export interface QueryParamCategory extends DbFilter {
    query: {
        category: string,
        language: string | undefined   
    }
}

export interface QueryParamSnippet extends DbFilter {
    query: {
        category: string,
        name: string,
        language: string | undefined   
    }
}
