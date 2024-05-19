import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interface/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  /***************** control 基本内容 ********************/
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

  // 路由参数
  // @Get(':id')
  // findAll(@Param('id') id: string): string {
  //   return id;
  // }
}
