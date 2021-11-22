import { Controller, Get, Param, Query, Logger } from "@nestjs/common";
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

    @Get("snippet/:id")
    async getSnippetCode(
        @Param('id') id
    ) {
        try {

            const snippet = await this.codeService.findSnippetWithId({
                query: {
                    searchId: id
                }
            });

            return {
                result: true,
                count: 1,
                errors: undefined,
                data: snippet,
            }

        } catch(e) {

            return {
                result: false,
                count: undefined,
                errors: e,
                data: undefined
            }
            
        }

    }

    @Get(":category")
    async getAllSnippetsInCategory(
        @Param('category') category: string,
        @Query() query: QueryParameters
    ): Promise<ResponseBase> {

        try {

            const limit = query.limit || 100;
            const language = query.pl || undefined; 

            const snippets = await this.codeService.findAllSnippetInCategory({
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


    @Get(":category/:snippet")
    async getSnippetCodes(
        @Param('category') category: string,
        @Param('snippet') snippet: string,
        @Query() query: QueryParameters
    ) : Promise<ResponseBase> {
        try {

            const limit = query.limit || 100;
            const language = query.pl || undefined; 

            const snippets = await this.codeService.findSnippet({
                limit,
                query: {
                    category,
                    language,
                    name: snippet
                }
            });

            return {
                result: true,
                count: snippets.length,
                errors: undefined,
                data: snippets,
            }
        } catch(e) {
            return {
                result: false,
                count: undefined,
                errors: e,
                data: undefined
            }       
        }
    }

    
    

}