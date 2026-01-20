import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import * as dotenv from 'dotenv';
import { PassThrough } from 'stream';
dotenv.config();

@Injectable()
export class UploadService {
  private s3 = new S3Client({
    region: process.env.AWS_REGION,
  });

  async uploadToS3(
    stream: PassThrough,
    filename: string,
    mimetype: string) {
    const key = `${process.env.AWS_FOLDER}/${Date.now()}-${filename}`;

    const upload = new Upload({
      client: this.s3,
      queueSize: Number(process.env.AWS_QUEUE_SIZE),
      partSize: Number(process.env.AWS_PART_SIZE),
      params: {
        Bucket: process.env.AWS_BUCKET!,
        Key: key,
        Body: stream,
        ContentType: mimetype,
      },
    });

    await upload.done();

     return {
      key,
      url: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${key}`,
    };
  }
}
