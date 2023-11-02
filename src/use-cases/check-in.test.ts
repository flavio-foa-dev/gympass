import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckinsError } from './errors/max-number-of-checkin-error'

let checkInRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymRepository
let sut: CheckInUseCase

describe('check-in Use Case', async () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    const input = {
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-27.2092052),
      longitude: new Decimal(-49.6401091),
      created_at: new Date(),
    }
    await gymsRepository.create(input)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check-in', async () => {
    vi.setSystemTime(new Date(2023, 10, 1, 16, 58, 12))
    const input = {
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    }
    const { checkIn } = await sut.create(input)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in twice in the same day', async () => {
    const input = {
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    }
    await sut.create(input)

    await expect(() => sut.create(input)).rejects.toBeInstanceOf(
      MaxNumberOfCheckinsError,
    )
  })

  it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 10, 1, 16, 58, 12))
    const input = {
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    }
    await sut.create(input)

    vi.setSystemTime(new Date(2023, 10, 2, 16, 58, 12))
    const { checkIn } = await sut.create(input)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in on distint gym', async () => {
    const inputGym = {
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
      created_at: new Date(),
    }
    await gymsRepository.create(inputGym)

    const inputChekin = {
      gymId: 'gym-02',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    }

    await expect(() => sut.create(inputChekin)).rejects.toBeInstanceOf(
      MaxDistanceError,
    )
  })
})
