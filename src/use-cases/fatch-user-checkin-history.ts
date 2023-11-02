import { CheckIn } from '@prisma/client'
import { ICheckInsRepository } from '@/repositories/check-in-repository'

interface dtoRequest {
  userId: string
  page: number
}
interface dtoResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckinHistoryUseCase {
  constructor(private checkinRepository: ICheckInsRepository) {}

  async create({ userId, page }: dtoRequest): Promise<dtoResponse> {
    const checkIns = await this.checkinRepository.findManyByUserId(userId, page)
    return { checkIns }
  }
}
