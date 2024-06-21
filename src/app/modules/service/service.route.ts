import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ServiceValidations } from "./service.validation";
import { ServiceControllers } from "./service.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { SlotsController } from "../slot/slot.controller";
import { SlotValidation } from "../slot/slot.validation";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.createService
);

router.post(
  "/slots",
  auth(USER_ROLE.admin),
  validateRequest(SlotValidation.createSlotValidationSchema),
  SlotsController.createSlot
);

router.get("/", ServiceControllers.getAllServices);

router.get("/:id", ServiceControllers.getSingleService);

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidations.updateServiceValidationSchema),
  ServiceControllers.updateService
);

router.delete("/:id", auth(USER_ROLE.admin), ServiceControllers.deleteService);

export const ServiceRouters = router;
