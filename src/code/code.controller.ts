import { Controller, Get, Param, Query, Logger, HttpException, HttpStatus, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { CodeService } from "./code.service";
import { ApiDescription } from "./interfaces/api-description";
import { QueryParameters } from "./interfaces/query-paramater";
import { ResponseBase } from "./interfaces/response";

@Controller("code")
export class CodeController {

    constructor(
        private readonly codeService: CodeService
    ){}

    @Get("about")
    getDescription(): ApiDescription {

        return {
            name: process.env.API_NAME,
            description: process.env.API_DESCRIPTION,
            author: process.env.API_AUTHOR,
            version: process.env.API_VERSION
        }
    }

    @Get("snippet/:id")
    async getSnippetCode(
        @Param('id') id
    ) : Promise<ResponseBase> {
        try {
            const snippet = await this.codeService.findSnippetWithId({
                query: {
                    searchId: id
                }
            });

            if(!snippet) {
                throw new NotFoundException()
            }

            return {
                count: 1,
                data: snippet
            }

        } catch(e) {

            if (e instanceof NotFoundException) {
                throw e;
            }

            throw new InternalServerErrorException();
        }

    }

    @Get("search/:category")
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
                count: snippets.length
            }


        } catch(e) {
            throw new InternalServerErrorException();
        }
        
    }


    @Get("search/:category/:snippet")
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
                count: snippets.length,
                data: snippets,
            }
        } catch(e) {
            throw new InternalServerErrorException();
        }
    }

    
    

}