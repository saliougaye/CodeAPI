import { DbFilter } from "../interfaces/db";

export function removeUndefinedFilters(filter: DbFilter) {
    Object.keys(filter).forEach(key => filter[key] === undefined ? delete filter[key] : {});

    return filter;
}