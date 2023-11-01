import { InMemoryUserRepository } from '@/repositories/in-memory-user-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', async () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authentication', async () => {
    const input = {
      name: 'Flavio Andrade',
      email: 'flavioandrade@email.com',
      password_hash: await hash('12345678', 3),
    }
    await userRepository.create(input)

    const { user } = await sut.create({
      email: input.email,
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authentication with wrong email', async () => {
    const input = {
      name: 'Flavio Andrade',
      email: 'flavioandrade@email.com',
      password_hash: await hash('12345678', 3),
    }

    await expect(() =>
      sut.create({
        email: input.email,
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authentication with wrong password', async () => {
    const input = {
      name: 'Flavio Andrade',
      email: 'flavioandrade@email.com',
      password_hash: await hash('12345678', 3),
    }
    await userRepository.create(input)

    await expect(() =>
      sut.create({
        email: input.email,
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
