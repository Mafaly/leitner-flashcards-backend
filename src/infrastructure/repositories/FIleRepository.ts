import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../../domains/users/entities/file.entities';

export class FileRepository extends Repository<FileEntity> {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {
    super(
      fileRepository.target,
      fileRepository.manager,
      fileRepository.queryRunner,
    );
  }

  async saveFile(file: Express.Multer.File, storagePath: string) {
    const newFile = new FileEntity();
    newFile.name = file.originalname;
    newFile.mimeType = file.mimetype;
    newFile.size = file.size;
    newFile.storagePath = storagePath;
    return await this.fileRepository.save(newFile);
  }
}
