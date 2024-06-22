import httpStatus from "http-status";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    const bearer = header && header.split(" ")[0];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access.");
    }

    if (bearer !== "Bearer") {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Authorization header must contain 'Bearer'  !"
      );
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { userEmail, role, iat } = decoded;

    // check if you is exists
    const user = await User.isUserExistsByEmail(userEmail);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found.");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "You have no access to this route."
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
