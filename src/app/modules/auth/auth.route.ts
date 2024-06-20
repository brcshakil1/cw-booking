import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "./../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/",
  validateRequest(AuthValidation.userLoginSchema),
  AuthControllers.loginUser
);

export const AuthRouters = router;
