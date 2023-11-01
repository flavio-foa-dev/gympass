import { InMemoryUserRepository } from '@/repositories/in-memory-user-repository'
import { expect, describe, it } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exist-error'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', async () => {
  it('should be able to authentication', async () => {
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(userRepository)

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
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(userRepository)

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
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(userRepository)

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
