import { Injectable } from '@nestjs/common'
import { RawUser } from './User'

@Injectable()
export class UsersService {
  // TODO connect to database
  users: RawUser[] = [
    {
      id: 1,
      username: 'David3Emmanuel',
      password: 'password',
    },
  ]
  LAST_USER_ID = 1

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username)
  }

  createUser(username: string, password: string) {
    this.users.push({ id: ++this.LAST_USER_ID, username, password })
  }
}
