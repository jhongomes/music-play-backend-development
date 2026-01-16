import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { MusicService } from "./music.service";
import { ResponseTypeDto } from "lib/src/general";
import { Music } from "./entity/music.entity";
import { CreateMusicDto } from "lib/src/dto/apps/music/create-music.dto";
import { EmptyArrayValidationPipe } from "lib/src/pipes/empty-array.pipe";

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
}