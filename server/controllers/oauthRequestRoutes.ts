import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();
const{Oauth2Client} = require('google-auth-library');

router.post('/googleoauth', async function(req,res,next){
    res.header('Access-Control-Allow-Origin','http:localhost:3000');
    res.header('Referrer-Policy', 'no-Referrer-when-downgrade');

    const redirectURL = 'http://localhost:3000/';

    const oAuth2Client = new Oauth2Client (
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirectURL
      );
    const autuhorizeURL = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googlepais.com/auth/userinfo.profile openid'],
        prompt: 'consent'

});
    res.json({url:autuhorizeURL});
});
export default router;