import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

let gimsRepositorio: InMemoryGymRepository
let sut: SearchGymUseCase

describe('Search gims Use Case', async () => {
  beforeEach(async () => {
    gimsRepositorio = new InMemoryGymRepository()
    sut = new SearchGymUseCase(gimsRepositorio)
  })

  it('should be able to search for gyms', async () => {
    const input1 = {
      title: 'typescript gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    }

    const input2 = {
      title: 'javascript gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    }
    gimsRepositorio.create(input1)
    gimsRepositorio.create(input2)

    const { gyms } = await sut.create({
      query: 'javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'javascript gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
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
