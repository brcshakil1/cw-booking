import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import AppError from "../../error/AppError";

import createToken from "./auth.utils";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload?.email);

  // throw error if user does not exists
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found.");
  }

  // check if the password is correct

  const jwtPayload = {
    userEmail: user?.email,
    role: user.role,
  };

  console.log(config.jwt_access_expires_in);

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    "365d"
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const AuthServices = {
  loginUser,
};
