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
      'SELECT * FROM "userTable2" WHERE cognito_id = $1',
      [apiKey]
    );

    if (result.rows.length === 0) {
      return res.status(401).send("Unauthorized: Invalid API key");
    }

    //return the row and pull the email and id out from userTable
    const user = result.rows[0];
    res.locals.user = user.cognito_id;
    res.locals.email = user.email;

    next();
  } catch (error) {
    console.error("Error during API key verification:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export default auth;
