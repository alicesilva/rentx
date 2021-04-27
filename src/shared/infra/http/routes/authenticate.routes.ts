import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/accounts/usesCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "../../../../modules/accounts/usesCases/refreshToken/RefreshTokenController";

const authenticationRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
authenticationRoutes.post("/sessions", authenticateUserController.handle);
authenticationRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticationRoutes };
