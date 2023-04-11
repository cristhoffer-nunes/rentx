import { Router } from "express"

import uploadConfig from "../config/upload"
import multer from "multer"
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController"
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController"
import { ensureAuthenticated } from "middlewares/ensureAuthenticated"

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserController = new CreateUserController()
const updateUserAvatarContrller = new UpdateUserAvatarController()

usersRoutes.post("/", createUserController.handle)
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarContrller.handle
)

export { usersRoutes }
