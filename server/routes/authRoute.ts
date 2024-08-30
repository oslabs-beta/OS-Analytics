import express, { Request, Response, NextFunction } from "express";

import passport from '../middleware/passportUserMiddleware';
const router = express.Router();


router.get('/', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/oauth',
    passport.authenticate('google', { failureRedirect: '/', session: false }),
    (req, res) => {
      const { token, user } = req.user as any;
      res.redirect(`http://localhost:3000/login?token=${token}&email=${user.email}`);
    }
  );

export default router;