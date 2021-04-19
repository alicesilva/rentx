import { Router } from "express";

import { CreateCarController } from "../../../../modules/cars/usesCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "../../../../modules/cars/usesCases/listAvailableCars/ListAvailableCarsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthenticate";

const carsRoutes = Router();

const createCarControle = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  "/",
  ensureAuthentication,
  ensureAdmin,
  createCarControle.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes };
