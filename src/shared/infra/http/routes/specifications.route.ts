import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/usesCases/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthenticate";

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

// specificationsRoutes.use(ensureAuthentication);
specificationsRoutes.post(
  "/",
  ensureAuthentication,
  ensureAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
