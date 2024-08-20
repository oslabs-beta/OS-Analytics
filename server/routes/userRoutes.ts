import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import userController from '../controllers/userController';


router.post("/signup", userController.signup, (req: Request, res: Response) => {
});

router.post("/login", userController.login, (req: Request, res: Response) => {
});

router.post("/logout", userController.logout, (req: Request, res: Response) => {
});



export default router;
