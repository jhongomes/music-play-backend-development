import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UploadKind } from "../enum/upload-kind.enum";
import { UPLOAD_KIND_KEY } from "../decorators/upload-kind.decorator";

@Injectable()
export class UploadValidateInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest<Request>();

    const uploadKind = this.reflector.get<UploadKind>(
      UPLOAD_KIND_KEY,
      context.getHandler(),
    );

    if (!uploadKind) {
      throw new BadRequestException('Upload kind not defined');
    }

    (req as any).uploadKind = uploadKind;

    const contentLength = Number(req.headers['content-length'] || 0);

    if (!contentLength) {
      throw new BadRequestException('Empty upload');
    }

    return next.handle();
  }
}
