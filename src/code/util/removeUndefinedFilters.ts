import { DbFilter } from "../interfaces/db";

export function removeUndefinedFilters(filter: any) {
    Object.keys(filter).forEach(key => filter[key] === undefined ? delete filter[key] : {});

    return filter;
}