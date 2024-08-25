import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import bedrockController from "../controllers/bedrockController";
import authMiddleware from "../middleware/auth";


router.get("/",authMiddleware, bedrockController.getData,(req: Request, res: Response) => {});

export default router;