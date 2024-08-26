import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import bedrockController from "../controllers/aiController";
import authMiddleware from "../middleware/auth";


router.get("/bedrock",authMiddleware, bedrockController.getDataBedrock,(req: Request, res: Response) => {});
router.get("/openai",authMiddleware, bedrockController.getDataOpenai,(req: Request, res: Response) => {});
export default router;