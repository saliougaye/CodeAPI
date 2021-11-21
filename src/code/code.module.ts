import { Module } from '@nestjs/common';
import { CodeController } from './code.controller';
import { CodeService } from './code.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Snippet, SnippetSchema } from './schemas/snippet';
@Module({
    imports: [MongooseModule.forFeature([ { name: Snippet.name, schema: SnippetSchema } ])],
    controllers: [CodeController],
    providers: [CodeService]
})
export class CodeModule {}
