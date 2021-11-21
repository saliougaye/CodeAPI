import { Module } from '@nestjs/common';
import { CodeModule } from './code/code.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    CodeModule,
    MongooseModule.forRoot('mongodb://localhost:27017/codeapi')
  ]
})
export class AppModule {}