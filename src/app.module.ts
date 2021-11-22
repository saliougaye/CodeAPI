import { Module } from '@nestjs/common';
import { CodeModule } from './code/code.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION),
    CodeModule,
    
  ]
})
export class AppModule {}