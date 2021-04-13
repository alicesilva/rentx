import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/usesCases/createSpecification/CreateSpecificationController";
import { ensureAuthentication } from "../middlewares/ensureAuthenticate";

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthentication);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
