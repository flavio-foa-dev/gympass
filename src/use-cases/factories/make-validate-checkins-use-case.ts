import { PrismaChekinsRepository } from '@/repositories/prisma/prisma-chekins-repository'
import { ValidateCheckInUseCase } from '../validate-check-ins'

export function makeValidateUsecase() {
  const checkInsRepository = new PrismaChekinsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
