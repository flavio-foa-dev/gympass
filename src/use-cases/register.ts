import { IUserRepository } from '@/repositories/user-repository'

import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exist-error'
import { User } from '@prisma/client'

interface IRegister {
  name: string
  email: string
  password: string
}

interface IRegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  private userRepository: IUserRepository
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async create(dto: IRegister): Promise<IRegisterUseCaseResponse> {
    const password_hash = await hash(dto.password, 3)

    const userWithSaameEmail = await this.userRepository.findByEmail(dto.email)

    if (userWithSaameEmail) {
      throw new UserAlreadyExistsError()
    }

    const dtoinput = {
      name: dto.name,
      email: dto.email,
      password_hash,
    }

    const user = await this.userRepository.create(dtoinput)

    return { user }
  }
}
