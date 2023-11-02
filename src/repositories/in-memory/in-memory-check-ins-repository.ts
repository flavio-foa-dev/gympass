import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInsRepository } from '../check-in-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInRepository implements ICheckInsRepository {
  public items: CheckIn[] = []
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }
    this.items.push(checkIn)
    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')
    // console.log(`startDate: ${startOfTheDay}- endDate: ${endOfTheDay}`)

    const checkinOnSameDate = this.items.find((checkin) => {
      const checkInDate = dayjs(checkin.created_at)
      const isSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
      return checkin.user_id === userId && isSameDate
    })

    if (!checkinOnSameDate) {
      return null
    }
    return checkinOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((item) => item.user_id === userId).length
  }

  async findById(id: string) {
    const chekin = this.items.find((item) => item.id === id)
    if (!chekin) {
      return null
    }
    return chekin
  }

  async save(checkIn: CheckIn) {
    const checkinIndex = this.items.findIndex((item) => item.id === checkIn.id)
    if (checkinIndex >= 0) {
      this.items[checkinIndex] = checkIn
    }
    return checkIn
  }
}
