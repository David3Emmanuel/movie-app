import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common'
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard'
import { PublicUser, Recommendation } from 'src/schemas/user.schema'
import { UsersService } from './users.service'
import { GetDetailsQueryDto } from 'src/moviedb/moviedb.dto'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getUsers()
  }

  @Get('check')
  async checkUserExists(@Query('email') email: string) {
    const user = await this.usersService.getUserByEmail(email)
    return { result: (user || false) && true }
  }

  @Get('me')
  @UseGuards(JWTAuthGuard)
  async getCurrentUser(@Request() req: Request & { user: PublicUser }) {
    const user = await this.usersService.getUserByEmail(req.user.email)
    return user || { success: false, message: 'User does not exist' }
  }

  @Get('watchlist')
  @UseGuards(JWTAuthGuard)
  async getWatchlist(@Request() req: Request & { user: PublicUser }) {
    const user = await this.usersService.getRawUserByEmail(req.user.email)
    if (user) return user.watchlist
    return { success: false, message: 'User does not exist' }
  }

  @Post('watchlist')
  @UseGuards(JWTAuthGuard)
  addToWatchlist(
    @Request() req: Request & { user: PublicUser },
    @Body() mediaItem: GetDetailsQueryDto,
  ) {
    return this.usersService.addToWatchlist(req.user._id.toString(), mediaItem)
  }

  @Delete('watchlist')
  @UseGuards(JWTAuthGuard)
  removeFromWatchlist(
    @Request() req: Request & { user: PublicUser },
    @Query() removeWatchlistDTO: GetDetailsQueryDto,
  ) {
    return this.usersService.removeFromWatchlist(req.user._id.toString(), {
      id: removeWatchlistDTO.id,
      type: removeWatchlistDTO.type,
    })
  }

  @Post('watch-history')
  @UseGuards(JWTAuthGuard)
  async addToWatchHistory(
    @Request() req: Request & { user: PublicUser },
    @Body() mediaItem: GetDetailsQueryDto,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { season, ..._mediaItem } = mediaItem
    try {
      await this.usersService.addToWatchHistory(
        req.user._id.toString(),
        _mediaItem,
      )
      return { success: true }
    } catch {
      return { success: false }
    }
  }

  @Get('watch-history')
  @UseGuards(JWTAuthGuard)
  getWatchHistory(@Request() req: Request & { user: PublicUser }) {
    return this.usersService.getWatchHistory(req.user._id.toString()) ?? []
  }

  @Get('recommendations')
  @UseGuards(JWTAuthGuard)
  getUserRecommendations(
    @Request() req: Request & { user: PublicUser },
  ): Promise<Recommendation[]> {
    return this.usersService.getRecommendations(req.user._id.toString())
  }
}
