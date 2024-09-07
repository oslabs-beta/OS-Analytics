import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();
const{Oauth2Client} = require('google-auth-library')

async function getUserData(access_token:string ){
    const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token${access_token}`);
    const data = await response.json();;
}

router.get('/', async function(req,res,next){
    const code = req.query.code;
    try{
        const redirectUrl = 'http://localhost:3000/'
        const oauth2Client = new Oauth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl 
        );
        const res = await oauth2Client.getToken(code);
        await oauth2Client.setCredentials(res.tokens);
        const user  = oauth2Client.credentials;
        await getUserData(user.access_token);
    }catch(err){
        return next({
            log : 'Error while retriveing user access token ',
            status : 500,
            message: 'Erorr in get router function in Ouath Route',

        })
    }
})
export default router;