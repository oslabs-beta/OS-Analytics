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
      const signUpResult = await client.send(command);
      res.status(201).json({
        message:
          "User signed up successfully! Please check your email to confirm your account.",
        user: signUpResult,
      });
    } catch (err) {
      return next({
        message: "Error in signup: " + err,
        log: err,
      });
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password }: { email: string; password: string } = req.body;

    const verifier = createCognitoVerifier();
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

      const payload = await verifier.verify(token!);
      res.locals.cognito_Id = payload.sub;
      res.cookie("token", token, { httpOnly: true });
      res.locals.token = token;
      return next();
    } catch (err) {
      return next({
        message: "Error in login: " + err,
        log: err,
      });
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("token");
    res.status(200).send("Logged out successfully");
  },
};

export default userController;
