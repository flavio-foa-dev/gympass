import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ReourceNotFoundError } from './errors/resource-not-found-error'

let userRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase

describe('Get user profile', async () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(userRepository)
  })

  it('should be able to get user profile', async () => {
    const input = {
      name: 'Flavio Andrade',
      email: 'flavioandrade@email.com',
      password_hash: await hash('12345678', 3),
    }
    const createUser = await userRepository.create(input)

    const { user } = await sut.create({
      userId: createUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual(input.name)
    expect(user.email).toEqual(input.email)
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.create({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ReourceNotFoundError)
  })
})
