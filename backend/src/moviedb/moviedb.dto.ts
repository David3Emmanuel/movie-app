import { IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator'
import { MediaType, TimeWindow } from '@project/tmdb'

export class SearchQueryDto {
  @IsNotEmpty() query: string
  @IsOptional() @IsNumber() year?: number
  genre?: string
  @IsOptional() @IsEnum(MediaType) type?: MediaType
}

export class GetDetailsQueryDto {
  @IsNumber() id: number
  @IsEnum(MediaType) type: MediaType
  @IsOptional() @IsNumber() season?: number
}

export enum ImageType {
  Backdrop = 'backdrop',
  Logo = 'logo',
  Poster = 'poster',
}

export class GetImageQueryDto extends GetDetailsQueryDto {
  @IsEnum(ImageType) image_type: ImageType
}

export class GetTrendingQueryDto {
  @IsOptional() @IsEnum(MediaType) type?: MediaType
  @IsOptional() @IsEnum(TimeWindow) window?: TimeWindow
}
