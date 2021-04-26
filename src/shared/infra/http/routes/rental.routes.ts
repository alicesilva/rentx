import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/usesCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/usesCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "../../../../modules/rentals/usesCases/listRentalsByUser/ListRentalsByUserController";
import { ensureAuthentication } from "../middlewares/ensureAuthenticate";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthentication, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthentication,
  devolutionRentalController.handle
);
rentalRoutes.get(
  "/user",
  ensureAuthentication,
  listRentalsByUserController.handle
);

export { rentalRoutes };
