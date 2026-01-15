import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateArtistDto } from "lib/src/dto/apps/artist/create-artist.dto";
import { ResponseTypeDto } from "lib/src/general";
import { Artist } from "./entity/artist.entity";
import { ArtistService } from "./artist.service";
import { GetArtistDto } from "lib/src/dto/apps/artist/get-artist.dtos";
import { ResponseGetArtistDto } from "lib/src/dto/apps/artist/response-get-album.dto";

@ApiTags('Artist')
@Controller('artist')
@UseGuards(AuthGuard())
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{ access_token }}',
    required: true
})
export class ArtistController {
    constructor(private readonly artistService: ArtistService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiBody({ type: CreateArtistDto })
    @ApiCreatedResponse({ type: Artist, description: 'The Artist has been successfully created.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    async createArtist(@Body() data: CreateArtistDto): Promise<ResponseTypeDto> {
        try {
            return this.artistService.createArtist(data);
        } catch (error) {
            throw error;
        }
    }

    @Get('/search')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiQuery({ type: GetArtistDto })
    @ApiOkResponse({ type: ResponseGetArtistDto, description: 'Albums(s) found.' })
    @ApiCreatedResponse({ type: Artist, description: 'The Artist has been successfully created.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    async getArtist(@Query() query: GetArtistDto): Promise<ResponseGetArtistDto> {
        try {
            return this.artistService.getArtist(query);
        } catch (error) {
            throw error;
        }
    }
}