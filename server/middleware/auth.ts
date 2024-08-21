import { Request, Response, NextFunction } from "express";
import createCognitoVerifier from "./verifier";

const verifier = createCognitoVerifier();
const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }
//verfies the "id" part of the token and if valid then next()
  try {
    const payload = await verifier.verify(token);
    res.locals.userId = payload.sub;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized: Invalid token");
  }
};

export default auth;
