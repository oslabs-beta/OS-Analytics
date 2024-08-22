import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import dataController from "../controllers/dataController";
import authMiddleware from "../middleware/writeToDbAuth";


router.post("/data",authMiddleware, dataController.changeName,(req: Request, res: Response) => {});
export default router;