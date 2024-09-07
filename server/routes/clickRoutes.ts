import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import clickController from "../controllers/clickController";
import authMiddleware from "../middleware/writeToDbAuth";


router.post("/",authMiddleware, clickController.storeClickData,(req: Request, res: Response) => {});
router.post("/visits",authMiddleware, clickController.storeVisitData,(req: Request, res: Response) => {});
export default router;