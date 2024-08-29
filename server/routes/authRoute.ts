import express, { Request, Response, NextFunction } from "express";

import passport from 'passport';
import jwt from 'jsonwebtoken'
const router = express.Router();


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/google/oauth', passport.authenticate('google', { failureRedirect: '/' }),
    (req: Request, res: Response)=> {

  
    res.json({ test:"working" })
}

)

export default router;