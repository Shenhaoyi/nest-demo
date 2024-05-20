import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(path.join(process.cwd(), 'public'), {
    prefix: '/public',
  });
  await app.listen(3000);
  console.log('Server is running at http://localhost:3000/');
}
bootstrap();
