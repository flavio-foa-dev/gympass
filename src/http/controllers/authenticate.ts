import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUsecase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  const dto = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUsecase()

    await authenticateUseCase.create(dto)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      reply.status(400).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send()
}
