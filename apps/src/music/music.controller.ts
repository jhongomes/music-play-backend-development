import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { MusicService } from "./music.service";
import { ResponseTypeDto } from "lib/src/general";
import { Music } from "./entity/music.entity";
import { Request } from 'express';
import { CreateMusicDto } from "lib/src/dto/apps/music/create-music.dto";
import { EmptyArrayValidationPipe } from "lib/src/pipes/empty-array.pipe";
import { handleMultipartStream } from 'config/busboy/stream-handle.busboy';
import { UploadAbortInterceptor } from "lib/src/interceptor/abort-upload-interceptor";
import { GetMusicDto } from "lib/src/dto/apps/music/get-music.dtos";
import { ResponseGetMusicDto } from "lib/src/dto/apps/music/response-get-music.dto";

@ApiTags('Music')
@Controller('music')
@UseGuards(AuthGuard())
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{ access_token }}',
    required: true
})
export class MusicController {
    constructor(private readonly musicService: MusicService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiBody({ type: CreateMusicDto })
    @ApiCreatedResponse({ type: Music, description: 'The Music has been successfully created.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async createMusic(@Body() data: CreateMusicDto): Promise<ResponseTypeDto> {
        try {
            return this.musicService.createMusic(data);
        } catch (error) {
            throw error;
        }
    }

    @Post('/upload')
    @UseInterceptors(UploadAbortInterceptor)
    @ApiCreatedResponse({ type: ResponseTypeDto, description: 'Successfull operation, file received.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async createFileMusic(@Req() req: Request): Promise<Object> {
        const { stream, filename, mimetype } = await handleMultipartStream(req);
        return this.musicService.createFileMusic(stream, filename, mimetype);
    }

    @Post('/bulk')
    @UsePipes(EmptyArrayValidationPipe)
    @ApiBody({
        type: [CreateMusicDto],
        description: 'The body request is an array of musics.'
    })
    @ApiCreatedResponse({ type: ResponseTypeDto, description: 'Successfull operation, prices received.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async createBulkMusic(@Body() createMusicsDto: CreateMusicDto[]): Promise<ResponseTypeDto> {
        return this.musicService.createBulkMusic(createMusicsDto);
    }

    @Get('/all')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiQuery({ type: GetMusicDto })
    @ApiOkResponse({ type: ResponseGetMusicDto, description: 'Song(s) found.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async getMusicsList(@Query() query: GetMusicDto): Promise<ResponseGetMusicDto> {
        return this.musicService.getMusicsList(query);
    }

    @Get('/:id')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async getMusicById(@Param('id') id: string, @Req() request: Request, @Res() res: Response): Promise<any> {
        try {
            const range = request.headers.range;
            const { stream, contentLength, contentRange } = await this.musicService.getMusicById(id, range);

            if (range && contentRange) {
                res.headers.set('Content-Range', contentRange);
                res.headers.set('Content-Length', contentLength!.toString());
            }

            stream.pipe(res);
        } catch (error) {
            throw error;
        }
    }
}