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

  @Get(':file')
  xxx(@Res() response: Response, @Param() params: { file: string }): void {
    const { file } = params;
    console.log('下载文件：', file);
    const filePath = `${process.cwd()}/${file}`;
    response.header('content-disposition', `attachment; filename = "${file}"`);
    response.download(filePath);
  }

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
  download(@Res() response: Response): void {
    console.log('下载文件');
    // const filePath = `${process.cwd()}/pdf.pdf`;
    // const filePath = `${process.cwd()}/test.csv`;
    const filePath = `${process.cwd()}/image.png`;
    // const filePath = `${process.cwd()}/large.csv`;
    // const filePath = `${process.cwd()}/word.docx`;
    // const filePath = `${process.cwd()}/dot-git-slash.pptx`;
    // const filePath = `${process.cwd()}/radio.mp4`;

    response.download(filePath);
  }
}
