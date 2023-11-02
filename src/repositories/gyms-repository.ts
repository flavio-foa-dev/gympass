import { Gym, Prisma } from '@prisma/client'

export interface FindMAnyNearParams {
  latitude: number
  longitude: number
}
export interface IGymRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearBy(params: FindMAnyNearParams): Promise<Gym[]>
}
