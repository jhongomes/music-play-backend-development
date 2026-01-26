import { BadRequestException } from '@nestjs/common';
import Busboy from 'busboy';
import { Request } from 'express';
import { PassThrough } from 'stream';

interface ProgressPayload {
  uploadedBytes: number;
  totalSize: number;
  percent: number;
}

export function handleMultipartStream(req: Request, onProgress?: (payload: ProgressPayload) => void): Promise<{
  stream: PassThrough;
  filename: string;
  mimetype: string;
}> {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: req.headers });
    const passThrough = new PassThrough();

    const totalSize = Number(req.headers['content-length']) || 0;
    let uploadedBytes = 0;
    let resolved = false;

    if (onProgress && totalSize > 0) {
      passThrough.on('data', chunk => {
        uploadedBytes += chunk.length;

        const percent = Math.floor(
          (uploadedBytes / totalSize) * 100,
        );

        onProgress({
          uploadedBytes,
          totalSize,
          percent,
        });
      });
    }

    busboy.on('file', (_field, file, info) => {
      const { filename, mimeType } = info;
      const kind = (req as any).uploadKind;

      const rules = {
        audio: ['audio/mpeg', 'audio/mp3', 'audio/mp4'],
        cover: ['image/jpeg', 'image/png'],
      };

      if (!rules[kind]?.includes(mimeType)) {
        passThrough.destroy();
        file.resume();
        reject(new BadRequestException('Invalid file type'));
        return;
      }

      file.pipe(passThrough);

      resolved = true;
      resolve({
        stream: passThrough,
        filename,
        mimetype: mimeType,
      });
    });

    busboy.on('error', err => {
      passThrough.destroy();
      reject(err);
    });

    busboy.on('finish', () => {
      if (!resolved) {
        reject(new Error('Nenhum arquivo enviado'));
      }
    });

    req.pipe(busboy);
  });
}
