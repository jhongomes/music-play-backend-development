import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { CreateArtistDto } from "lib/src/dto/apps/artist/create-artist.dto";
import { ResponseTypeDto } from "lib/src/general";
import { Artist } from "./entity/artist.entity";
import { ArtistService } from "./artist.service";

@ApiTags('Artist')
@Controller('artist')
@UseGuards(AuthGuard())
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{ access_token }}',
    required: true
})
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}

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
}