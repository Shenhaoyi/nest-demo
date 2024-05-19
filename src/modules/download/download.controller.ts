import { Controller, Header, Res, Get, Param } from '@nestjs/common';
import { Response } from 'express';

@Controller('download')
export class DownloadController {
  @Get('test')
  @Header('Content-Type', 'application/octet-stream')
  async test(): Promise<any> {
    // 返回内容不是用于下载的情况
    return {
      code: 199999,
      message: '文件过大，不支持下载',
    };
  }

  @Get('file/:file')
  xxx(@Res() response: Response, @Param() params: { file: string }): void {
    const { file } = params;
    console.log('下载文件：', file);
    const filePath = `${process.cwd()}/${file}`;
    response.header('content-disposition', `attachment; filename = "${file}"`);
    response.download(filePath);
  }

  @Get()
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
  download(@Res() response: Response): void {
    console.log('下载文件');
    const pathPrefix = `${process.cwd()}/public`;
    // const filePath = `${pathPrefix}/pdf.pdf`;
    // const filePath = `${pathPrefix}/test.csv`;
    const filePath = `${pathPrefix}/image.png`;
    // const filePath = `${pathPrefix}/large.csv`;
    // const filePath = `${pathPrefix}/word.docx`;
    // const filePath = `${pathPrefix}/dot-git-slash.pptx`;
    // const filePath = `${pathPrefix}/radio.mp4`;

    response.download(filePath);
  }
}
