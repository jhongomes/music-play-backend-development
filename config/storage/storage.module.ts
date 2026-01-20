import { Module } from '@nestjs/common';
import { UploadService } from './uppload-service';

@Module({
  providers: [UploadService],
  exports: [UploadService]
})
export class UploadModule {}
