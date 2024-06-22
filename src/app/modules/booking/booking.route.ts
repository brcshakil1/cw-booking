import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidation } from "./booking.validation";
import { BookingControllers } from "./booking.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/bookings",
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.createBookingServiceValidationSchema),
  BookingControllers.createBookService
);
router.get(
  "/bookings",
  auth(USER_ROLE.admin),
  BookingControllers.getAllBookService
);
router.get(
  "/my-bookings",
  auth(USER_ROLE.user),
  BookingControllers.getMyBookingService
);

export const BookingRoutes = router;
