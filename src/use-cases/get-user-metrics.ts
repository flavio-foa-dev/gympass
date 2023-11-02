import { CheckIn } from '@prisma/client'
import { ICheckInsRepository } from '@/repositories/check-in-repository'

interface dtoRequest {
  userId: string
}
interface dtoResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkinRepository: ICheckInsRepository) {}

  async create({ userId }: dtoRequest): Promise<dtoResponse> {
    const checkInsCount = await this.checkinRepository.countByUserId(userId)
    return { checkInsCount }
  }
}
