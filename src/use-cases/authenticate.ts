import { IUserRepository } from '@/repositories/user-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticationUseCaseRequest {
  email: string
  password: string
}
interface AuthenticationUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private useRepository: IUserRepository) {}

  async create({
    email,
    password,
  }: AuthenticationUseCaseRequest): Promise<AuthenticationUseCaseResponse> {
    const user = await this.useRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }
    const isPasswordMatch = await compare(password, user.password_hash)
    if (!isPasswordMatch) {
      throw new InvalidCredentialsError()
    }
    return { user }
  }
}
