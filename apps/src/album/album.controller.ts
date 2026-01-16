import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "lib/src/dto/apps/album/album.dto";
import { Album } from "./entity/album.entity";
import { ResponseTypeDto } from "lib/src/general";
import { AuthGuard } from "@nestjs/passport";
import { GetAlbumDto } from "lib/src/dto/apps/album/get-album.dtos";
import { ResponseGetAlbumDto } from "lib/src/dto/apps/album/response-get-album.dto";

@ApiTags('Album')
@Controller('album')
@UseGuards(AuthGuard())
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{ access_token }}',
    required: true
})
export class AlbumController {
    constructor(private readonly albumService: AlbumService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiBody({ type: CreateAlbumDto })
    @ApiCreatedResponse({ type: Album, description: 'The Album has been successfully created.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async createAlbum(@Body() data: CreateAlbumDto): Promise<ResponseTypeDto> {
        try {
            return this.albumService.createAlbum(data);
        } catch (error) {
            throw error;
        }
    }

    @Get('/search')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiQuery({ type: GetAlbumDto })
    @ApiOkResponse({ type: ResponseGetAlbumDto, description: 'Albums(s) found.' })
    @ApiCreatedResponse({ type: Album, description: 'The Album has been successfully created.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async getAlbums(@Query() query: GetAlbumDto): Promise<ResponseGetAlbumDto> {
        try {
            return this.albumService.getAlbums(query);
        } catch (error) {
            throw error;
        }
    }
}