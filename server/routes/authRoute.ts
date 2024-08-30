import express, { Request, Response, NextFunction } from "express";
import { User } from "../types";
import passport from '../middleware/passportUserMiddleware';
const router = express.Router();


router.get('/', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/oauth',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login', session: false }),
    (req, res) => {
      const { token, user } = req.user as User;
      res.redirect(`http://localhost:3000/login?token=${token}&email=${user.email}`);
    }
  );

export default router;