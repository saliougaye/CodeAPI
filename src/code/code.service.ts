import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Snippet, SnippetDocumet } from "./schemas/snippet";
import { Model } from  'mongoose';
import { QueryParamCategory, QueryParamSingleSnippet, QueryParamSnippet } from "./interfaces/db";
import { removeUndefinedFilters } from "./util/removeUndefinedFilters";

@Injectable()
export class CodeService {

    constructor(
        @InjectModel(Snippet.name) private readonly snippetModel: Model<SnippetDocumet>
    ) {}

    async findAllSnippetInCategory(filters: QueryParamCategory) : Promise<Snippet[]> {

        const { query, limit } = filters;

        const querySanitized = removeUndefinedFilters(query);

        const result = await this.snippetModel.find(
            querySanitized,
             '-_id'
            ).limit(limit).exec();

        return result;
    }


    async findSnippet(filters: QueryParamSnippet) : Promise<Snippet[]> {
        const { query, limit } = filters;

        const querySanitized = removeUndefinedFilters(query);

        const result = await this.snippetModel.find(
            querySanitized,
             '-_id'
            ).limit(limit).exec();

        return result;
    }


    async findSnippetWithId(filters: QueryParamSingleSnippet) : Promise<Snippet> {
        const { query } = filters;

        const result = await this.snippetModel.find(
            query,
            '-_id'
        ).exec();

        return result[0];
    }
}