import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearByUseCase } from './fetch-nearby-gyms'

let gimsRepositorio: InMemoryGymRepository
let sut: FetchNearByUseCase

describe('Fetch nearby gims Use Case', async () => {
  beforeEach(async () => {
    gimsRepositorio = new InMemoryGymRepository()
    sut = new FetchNearByUseCase(gimsRepositorio)
  })

  it('should be able to fetch nearby gyms', async () => {
    const input1 = {
      title: 'Near gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    }

    const input2 = {
      title: 'Far gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    }
    gimsRepositorio.create(input1)
    gimsRepositorio.create(input2)

    const { gyms } = await sut.create({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })

  it.skip('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i < 23; i++) {
      gimsRepositorio.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    }

    const { gyms } = await sut.create({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
