export interface DbFilter {}


export interface QueryDb extends DbFilter {
    category: string,
    language: string | undefined   
}

export interface QueryBase {
    query: QueryDb,
    limit: number
}

