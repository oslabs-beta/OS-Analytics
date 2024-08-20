import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../models/db";
const JWT_SECRET = "cantseeme";
const JWT_SALT_FACTOR = 10;
const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "24h" });
};
const userController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    const { username , password }: { username: string; password: string } = req.body;

    try {
      const userCheck = await pool.query(
        'SELECT * FROM "userTable" WHERE username = $1',
        [username]
      );
      if (userCheck.rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, JWT_SALT_FACTOR);

      const newUser = await pool.query(
        'INSERT INTO "userTable" (username, password) VALUES ($1, $2) RETURNING *',
        [username, hashedPassword]
      );

      const token = generateToken(newUser.rows[0].id);
      res.cookie("token", token, { httpOnly: true });
      res.status(201).json({ token, user: newUser.rows[0] });
    } catch (err) {
      return next({
        message: "error in signup: " + err,
        log: err,
      });
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    const { username, password }: { username: string; password: string } = req.body;

    try {
      const user = await pool.query(
        'SELECT * FROM "userTable" WHERE username = $1',
        [username]
      );
      if (user.rows.length === 0) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = generateToken(user.rows[0].id);
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ token, user: user.rows[0] });
    } catch (err) {
      return next({
        message: "error in login: " + err,
        log: err,
      });
    }
  },
  async logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("token");
    res.status(200).send("Logged out successfully");
  },
};
export default userController;
