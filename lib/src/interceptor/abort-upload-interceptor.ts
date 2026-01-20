import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Upload } from '@aws-sdk/lib-storage';
import { PassThrough } from 'stream';

interface UploadContext {
  upload?: Upload;
  stream?: PassThrough;
}

@Injectable()
export class UploadAbortInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();

    const uploadContext: UploadContext = {};
    (req as any).uploadContext = uploadContext;

    req.on('aborted', async () => {
      Logger.warn('[UploadAbort] The customer cancelled the request.');

      if (uploadContext.stream) {
        uploadContext.stream.destroy();
      }

      if (uploadContext.upload) {
        try {
          await uploadContext.upload.abort();
          Logger.warn('[UploadAbort] Multipart shipment aborted.');
        } catch (err) {
          Logger.error('[UploadAbort] Failed to abort upload', err);
        }
      }
    });

    return next.handle();
  }
}
