/* cats.controller.ts */

import { Controller, Get, Req, Post, HttpCode, Redirect, Param } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }
  // 0 最简单情况
  // @Get()
  // findAll(): string {
  //   return 'This action adds a new cat';
  // }

  // 1 修改响应状态码，默认为 200，post 默认为 201
  // @Get()
  // @HttpCode(404) // 修改响应的状态码
  // findAll(@Req() request: Request): string {
  //   return String(request)
  // }

  // 2 返回重定向对象，会覆盖装饰器中内容=》作用是可以动态重定向 
  // @Get()
  // @Redirect('https://nestjs.com', 301) // 重定向
  // findAll(@Req() request: Request) {
  //   return {
  //     url: 'https://baidu.com',
  //     statusCode: 301
  //   }
  // }
  
  @Get(':id')
  findAll(@Param('id') id: string): string {
    return id;
  }
}
