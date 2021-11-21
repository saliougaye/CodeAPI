import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Snippet, SnippetDocumet } from "./schemas/snippet";
import { Model } from  'mongoose';
import { QueryParameters } from "./interfaces/query-paramater";
import { QueryBase } from "./interfaces/db";
import { removeUndefinedFilters } from "./util/removeUndefinedFilters";

@Injectable()
export class CodeService {

    constructor(
        @InjectModel(Snippet.name) private readonly snippetModel: Model<SnippetDocumet>
    ) {}

    async findAllSnippetInCategory(category: string, filters: QueryBase) : Promise<Snippet[]> {

        const { query, limit } = filters;

        const querySanitized = removeUndefinedFilters(query)

        const result = await this.snippetModel.find(
            querySanitized,
             '-_id'
            ).limit(limit).exec();

        return result;
    }
}