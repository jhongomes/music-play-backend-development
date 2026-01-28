import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { PlaylistService } from "./playlist.service";
import { ResponseTypeDto } from "lib/src/general";
import { Playlist } from "./entity/playlist.entity";
import { CreatePlaylistDto } from "lib/src/dto/apps/playlist/create-playlist.dto";
import { PlaylistMusic } from "./entity/playlist-music.entity";
import { AddMusicToPlaylistDto } from "lib/src/dto/apps/playlist/add-music-to-playlist.dto";
import { InsertOneResult } from "mongodb";
import { ResponseGetPlaylistDto } from "lib/src/dto/apps/playlist/response-get-playlist.dto";
import { GetPlayListDto } from "lib/src/dto/apps/playlist/get-playlist.dtos";

@ApiTags('Playlist')
@Controller('playlist')
@UseGuards(AuthGuard())
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{ access_token }}',
    required: true
})
export class PlaylistController {
    constructor(private readonly playlistService: PlaylistService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiBody({ type: CreatePlaylistDto })
    @ApiCreatedResponse({ type: Playlist, description: 'The Playlist has been successfully created.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async createPlayList(@Body() data: CreatePlaylistDto): Promise<ResponseTypeDto> {
        try {
            return this.playlistService.createPlayList(data);
        } catch (error) {
            throw error;
        }
    }

    @Post('/music/:id')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiBody({ type: AddMusicToPlaylistDto })
    @ApiCreatedResponse({ type: PlaylistMusic, description: 'The PlaylistMusic has been successfully created.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async AddMusicToPlaylist(@Param('id') playlist_id: string, @Body() music_id: AddMusicToPlaylistDto): Promise<InsertOneResult> {
        try {
            return this.playlistService.AddMusicToPlaylist(playlist_id, music_id);
        } catch (error) {
            throw error;
        }
    }

    @Get('/detail/:id')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiOkResponse({ type: ResponseGetPlaylistDto, description: 'Song(s) found.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async getPlayListDetail(@Param() playlist_id: string): Promise<ResponseGetPlaylistDto[]> {
        return this.playlistService.getPlayListDetail(playlist_id);
    }

    @Get('/list')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiQuery({ type: GetPlayListDto })
    @ApiOkResponse({ type: ResponseGetPlaylistDto, description: 'Song(s) found.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async getAllPlayList(@Query() query: GetPlayListDto): Promise<ResponseGetPlaylistDto> {
        return this.playlistService.getAllPlayList(query);
    }

    @Delete('/:id')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async deletePlayList(@Param('id') playlist_id: string): Promise<ResponseTypeDto> {
        return this.playlistService.deletePlayList(playlist_id);
    }
}