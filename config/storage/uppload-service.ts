import { Injectable } from '@nestjs/common';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import * as dotenv from 'dotenv';
import { PassThrough } from 'stream';
import { UPLOAD_PROFILES } from 'lib/src/type/upload.type';
import { UploadEnum } from 'lib/src/enum/upload.enum';
dotenv.config();

@Injectable()
export class UploadService {
  private s3 = new S3Client({
    region: process.env.AWS_REGION,
  });

  async uploadToS3(stream: PassThrough, filename: string, mimeType: string, uploadEnum: UploadEnum): Promise<string> {
    const profile = UPLOAD_PROFILES[uploadEnum];

    const key = `${profile.folder}/${crypto.randomUUID()}-${filename}`;

    const upload = new Upload({
      client: this.s3,
      queueSize: profile.queueSize,
      partSize: profile.maxSizeMB,
      params: {
        Bucket: process.env.AWS_BUCKET!,
        Key: key,
        Body: stream,
        ContentType: mimeType,
      },
    });

    await upload.done();

    return key;
  }

  async getS3Media(key: string, range: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: key,
      Range: range
    });

    const response = await this.s3.send(command);

    return {
      stream: response.Body as NodeJS.ReadableStream,
      contentLength: response.ContentLength,
      contentRange: response.ContentRange,
    };
  }
}
