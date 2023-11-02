import { Gym } from '@prisma/client'
import { IGymRepository } from '@/repositories/gyms-repository'

interface dtoRequest {
  userLatitude: number
  userLongitude: number
}

interface dtoResponse {
  gyms: Gym[]
}

export class FetchNearByUseCase {
  constructor(private gymRepository: IGymRepository) {}

  async create({
    userLatitude,
    userLongitude,
  }: dtoRequest): Promise<dtoResponse> {
    const gyms = await this.gymRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
