import { Request, Response, NextFunction } from "express";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import * as crypto from "crypto";
import createCognitoVerifier from "../middleware/verifier";
const client = new CognitoIdentityProviderClient({ region: "us-east-2" });
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
      res.locals.cognito_Id = payload.sub;
      //store token in cookie lasting for 1 day
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.locals.email = payload.email;
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
      //get the token from the result
      const authResult = await client.send(command);
      const token = authResult.AuthenticationResult?.IdToken;
      //store token in cookie lasting for 1 day
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.locals.token = token;
      //send token back
      res.status(200).send({ email: email });
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in login: " + error.message,
        log: err,
      });
    }
  },
  //logout destroys the cookie
  async logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("token");
    res.status(200).send("Logged out successfully");
  },
};

export default userController;
