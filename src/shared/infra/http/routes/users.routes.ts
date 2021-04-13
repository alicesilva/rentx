import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/usesCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/usesCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthentication } from "../middlewares/ensureAuthenticate";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthentication,
  uploadAvatar.single("avatar"),
  updateUserController.handle
);

export { usersRoutes };
