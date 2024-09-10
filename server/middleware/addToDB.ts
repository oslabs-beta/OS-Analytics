import { Request, Response, NextFunction } from "express";
import { pool } from "../models/db";

const addUserToDatabase = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
const cognito_id = res.locals.cognito_Id;
  try {
    const existingUser = await pool.query(
      'SELECT * FROM "userTable" WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length === 0) {
      const newUser = await pool.query(
        'INSERT INTO "userTable" (email, cognito_id) VALUES ($1,$2) RETURNING *',
        [email, cognito_id]
      );

      console.log("New user added:", newUser.rows[0]);
    } else {
      console.log("User already exists:", existingUser.rows[0]);
    }
    next(); 
  } catch (err) {
    next({
      message: "Error adding user to the database: " + err,
      log: err,
    });
  }
};

export default addUserToDatabase;
