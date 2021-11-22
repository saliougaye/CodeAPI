import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type SnippetDocumet = Snippet & Document;

@Schema()
export class Snippet {
    @Prop()
    @ApiProperty({ 
        example: '2b8bdcde-f30f-46f8-aba1-63197d49206e',
        description: 'Id of the Snippet'
    })
    searchId: string


    @Prop()
    @ApiProperty({ 
        example: 'bubblesort',
        description: 'Snippet Code Name'
    })
    name: string
    
    @Prop()
    @ApiProperty({ 
        example: 'sort',
        description: 'Snippet Code Category'
    })
    category: string

    @Prop()
    @ApiProperty({ 
        example: 'javascript',
        description: 'Programming Language of the Code Snippet'
    })
    language: string

    @Prop()
    @ApiProperty({ 
        example: 'function bubblesort(){...}',
        description: 'Snippet Code'
    })
    snippet: string


}


export const SnippetSchema = SchemaFactory.createForClass(Snippet);