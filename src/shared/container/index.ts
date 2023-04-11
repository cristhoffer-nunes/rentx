import { container } from "tsyringe"
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository"
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository"
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository"
import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository"
import { SpecificationsRepository } from "@modules/cars/repositories/implementations/SpecificationRepository"

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)
container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)
