import { Injectable } from '@nestjs/common';
import { Client } from 'minio';
import * as process from 'process';

@Injectable()
export class ObjectStorageService {
  private minioClient: Client;
  private readonly bucketName: string;

  constructor() {
    this.minioClient = new Client({
      endPoint: process.env.OBJECT_STORAGE_ENDPOINT,
      port: Number(process.env.OBJECT_STORAGE_PORT),
      useSSL: false,
      accessKey: process.env.OBJECT_STORAGE_ACCESS_KEY,
      secretKey: process.env.OBJECT_STORAGE_SECRET_KEY,
      region: process.env.OBJECT_STORAGE_REGION,
    });
    this.bucketName = process.env.OBJECT_STORAGE_BUCKET;
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file.mimetype.includes('image')) {
      throw new Error('Invalid file type');
    }

    if (file.size > Number(process.env.MAX_FILE_SIZE)) {
      throw new Error('File too large');
    }

    const fileName = `${Date.now()}-profile-picture-${file.originalname}`;

    await this.minioClient.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.size,
    );

    return fileName;
  }
}
