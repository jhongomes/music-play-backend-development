import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "lib/src/dto/apps/album/album.dto";
import { Album } from "./entity/album.entity";
import { ResponseTypeDto } from "lib/src/general";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('Album')
@Controller('album')
@UseGuards(AuthGuard())
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{ access_token }}',
    required: true
})
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiBody({ type: CreateAlbumDto })
    @ApiCreatedResponse({ type: Album, description: 'The Album has been successfully created.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    async createUser(@Body() data: CreateAlbumDto): Promise<ResponseTypeDto> {
        try {
            return this.albumService.createAlbum(data);
        } catch (error) {
            throw error;
        }
    }
}