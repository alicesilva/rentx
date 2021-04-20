import { Router } from "express";

import { CreateCarController } from "../../../../modules/cars/usesCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/usesCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/usesCases/listAvailableCars/ListAvailableCarsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthenticate";

const carsRoutes = Router();

const createCarControle = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post(
  "/",
  ensureAuthentication,
  ensureAdmin,
  createCarControle.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post(
  "/specifications/:id",
  ensureAuthentication,
  ensureAdmin,
  createCarSpecificationController.handle
);

export { carsRoutes };
