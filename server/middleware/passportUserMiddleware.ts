import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import axios from 'axios'
import { pool } from "../models/db";
// import db from '../models/db';

export const revokeGoogleToken = async (accesstoken) => {
    try {
        await axios.post('https://oauth2.googleapis.com/revoke?token=${token}', null, {
            params: {
                token: accesstoken,
            },
        });
        console.log('Google access token revoked sucessfully');
    } catch {
        return ({
            log: 'Error revoking google access token',
            status: 500,
            message: 'Error revoking google access token',

        })
    };
}
export const googlePassportConfig = (passport: any) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/google/oauth',
    },
        async (accessToken: string, refreshToken: string, profile: any, done: any) => {
            try {
                const email = profile.emails[0].value
                const result = await pool.query('SELECT * FROM "userTable2" WHERE email = $1', [email])
                let user: any;
                if (result.rows.length > 0) {

                    user = result.rows[0];


                }

                else {
                    const addToDb = await pool.query('INSERT INTO "userTable2" (email,cognito_id) VALUES ($1,$2) RETURNING *', [email, email]);
                    user = addToDb.rows[0]
                }


                // const users = {
                //     googleId: profile.id,
                //     displayName: profile.displayName,
                //     emails: profile.emails,
                // };
                return done(null, profile);
            } catch (error) {
                return done({
                    log: 'Error while configuring Google Passport',
                    status: 500,
                    message: 'Error while configuring passport',
                }, null);
            }
        }));

    passport.serializeUser((user: any, done: any) => {

        done(null, user);
    });

    passport.deserializeUser(async (id: string, done: any) => {
        try {
            const result = await pool.query('SELECT * FROM "userTable2 WHERE id = $1', [id])
            done(null, id);
        } catch (error) {
            return ({
                log: 'Erorr while decentrialzibng',
                status: 500,
                message: 'Error in decentralzie funciton',

            })
        }
    });
};

