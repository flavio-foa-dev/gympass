import { UserAlreadyExistsError } from './errors/user-already-exist-error'
import { Gym } from '@prisma/client'
import { IGymRepository } from '@/repositories/gyms-repository'

interface CreateGymRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepository: IGymRepository) {}

  async create(dto: CreateGymRequest): Promise<CreateGymResponse> {
    const gym = await this.gymRepository.create(dto)

    return { gym }
  }
}
