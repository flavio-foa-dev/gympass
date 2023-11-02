import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-ins'
import { ReourceNotFoundError } from './errors/resource-not-found-error'
import { CheckinValidationError } from './errors/late-checkin-validation-error'

let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Validate check-in Use Case', async () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const input = {
      gym_id: 'gym-01',
      user_id: 'user-01',
    }
    const createdcheckin = await checkInRepository.create(input)

    const { checkIn } = await sut.create({ checkInId: createdcheckin.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexixtent check-in', async () => {
    await expect(() =>
      sut.create({ checkInId: 'inexixtent check-in' }),
    ).rejects.toBeInstanceOf(ReourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minuts of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))
    const input = {
      gym_id: 'gym-01',
      user_id: 'user-01',
    }
    const createdcheckin = await checkInRepository.create(input)

    vi.advanceTimersByTime(1000 * 60 * 21) // minuts

    await expect(() =>
      sut.create({ checkInId: createdcheckin.id }),
    ).rejects.toBeInstanceOf(CheckinValidationError)
  })
})
