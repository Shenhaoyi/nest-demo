import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './modules/cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { DownloadModule } from './modules/download/download.module';
import { PersonModule } from './modules/person/person.module';

@Module({
  imports: [CatsModule, DownloadModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/cats', method: RequestMethod.GET });
  }
}
