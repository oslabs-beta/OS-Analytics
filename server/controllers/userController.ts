import { Request, Response, NextFunction } from "express";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  AdminDeleteUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import * as crypto from "crypto";
import createCognitoVerifier from "../middleware/verifier";
const client = new CognitoIdentityProviderClient({ region: "us-east-2" });
import { pool } from "../models/db";
const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID;
const COGNITO_CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET;
//secret hash helper function
const computeSecretHash = (
  clientId: string,
  clientSecret: string,
  username: string
): string => {
  return crypto
    .createHmac("sha256", clientSecret)
    .update(username + clientId)
    .digest("base64");
};

const userController = {
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    const { email }: { email: string } = req.body;
    try {
      const secretHash = computeSecretHash(
        COGNITO_CLIENT_ID!,
        COGNITO_CLIENT_SECRET!,
        email
      );

      const command = new ForgotPasswordCommand({
        ClientId: COGNITO_CLIENT_ID!,
        Username: email,
        SecretHash: secretHash,
      });

      await client.send(command);
      res.status(200).json({ message: "Password reset code sent to your email." });
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in forgotPassword: " + error.message,
        log: err,
      });
    }
  },

  // Confirm forgot password functionality
  async confirmPassword(req: Request, res: Response, next: NextFunction) {
    const { email, code, newPassword }: { email: string; code: string; newPassword: string } = req.body;
    try {
      const secretHash = computeSecretHash(
        COGNITO_CLIENT_ID!,
        COGNITO_CLIENT_SECRET!,
        email
      );

      const command = new ConfirmForgotPasswordCommand({
        ClientId: COGNITO_CLIENT_ID!,
        Username: email,
        ConfirmationCode: code,
        Password: newPassword,
        SecretHash: secretHash,
      });

      await client.send(command);
      res.status(200).json({ message: "Password reset successful." });
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in confirmPassword: " + error.message,
        log: err,
      });
    }
  },
  async signup(req: Request, res: Response, next: NextFunction) {
    const { email, password }: { email: string; password: string } = req.body;
    //command to signup and login right after
    try {
      const secretHash: string = computeSecretHash(
        COGNITO_CLIENT_ID!,
        COGNITO_CLIENT_SECRET!,
        email
      );
      const command = new SignUpCommand({
        ClientId: COGNITO_CLIENT_ID,
        Username: email,
        Password: password,
        SecretHash: secretHash,
        UserAttributes: [
          {
            Name: "email",
            Value: email,
          },
        ],
      });
      await client.send(command);

      const loginCommand = new InitiateAuthCommand({
        ClientId: COGNITO_CLIENT_ID,
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
          SECRET_HASH: secretHash,
        },
      });
      //get the token from the result
      const authResult = await client.send(loginCommand);
      const token = authResult.AuthenticationResult?.IdToken;
      const verifier = createCognitoVerifier();
      const payload = await verifier.verify(token!);
      res.locals.cognito_Id = payload.sub;;
      res.locals.email = payload.email;
      res.locals.token = token;
      return next();
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in signup: " + error.message,
        log: err,
      });
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password }: { email: string; password: string } = req.body;
    try {
      const secretHash: string = computeSecretHash(
        COGNITO_CLIENT_ID!,
        COGNITO_CLIENT_SECRET!,
        email
      );
      const command = new InitiateAuthCommand({
        ClientId: COGNITO_CLIENT_ID,
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
          SECRET_HASH: secretHash,
        },
      });
      const authResult = await client.send(command);
      const token = authResult.AuthenticationResult?.IdToken;
      res.locals.token = token;
      //send token back
      res.status(200).send({ email: email, token:token });
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in login: " + error.message,
        log: err,
      });
    }
  },




  async getApiKey(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.userId;
      
      const response = await pool.query(
        'SELECT * FROM "userTable2" WHERE "cognito_id" = $1',
        [user]
      );

      if (response.rows.length > 0) {
        res.status(200).json({apiKey:response.rows[0].api_key});
      } else {
        res.status(404).json({ message: "No data" });
      }
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in getApiKey: " + error.message,
        log: err,
      });
    }
  },

  async deleteApiKey(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.userId;

      const response = await pool.query(
        'SELECT * FROM "userTable2" WHERE "cognito_id" = $1',
        [user]
      );
      if (response.rows.length > 0) {
        await pool.query(
          'UPDATE "userTable2" SET "api_key" = NULL WHERE "cognito_id" = $1',
          [user]
        );
        res.status(200).json({ message: "API key deleted successfully" });
      } else {
        res.status(404).json({ message: "No data" });
      }
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in deleteApiKey: " + error.message,
        log: err,
      });
    }
  },
  
  async refreshApiKey(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.userId;

      const response = await pool.query(
        'SELECT * FROM "userTable2" WHERE "cognito_id" = $1',
        [user]
      );
  
      if (response.rows.length > 0) {
        const newApiKeyResponse = await pool.query(
          'UPDATE "userTable2" SET "api_key" = gen_random_uuid() WHERE "cognito_id" = $1 RETURNING "api_key"',
          [user]
        );
        res.status(200).json({ apiKey: newApiKeyResponse.rows[0].api_key });
      } else {
        res.status(404).json({ message: "No data" });
      }
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in refreshApiKey: " + error.message,
        log: err,
      });
    }
  },
  async logout(req: Request, res: Response, next: NextFunction) {
    res.status(200).send("Logged out successfully");
  },

  async deleteAccount(req: Request, res: Response, next: NextFunction) {
    const cognito_id = res.locals.userId;
    console.log("hit");
  
    if (!cognito_id) {
      return res.status(400).json({ message: "cognito_id is required" });
    }

    const client = new CognitoIdentityProviderClient({ region: "us-east-2" });
    try {
      if (!cognito_id.includes("@")) {
        const deleteCommand = new AdminDeleteUserCommand({
          UserPoolId: process.env.COGNITO_USER_POOL_ID!,
          Username: cognito_id,
        });
        await client.send(deleteCommand);
      } else {
        console.log("Skipping Cognito deletion, cognito_id is an email.");
      }
      const result = await pool.query(
        `DELETE FROM "userTable2" WHERE "cognito_id" = $1 RETURNING *`,
        [cognito_id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User account and related data deleted successfully." });
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in deleteAccount: " + error.message,
        log: err,
      });
    }
  }
};


export default userController;
