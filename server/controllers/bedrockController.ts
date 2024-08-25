import { Request, Response, NextFunction } from "express";
import { pool } from "../models/db";
const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");

const client = new BedrockRuntimeClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
const aiController = {
  async getData(req: Request, res: Response) {
    const id = res.locals.userId;

    const response = await pool.query(
      `SELECT user_id, element, element_name, dataset_id, x_coord, y_coord, user_browser, user_os, page_url
        FROM "clickTable2"
        WHERE user_id = $1`,
      [id]
    );
    interface RowData {
        user_id: string;
        element: string;
        element_name: string;
        dataset_id: string;
        x_coord: string;
        y_coord: string;
        user_browser: string;
        user_os: string;
        page_url: string;
      }
  const allDataResponse = response.rows.map((row: any) => ({
        element: row.element,
        dataset_id: row.dataset_id,
        x_coord: row.x_coord,
        y_coord: row.y_coord,
        user_browser: row.user_browser,
        user_os: row.user_os,
        page_url: row.page_url
      }));

    //console.log(response)
    const requestBody = JSON.stringify({
        inputText: JSON.stringify(allDataResponse) + "this data is the result of users interating with the website, give a overall report and summary of the data",
        textGenerationConfig: {
          maxTokenCount: 2000,
        }
      });
    try {
      const params = {
        modelId: "amazon.titan-text-premier-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: requestBody,
       }
     

      const command = new InvokeModelCommand(params);
      const response = await client.send(command);
      const result = JSON.parse(Buffer.from(response.body).toString('utf-8'));
      res.json(result);
    } catch (error) {
      console.error("Error generating report:", error);
      throw error;
    }
  },
};

export default aiController;
