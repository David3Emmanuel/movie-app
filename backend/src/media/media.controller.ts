import { Controller, Get, Query } from '@nestjs/common'
import { MediaService } from './media.service'

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get()
  async findTorrents(
    @Query('query') query: string,
    @Query('website') website?: string,
    @Query('limit') limit?: number,
  ) {
    return this.mediaService.findTorrents(query, website, limit)
  }
}
