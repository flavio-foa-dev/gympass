import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Get User MetricUse Case', async () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be able to get checkins count from metrics', async () => {
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

    const { checkInsCount } = await sut.create(inputUserId)

    expect(checkInsCount).toEqual(2)
  })
})
