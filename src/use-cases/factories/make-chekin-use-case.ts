import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'
import { PrismaChekinsRepository } from '@/repositories/prisma/prisma-chekins-repository'

export function makeCheckinUsecase() {
  const checkInsRepository = new PrismaChekinsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
