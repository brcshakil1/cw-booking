import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = Router();

router.post(
  "/auth/signup",
  validateRequest(UserValidation.CreateUserValidationSchema),
  UserControllers.createUser
);

export const UserRoutes = router;
