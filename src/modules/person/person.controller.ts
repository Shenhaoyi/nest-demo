import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('person')
export class PersonController {
  @Get('find')
  query(@Query() query: { name: string; age: number }) {
    return `received: name=${query.name},age=${query.age}`;
  }

  @Get(':id')
  @Header('Content-Type', 'text/plain')
  urlParam(@Param('id') id: string) {
    return `received: id=${id}`;
  }

  @Post()
  body(@Body() person: CreatePersonDto) {
    return `received: ${JSON.stringify(person)}`;
  }

  @Post('upload')
  @UseInterceptors(
    // 任意数量的文件上传
    AnyFilesInterceptor({
      dest: 'public/uploads/',
    }),
  )
  uploadFile(
    @Body() person: CreatePersonDto,
    @UploadedFile() files: Array<Express.Multer.File>,
  ) {
    console.log(person);
    console.log(files); // TODO: 为啥这里读不出
  }
}
