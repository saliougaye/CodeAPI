import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder();
  config.setTitle(process.env.API_NAME);
  config.setDescription(process.env.API_DESCRIPTION);
  config.setVersion(process.env.API_VERSION);
  config.addTag('code');
  const options = config.build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/docs', app, document);
  
  await app.listen(3000);
}
bootstrap();
