import { Request, Response, NextFunction } from "express";
import createCognitoVerifier from "./verifier";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types";

const verifier = createCognitoVerifier();

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    let payload: JwtPayload | null = null;
  const decoded = jwt.decode(token, { complete: true }) as { payload: JwtPayload } | null;
    
    if (decoded && decoded.payload && decoded.payload.iss && decoded.payload.iss.includes("cognito")) {
      payload = await verifier.verify(token);
    } else {
      payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    }
    res.locals.userId = payload!.sub || payload!.user_id;
    res.locals.email = payload!.email;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized: Invalid token");
  }
};

export default auth;
