import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectStorageService } from '../../infrastructure/object-storage/object-storage.service';

@Controller('users')
export class UsersController {
  constructor(private minioService: ObjectStorageService) {}

  @Post('profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBookCover(@UploadedFile() file: Express.Multer.File) {
    const fileName = await this.minioService.uploadFile(file);
    console.log(fileName);
    return fileName;
  }
}
