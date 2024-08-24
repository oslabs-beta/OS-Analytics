import { Request, Response, NextFunction } from "express";
import { pool } from "../models/db";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers.authorization?.split(" ")[1];

  if (!apiKey) {
    return res.status(401).send("Unauthorized: No API key provided");
  }

  try {
    //search for a valid api key inside the usertable
    const result = await pool.query(
      'SELECT * FROM "userTable2" WHERE "api_key" = $1',
      [apiKey]
    );
    console.log(result.length)
    if (result.rows.length === 0) {
      return res.status(401).send("Unauthorized: Invalid API key");
    }

    const user = result.rows[0];
    res.locals.user = user.cognito_id;

    next(); 
  } catch (error) {
    console.error("Error during API key verification:", error);
    return res.status(401).send("Unauthorized: Invalid API key");
  }
};

export default auth;
