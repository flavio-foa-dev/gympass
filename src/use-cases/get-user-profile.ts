import { IUserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { ReourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileUseCaseRequest {
  userId: string
}
interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private useRepository: IUserRepository) {}

  async create({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.useRepository.findById(userId)
    if (!user) {
      throw new ReourceNotFoundError()
    }
    return { user }
  }
}
