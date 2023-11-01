export class InMemoryUserRepository {
  private users: User[] = []

  async create(user: User) {
    this.users.push(user)
  }
}
