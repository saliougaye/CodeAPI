import { Controller, Get, Param, Query } from "@nestjs/common";
import { CodeService } from "./code.service";
import { ApiDescription } from "./interfaces/api-description";
import { QueryParameters } from "./interfaces/query-paramater";
import { ResponseBase } from "./interfaces/response";

@Controller("code")
export class CodeController {

    constructor(
        private readonly codeService: CodeService
    ){}

    @Get()
    getDescription(): ApiDescription {
        return {
            message: "Hello World",
            version: "v1.0.0"
        }
    }

    @Get(":category")
    async getAllSnippets(
        @Param('category') category: string,
        @Query() query: QueryParameters
    ): Promise<ResponseBase> {

        try {

            const limit = query.limit || 100;
            const language = query.pl || undefined; 

            const snippets = await this.codeService.findAllSnippetInCategory(category, {
                limit,
                query: {
                    category,
                    language
                }
            });

            return {
                data: snippets,
                result: true,
                errors: undefined,
                count: snippets.length
            }
        } catch(e) {
            return {
                data: undefined,
                errors: e,
                result: false,
                count: undefined
            }       
        }
        
    }
    

}