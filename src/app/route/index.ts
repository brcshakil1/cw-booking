import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRouters } from "../modules/auth/auth.route";
import { ServiceRouters } from "../modules/service/service.route";
import { SlotRouters } from "../modules/slot/slot.route";
import { BookingRoutes } from "../modules/booking/booking.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRouters,
  },
  {
    path: "/services",
    route: ServiceRouters,
  },

  {
    path: "/slots",
    route: SlotRouters,
  },
  {
    path: "/",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
