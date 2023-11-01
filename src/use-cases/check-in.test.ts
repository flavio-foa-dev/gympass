import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('check-in Use Case', async () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInUseCase(checkInRepository)
  })

  it('should be able to check-in', async () => {
    const input = {
      gymId: '123445',
      userId: 'sddsd',
    }
    const { checkIn } = await sut.create(input)

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
