import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import dataController from "../controllers/dataController";
import authMiddleware from "../middleware/auth";


router.get("/",authMiddleware, dataController.getAllUserData,(req: Request, res: Response) => {});

export default router;