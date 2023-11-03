import { FetchUserCheckinHistoryUseCase } from '../fatch-user-checkin-history'
import { PrismaChekinsRepository } from '@/repositories/prisma/prisma-chekins-repository'

export function makeFetchUserCheckinHistoryUsecase() {
  const checkInsRepository = new PrismaChekinsRepository()
  const useCase = new FetchUserCheckinHistoryUseCase(checkInsRepository)

  return useCase
}
