import { CheckIn } from '@prisma/client'
import { ICheckInsRepository } from '@/repositories/check-in-repository'
import { ReourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { CheckinValidationError } from './errors/late-checkin-validation-error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}
interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkinRepository: ICheckInsRepository) {}

  async create({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkinRepository.findById(checkInId)
    if (!checkIn) {
      throw new ReourceNotFoundError()
    }

    const distanceInMinutsfromChekinCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutsfromChekinCreation > 20) {
      throw new CheckinValidationError()
    }
    checkIn.validated_at = new Date()

    await this.checkinRepository.save(checkIn)
    return { checkIn }
  }
}
