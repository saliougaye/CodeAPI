import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Snippet, SnippetDocumet } from "./schemas/snippet";
import { Model } from  'mongoose';

@Injectable()
export class CodeService {

    constructor(
        @InjectModel(Snippet.name) private readonly snippetModel: Model<SnippetDocumet>
    ) {}

    async findAllSnippetInCategory(category: string) : Promise<Snippet[]> {

        const result = await this.snippetModel.find({
            category: category
        }, '-_id').exec();

        return result;
    }
}