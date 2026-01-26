import { SetMetadata } from '@nestjs/common';
import { UploadKind } from '../enum/upload-kind.enum';

export const UPLOAD_KIND_KEY = 'upload_kind';

export const UploadKindMeta = (kind: UploadKind) =>
  SetMetadata(UPLOAD_KIND_KEY, kind);