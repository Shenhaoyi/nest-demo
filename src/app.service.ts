import { Injectable } from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class AppService {
  @log // 为什么没有打印出来
  getHello(): string {
    return 'Hello World!';
  }
}
