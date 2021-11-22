import { Controller, Get, Param, Query, HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CodeService } from './code.service';
import { ApiDescription } from './interfaces/api-description';
import { QueryParameters } from './interfaces/query-paramater';
import { ResponseBase } from './interfaces/response';

@ApiTags('code')
@Controller('code')
export class CodeController {

    constructor(
        private readonly codeService: CodeService
    ){}
    

    @Get('about')
    @ApiOperation({ summary: 'Get Information of the API' })
    @ApiOkResponse({ description: 'Return the information of the API' })
    getDescription(): ApiDescription {

        return {
            name: process.env.API_NAME,
            description: process.env.API_DESCRIPTION,
            author: process.env.API_AUTHOR,
            version: process.env.API_VERSION
        }
    }

    @Get('snippet/:id')
    @ApiOperation({ summary: 'Get a snippet code with specific id' })
    @ApiOkResponse({ description: 'Return the specific snippet code' })
    @ApiNotFoundResponse({ description: 'Return 404 Status Code if the snippet with the id does not exist' })
    @ApiInternalServerErrorResponse({ description: 'Return 500 Status Code if have Server Error' })
    async getSnippetCode(
        @Param('id') id: string
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

    @Get('search/:category')
    @ApiOperation({ summary: 'Get All Snippet Code of a category' })
    @ApiOkResponse({ description: 'Return an array with all Snippet Code in the category, e.g sort as sorting algorithm snippet codes (default first 100, if pass limit as query param can be major)' })
    @ApiInternalServerErrorResponse({ description: 'Return 500 Status Code if have Server Error' })
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


    @Get('search/:category/:snippet')
    @ApiOperation({ summary: 'Get a single snippet code in all programming language' })
    @ApiOkResponse({ description: 'Return all the snippet codes with the specified name in a specific category' })
    @ApiInternalServerErrorResponse({ description: 'Return 500 Status Code if have Server Error' })
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