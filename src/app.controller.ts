import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 语法糖
  // private readonly appService: AppService;
  // constructor(_appService: AppService) {
  //   this.appService = _appService;
  // }
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
