export class TMDb {
  apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }
}
export enum MediaType {
  Movie = 'movie',
  TV = 'tv',
}
