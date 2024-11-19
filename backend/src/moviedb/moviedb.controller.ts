import { Controller, Get, ParseEnumPipe, Query } from '@nestjs/common'
import { MovieDBService } from './moviedb.service'
import { GetDetailsQueryDto, SearchQueryDto } from './moviedb.dto'
import { MediaType } from '@project/tmdb'

@Controller('moviedb')
export class MovieDBController {
  constructor(private readonly service: MovieDBService) {}

  @Get('search')
  search(@Query() searchQuery: SearchQueryDto) {
    return this.service.search(searchQuery)
  }

  @Get('details')
  getDetails(@Query() getDetailsQuery: GetDetailsQueryDto) {
    return this.service.getDetails(getDetailsQuery)
  }

  @Get('discover')
  discover(@Query('type', new ParseEnumPipe(MediaType)) type: MediaType) {
    return this.service.discover(type)
  }
}
