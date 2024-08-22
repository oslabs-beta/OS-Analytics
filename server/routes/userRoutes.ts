import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import userController from "../controllers/userController";
import addUserToDatabase from "../middleware/addToDB";

router.post(
  "/signup",
  userController.signup,
  addUserToDatabase,
  (req: Request, res: Response) => {
    res
      .status(200)
      .send({ email: res.locals.email, userUUID: res.locals.cognito_Id });
  }
);

router.post(
  "/login",
  userController.login,
  (req: Request, res: Response) => {}
);

router.post(
  "/logout",
  userController.logout,
  (req: Request, res: Response) => {}
);

export default router;
