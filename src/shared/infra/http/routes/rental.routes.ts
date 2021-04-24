import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/usesCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/usesCases/devolutionRental/DevolutionRentalController";
import { ensureAuthentication } from "../middlewares/ensureAuthenticate";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post("/", ensureAuthentication, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthentication,
  devolutionRentalController.handle
);

export { rentalRoutes };
