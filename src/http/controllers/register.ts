import { prisma } from "@/lib/prisma"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const register = async  (request: FastifyRequest , reply: FastifyReply) => {
  const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { name, email, password } = userSchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })
  return reply.status(201).send({ message: 'success' })
})