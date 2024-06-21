import jwt from "jsonwebtoken";

const createToken = (
  jwtPayload: { userEmail: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export default createToken;
