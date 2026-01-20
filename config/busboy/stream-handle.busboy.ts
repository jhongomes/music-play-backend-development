import Busboy from 'busboy';
import { Request } from 'express';
import { PassThrough } from 'stream';

export function handleMultipartStream(req: Request,): Promise<{ stream: PassThrough; filename: string; mimetype: string; }> {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: req.headers });
    const passThrough = new PassThrough();

    let resolved = false;

    busboy.on('file', (_field, file, info) => {
      const { filename, mimeType } = info;

      file.pipe(passThrough);

      resolved = true;
      resolve({
        stream: passThrough,
        filename,
        mimetype: mimeType,
      });
    });

    busboy.on('error', reject);

    busboy.on('finish', () => {
      if (!resolved) {
        reject(new Error('Nenhum arquivo enviado'));
      }
    });

    req.pipe(busboy);
  });
}
