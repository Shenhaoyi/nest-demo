/* cats.controller.ts */

import { Controller, Get, Req, Post, HttpCode, Redirect, Param, Body, Res, HttpException, HttpStatus, Header } from '@nestjs/common';
import { Request, Response } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interface/cat.interface';
import * as fs from 'fs';

@Controller('cats')
export class CatsController {

  constructor(private catsService: CatsService) { }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  // @Post()
  // create(): string {
  //   return 'This action adds a new cat';
  // }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('test')
  @Header('Content-Type', 'application/octet-stream')
  async test(): Promise<any> {
    // 测试 返回内容不是用于下载的情况
    return {
      code: 199999,
      message: '文件过大，不支持下载',
    }
  }

  // @Get(':file')
  // async xxx(@Res() response: Response, @Req() request: Request, @Param() params): Promise<any> {
  //   const { file } = params;
  //   console.log('下载文件：', file);
  //   const filePath = `${process.cwd()}/${file}`;
  //   response.header('content-disposition', `attachment; filename = "${file}"`);
  //   response.download(filePath);
  // }

  @Get('download')
  // @Header('Transfer-Encoding', 'chunked')
  @Header('Content-Type', 'application/octet-stream')
  // @Header('content-disposition', 'attachment;filename=' + encodeURI('什么.png')) // 下载
  // @Header('content-disposition', 'inline') // 打开

  // @Header('filename', encodeURI('什么.png'))
  // @Header('Content-Type', 'video/mp4')
  // @Header('Content-Type', 'text/plain')
  // @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation') // ppt
  // @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') // word
  // @Header('Content-Type', 'image/png')
  // @Header('Content-Type', 'application/vnd.ms-excel')
  async download(@Res() response: Response, @Req() request: Request): Promise<any> {
    // console.log('request:', request);
    console.log('下载文件');
    // const filePath = `${process.cwd()}/pdf.pdf`;
    // const filePath = `${process.cwd()}/test.csv`;
    const filePath = `${process.cwd()}/image.png`;
    // const filePath = `${process.cwd()}/large.csv`;
    // const filePath = `${process.cwd()}/word.docx`;
    // const filePath = `${process.cwd()}/dot-git-slash.pptx`;
    // const filePath = `${process.cwd()}/radio.mp4`;
    // response.sendFile(filePath);
    // return 'download'

    response.download(filePath);
    // fs.createReadStream(filePath).pipe(response);
    // response.download(filePath, 'xx', (err) => {
    //   if (!err) {
    //     return;
    //   }
    //   console.log('error')
    //   throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    // })
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
