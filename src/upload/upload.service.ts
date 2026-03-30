import { BadRequestException, Injectable } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { url } from 'inspector';
import { resolve } from 'path';
import { generateRandomSuffix } from 'src/common/utils/generate-random-suffix';

@Injectable()
export class UploadService {
    async handleUpload(file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException("Nenhum arquivo foi enviado");
        }

        const maxFileSize = 900 * 1024;

        if (file.size > maxFileSize) {
            throw new BadRequestException(`O arquivo excede o tamanho máximo permitido de ${maxFileSize / 1024} KB`);
        }

        const filType = await fileTypeFromBuffer(file.buffer);

        if (!filType || !['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(filType.mime)) {
            throw new BadRequestException('Arquivo inválido');
        }

        const today = new Date().toISOString().split('T')[0];
        const uploadPath = resolve(__dirname, '..', '..', 'uploads', today);

        if(!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
        }

        const uniqueSuffix = `${Date.now()}-${generateRandomSuffix()}}`;
        const fileExtension = filType.ext;
        const fileName = `${uniqueSuffix}.${fileExtension}`;
        const fileFullPath = resolve(uploadPath, fileName);

        writeFileSync(fileFullPath, file.buffer);

        return{
            url: `/uploads/${today}/${fileName}`
        }
    }
}
