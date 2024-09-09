import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import puppeteerController from "../controllers/puppeteerController";
import authMiddleware from "../middleware/auth";


router.get("/",authMiddleware, puppeteerController.takeScreenshot, (req: Request, res: Response, next: NextFunction) => {
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': res.locals.screenshotBuffer.length
        });
    res.end(res.locals.screenshotBuffer);
}); 

export default router;