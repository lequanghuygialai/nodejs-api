import { Request, Response } from "express";
import config from "config";
import {
  createSession,
  deleteSession,
  findSessions,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
  //Validate user
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  //Create session
  const session = await createSession(user._id, req.get("user-agent") || "");

  //Create access token + refresh token
  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>("accessTokenTtl"),
    }
  );

  const refeshToken = signJwt(
    { _id: user._id, session: session._id },
    {
      expiresIn: config.get<string>("accessTokenTtl"),
    }
  );

  return res.send({ accessToken, refeshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;
  if (!sessionId) {
    await deleteSession(sessionId);
  }
  return res.sendStatus(200);
}
