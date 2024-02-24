import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectStorageService } from '../../infrastructure/object-storage/object-storage.service';
import { FileRepository } from '../../infrastructure/repositories/FIleRepository';

@Controller('users')
export class UsersController {
  constructor(
    private minioService: ObjectStorageService,
    private fileRepository: FileRepository,
  ) {}

  @Post('profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBookCover(@UploadedFile() file: Express.Multer.File) {
    const fileName = await this.minioService.uploadFile(file);
    await this.fileRepository.saveFile(file, fileName);
    return fileName;
  }
}
