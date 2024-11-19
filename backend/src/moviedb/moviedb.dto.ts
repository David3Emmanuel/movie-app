import { IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator'
import { MediaType } from '@project/tmdb'

export class SearchQueryDto {
  @IsNotEmpty() query: string
  @IsOptional() @IsNumber() year?: number
  genre?: string
  @IsOptional() @IsEnum(MediaType) type?: MediaType
}

export class GetDetailsQueryDto {
  @IsNumber() id: number
  @IsEnum(MediaType) type: MediaType
}
