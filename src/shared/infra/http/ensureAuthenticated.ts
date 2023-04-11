import { AppError } from "@shared/errors/AppErrors"
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository"
import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError("Token missing", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(
      token,
      "27d7c1f9768fcb88eaf201ea972bc69f"
    ) as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("User does not exists!", 401)
    }

    request.user = {
      id: user_id,
    }

    next()
  } catch {
    throw new AppError("Invalid Token", 401)
  }
}
