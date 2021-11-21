import { Controller, Get, Param } from "@nestjs/common";
import { CodeService } from "./code.service";
import { ApiDescription } from "./interfaces/api-description";
import { ResponseBase } from "./interfaces/response";
import { Snippet } from "./schemas/snippet";

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
        @Param('category') category: string
    ): Promise<ResponseBase> {

        try {
            const snippets = await this.codeService.findAllSnippetInCategory(category);

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