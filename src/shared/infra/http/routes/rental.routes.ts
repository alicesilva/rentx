import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/usesCases/createRental/CreateRentalController";
import { ensureAuthentication } from "../middlewares/ensureAuthenticate";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
rentalRoutes.post("/", ensureAuthentication, createRentalController.handle);

export { rentalRoutes };
