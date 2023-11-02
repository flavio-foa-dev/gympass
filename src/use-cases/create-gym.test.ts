import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Create gym Use Case', async () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should be able to create gym', async () => {
    const input = {
      title: 'javascript gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    }
    const { gym } = await sut.create(input)

    expect(gym.id).toEqual(expect.any(String))
  })
})
