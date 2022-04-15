import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { verifyToken } from "../utils/jwt.utils";

export default function desializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyToken(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  return next();
}