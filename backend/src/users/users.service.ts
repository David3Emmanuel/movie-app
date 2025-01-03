import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SignUpDTO } from 'src/auth/auth.dto'
import {
  asPublicUser,
  extractUser,
  MediaItem,
  User,
} from 'src/schemas/user.schema'
import { WatchlistResponseDTO } from './users.dto'
import * as bcrypt from 'bcrypt'
import { MovieDBService } from 'src/moviedb/moviedb.service'
import { MovieDTO, TVSeriesDTO } from '@project/tmdb/types/search.types'
import { shuffle } from 'lodash'

interface Recommendation {
  recommendedItem: MediaItem
  source: MediaItem
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private model: Model<User>,
    private moviedbService: MovieDBService,
  ) {}

  async getUsers() {
    return (await this.model.find().exec()).map((userDocument) =>
      asPublicUser(extractUser(userDocument)),
    )
  }

  async getRawUserByEmail(email: string) {
    const userDocument = await this.model.findOne({ email }).exec()
    return userDocument && extractUser(userDocument)
  }

  async getUserByEmail(email: string) {
    const user = await this.getRawUserByEmail(email)
    return user && asPublicUser(user)
  }

  async createUser(userDetails: SignUpDTO) {
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(userDetails.password, salt)
    await this.model.create({
      ...userDetails,
      password: undefined,
      passwordHash,
    })
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  private async findUserById(userId: string): Promise<User | null> {
    return this.model.findById(userId).exec()
  }

  private isMediaItemInWatchlist(user: User, mediaItem: MediaItem): boolean {
    return user.watchlist.some(
      (item) => item.id === mediaItem.id && item.type === mediaItem.type,
    )
  }

  async addToWatchlist(
    userId: string,
    mediaItem: MediaItem,
  ): Promise<WatchlistResponseDTO> {
    const user = await this.findUserById(userId)
    if (!user) {
      return { success: false, message: 'User not found' }
    }
    if (this.isMediaItemInWatchlist(user, mediaItem)) {
      return { success: false, message: 'Item already exists in watchlist' }
    }
    await this.model
      .updateOne(
        { _id: userId },
        {
          $addToSet: { watchlist: mediaItem },
        },
      )
      .exec()
    return { success: true, message: 'Added', media_item: mediaItem }
  }

  async removeFromWatchlist(
    userId: string,
    mediaItem: MediaItem,
  ): Promise<WatchlistResponseDTO> {
    const user = await this.findUserById(userId)
    if (!user) {
      return { success: false, message: 'User not found' }
    }
    if (!this.isMediaItemInWatchlist(user, mediaItem)) {
      return { success: false, message: 'Item does not exist in watchlist' }
    }
    await this.model
      .updateOne({ _id: userId }, { $pull: { watchlist: mediaItem } })
      .exec()
    return { success: true, message: 'Removed', media_item: mediaItem }
  }

  async addToWatchHistory(userId: string, mediaItem: MediaItem): Promise<void> {
    mediaItem = { type: mediaItem.type, id: mediaItem.id }
    const user = await this.findUserById(userId)
    if (user) {
      const isInWatchHistory = user.watchHistory.some(
        (item) => item.id === mediaItem.id && item.type === mediaItem.type,
      )
      if (!isInWatchHistory) {
        const recommendations = await this.moviedbService.getRecommendations({
          id: mediaItem.id,
          type: mediaItem.type,
        })
        const formattedRecommendations = recommendations.map(
          (rec: MovieDTO | TVSeriesDTO) => ({
            recommendedItem: {
              id: rec.id,
              type: mediaItem.type,
            },
            source: mediaItem,
          }),
        )

        await Promise.all([
          this.addRecommendation(userId, formattedRecommendations),
          this.model
            .updateOne(
              { _id: userId },
              { $addToSet: { watchHistory: mediaItem } },
            )
            .exec(),
        ])
      }
    } else {
      throw new Error('user does not exist')
    }
  }

  async getWatchHistory(userId: string): Promise<MediaItem[]> {
    const user = await this.findUserById(userId)
    return user ? user.watchHistory : []
  }

  async addRecommendation(
    userId: string,
    recommendations: Recommendation[],
  ): Promise<void> {
    const user = await this.findUserById(userId)
    if (user) {
      await this.model
        .updateOne(
          { _id: userId },
          { $addToSet: { recommendations: { $each: recommendations } } },
        )
        .exec()
    } else {
      throw new Error('user does not exist')
    }
  }

  async getRecommendations(userId: string): Promise<Recommendation[]> {
    const user = await this.findUserById(userId)
    return user ? shuffle(user.recommendations) : []
  }
}
