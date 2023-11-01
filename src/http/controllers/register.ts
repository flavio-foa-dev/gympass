import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exist-error'
import { makeRegisterUsecase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })
  const dto = userSchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUsecase()
    await registerUseCase.create(dto)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      reply.status(409).send({ message: error.message })
    }
    reply.status(501).send({ message: error.message })
  }

  return reply.status(201).send()
}
