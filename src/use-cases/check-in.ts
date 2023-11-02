import { CheckIn } from '@prisma/client'
import { ICheckInsRepository } from '@/repositories/check-in-repository'
import { IGymRepository } from '@/repositories/gyms-repository'
import { ReourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-betwen-coord'
import { MaxNumberOfCheckinsError } from './errors/max-number-of-checkin-error'
import { MaxDistanceError } from './errors/max-distance-error'
const MAX_DISTANCE = 0.1

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}
interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkinRepository: ICheckInsRepository,
    private gymsRepository: IGymRepository,
  ) {}

  async create({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)
    if (!gym) {
      throw new ReourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )
    console.log('minha distancia', distance)

    if (distance > MAX_DISTANCE) {
      throw new MaxDistanceError()
    }

    const checkinInOnSameDay = await this.checkinRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )
    if (checkinInOnSameDay) {
      throw new MaxNumberOfCheckinsError()
    }

    const checkIn = await this.checkinRepository.create({
      gym_id: gymId,
      user_id: userId,
    })
    return { checkIn }
  }
}
