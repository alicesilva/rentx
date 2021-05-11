import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/usesCases/createUser/CreateUserController";
import { ProfileUserController } from "../../../../modules/accounts/usesCases/profileUserUseCase/ProfileUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/usesCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthentication } from "../middlewares/ensureAuthenticate";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

const uploadAvatar = multer(uploadConfig);

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthentication,
  uploadAvatar.single("avatar"),
  updateUserController.handle
);

usersRoutes.get("/profile", ensureAuthentication, profileUserController.handle);

export { usersRoutes };
