import { Gym } from '@prisma/client'
import { IGymRepository } from '@/repositories/gyms-repository'

interface dtoRequest {
  query: string
  page: number
}

interface dtoResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymRepository: IGymRepository) {}

  async create({ query, page }: dtoRequest): Promise<dtoResponse> {
    const gyms = await this.gymRepository.searchMany(query, page)

    return { gyms }
  }
}
