import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearByUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearByGymUsecase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearByUseCase(gymsRepository)

  return useCase
}
