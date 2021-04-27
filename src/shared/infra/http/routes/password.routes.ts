import { Router } from "express";

import { ResetPasswordUserController } from "../../../../modules/accounts/usesCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "../../../../modules/accounts/usesCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
