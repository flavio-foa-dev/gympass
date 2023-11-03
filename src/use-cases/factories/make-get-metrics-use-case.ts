import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaChekinsRepository } from '@/repositories/prisma/prisma-chekins-repository'

export function makeGetUserMetricsUsecase() {
  const checkInsRepository = new PrismaChekinsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
