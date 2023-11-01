import fastify from 'fastify'
import { appRouter } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRouter)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issus: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }
  return reply.status(501).send({ message: 'Error internal unkoum' })
})
