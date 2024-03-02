import {
  Controller,
  Get,
  NotFoundException,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectStorageService } from '../../infrastructure/object-storage/object-storage.service';
import { FileRepository } from '../../infrastructure/repositories/FIleRepository';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private minioService: ObjectStorageService,
    private fileRepository: FileRepository,
  ) {}

  @Post('profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(@UploadedFile() file: Express.Multer.File) {
    const fileName = await this.minioService.uploadFile(file);
    await this.fileRepository.saveFile(file, fileName);
    return fileName;
  }

  @Get('profile-picture')
  async getLatestProfilePicture(@Res({ passthrough: true }) res: Response) {
    const fileName = await this.fileRepository.getLastUploadedFile();
    if (!fileName) {
      throw new NotFoundException('No profile picture found');
    }
    const file = await this.minioService.getFile(fileName);
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });

    return new StreamableFile(file);
  }
}
