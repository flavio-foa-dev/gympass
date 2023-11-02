import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckinHistoryUseCase } from './fatch-user-checkin-history'

let checkInRepository: InMemoryCheckInRepository
let sut: FetchUserCheckinHistoryUseCase

describe('Fetch user checkin history Use Case', async () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckinHistoryUseCase(checkInRepository)
  })

  it('should be able to fetch checkin history', async () => {
    const inputUserId = {
      userId: 'user-01',
      page: 1,
    }
    const inputuserCheckin1 = {
      gym_id: 'gym-01',
      user_id: 'user-01',
    }
    const inputuserCheckin2 = {
      gym_id: 'gym-01',
      user_id: 'user-01',
    }
    checkInRepository.create(inputuserCheckin1)
    checkInRepository.create(inputuserCheckin2)

    const { checkIns } = await sut.create(inputUserId)

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining(inputuserCheckin1),
      expect.objectContaining(inputuserCheckin2),
    ])
  })

  it('should be able to fetch paginated checkin history', async () => {
    const inputUserId = {
      userId: 'user-01',
      page: 2,
    }

    for (let i = 1; i < 23; i++) {
      checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: inputUserId.userId,
      })
    }

    const { checkIns } = await sut.create(inputUserId)

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
