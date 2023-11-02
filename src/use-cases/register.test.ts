import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exist-error'

let userRepository: InMemoryUserRepository
let registerUseCase: RegisterUseCase

describe('Register Use Case', async () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    registerUseCase = new RegisterUseCase(userRepository)
  })

  it('should be able to register', async () => {
    const input = {
      name: 'Flavio Andrade',
      email: 'flavioandrade@email.com',
      password: '12345678',
    }
    const { user } = await registerUseCase.create(input)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon register', async () => {
    const userRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const input = {
      name: 'Flavio Andrade',
      email: 'flavioandrade@email.com',
      password: '12345678',
    }
    const { user } = await registerUseCase.create(input)

    const isPasswordCorrectlyHash = await compare(
      input.password,
      user.password_hash,
    )
    expect(isPasswordCorrectlyHash).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const userRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const input = {
      name: 'Flavio Andrade',
      email: 'flavioandrade@email.com',
      password: '12345678',
    }
    await registerUseCase.create(input)

    await expect(() => registerUseCase.create(input)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })
})
