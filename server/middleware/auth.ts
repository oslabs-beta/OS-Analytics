import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const JWT_SECRET = "cantseeme";

const auth = (req: Request, res: Response, next: NextFunction) => {
  //grab the cookie from the request
  const token = req.cookies.token;
  console.log(token);
  //if their is no token, end the response with a message
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }
  try {
    //decodes the token
    const decoded = jwt.verify(token, JWT_SECRET);
    //stores token in a locals variable to be used in next middleware
    res.locals.userId = decoded.id;
    //proceed to next middleware
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized: Invalid token");
  }
};

export default auth;
