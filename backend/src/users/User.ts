export interface RawUser {
  id: number
  username: string
  password: string
}

export type User = Omit<RawUser, 'password'>
