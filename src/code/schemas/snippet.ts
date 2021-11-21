import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SnippetDocumet = Snippet & Document;

@Schema()
export class Snippet {
    @Prop()
    searchId: string

    @Prop()
    name: string
    
    @Prop()
    category: string

    @Prop()
    language: string

    @Prop()
    snippet: string


}


export const SnippetSchema = SchemaFactory.createForClass(Snippet);