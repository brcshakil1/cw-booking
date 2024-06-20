import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ServiceValidations } from "./service.validation";
import { ServiceControllers } from "./service.controller";

const router = Router();

router.post(
  "/",
  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.createService
);

router.get("/", ServiceControllers.getAllServices);
router.get("/:id", ServiceControllers.getSingleService);
router.patch("/:id", ServiceControllers.updateService);
router.delete("/:id", ServiceControllers.deleteService);

export const ServiceRouters = router;
