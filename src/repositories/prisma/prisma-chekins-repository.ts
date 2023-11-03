import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInsRepository } from '../check-in-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaChekinsRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({ data })
    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const chekin = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })
    return chekin
  }

  async findManyByUserId(userId: string, page: number) {
    const checkin = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return checkin
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })
    return count
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
    return checkIn
  }

  async save(data: CheckIn) {
    const checkin = await prisma.checkIn.update({
      where: { id: data.id },
      data,
    })
    return checkin
  }
}
