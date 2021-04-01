import { Router } from "express";

import { ensureAuthentication } from "../middlewares/ensureAuthenticate";
import { CreateSpecificationController } from "../modules/cars/usesCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthentication);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
