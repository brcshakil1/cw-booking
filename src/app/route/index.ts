import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRouters } from "../modules/auth/auth.route";
import { ServiceRouters } from "../modules/service/service.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
