import fastify from 'fastify'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Flavio Andrade',
    email: 'flavio@exemple.com',
  },
})

export const app = fastify()
