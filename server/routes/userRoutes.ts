import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import userController from '../controllers/userController';
import addUserToDatabase from '../middleware/addToDB'

router.post("/signup", userController.signup,  (req: Request, res: Response) => {
});

router.post("/login",userController.login, addUserToDatabase, (req: Request, res: Response) => {
    res.status(200).send(res.locals.token)
});

router.post("/logout", userController.logout, (req: Request, res: Response) => {
});



export default router;
