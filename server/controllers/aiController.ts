import { Request, Response, NextFunction } from "express";
import { pool } from "../models/db";
const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");
import { ClickData,OpenAIResponse } from "../types";

const client = new BedrockRuntimeClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
const aiController = {
  async getDataBedrock(req: Request, res: Response, next: NextFunction) {
    const id = res.locals.userId;
    let { website, timeFrame } = req.body;
    if (website == "Select website") {
      website = "";
    }
    console.log(website);
    console.log(timeFrame);
    let query: string,
      queryParams: Array<string | number> = [id];

    if (website) {
      query = `
         SELECT 
      "page_url",
      COUNT(*) AS total_clicks,
      AVG(CAST("x_coord" AS INTEGER)) AS avg_x_coord,
      AVG(CAST("y_coord" AS INTEGER)) AS avg_y_coord
    FROM 
      "clickTable2"
    WHERE
      "user_id" = $1
      AND "website_name" = $2
      ${
        timeFrame !== "allTime"
          ? `AND "created_at" >= NOW() - INTERVAL '${timeFrame}'`
          : ""
      }
    GROUP BY 
      "page_url"
    ORDER BY 
      "page_url";
  `;
      queryParams.push(website);
    } else {
      query = `
        SELECT 
          "website_name",
          COUNT(*) AS total_clicks
        FROM 
          "clickTable2"
        WHERE
          "user_id" = $1
          ${
            timeFrame !== "allTime"
              ? `AND "created_at" >= NOW() - INTERVAL '${timeFrame}'`
              : ""
          }
        GROUP BY 
          "website_name"
        ORDER BY 
          total_clicks DESC;
      `;
    }

    try {
      const response = await pool.query(query, queryParams);

      const relevantData = response.rows.map((row: ClickData) => {
        if (website) {
          return {
            page_url: row.page_url,
            total_clicks: row.total_clicks,
            avg_x_coord: row.avg_x_coord,
            avg_y_coord: row.avg_y_coord,
          };
        } else {
          return {
            website_name: row.website_name,
            total_clicks: row.total_clicks,
          };
        }
      });

      console.log(relevantData);
      let promptText = "";

      if (website) {
        promptText = `
          Here is the summarized data of user interactions with the website:
          - Page URLs and the total number of clicks.
          - The average x and y coordinates.
          Please provide an overall report and summary of this data.
          Also, analyze the x and y coordinates to summarize where the majority of user interactions occurred on the screen based on screen size.
          Please keep this in numbered list format.
          Generate a pdf report link right after
          `;
      } else {
        promptText = `
          Here is the summarized data of user interactions:
          - Website names and the total number of clicks.
          Please provide an overall report and summary of this data.
          Please keep this in numbered list format.
        `;
      }

      const requestBody = JSON.stringify({
        inputText: JSON.stringify(relevantData) + promptText,
        textGenerationConfig: {
          maxTokenCount: 2000,
        },
      });
      const params = {
        modelId: "amazon.titan-text-premier-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: requestBody,
      };

      const command = new InvokeModelCommand(params);
      const summarized = await client.send(command);
      const result = JSON.parse(Buffer.from(summarized.body).toString("utf-8"));
      res.json(result);
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in getDataBedrock: " + error.message,
        log: error,
      });
    }
  },
//not yet finished
  async getDataOpenai(req: Request, res: Response, next: NextFunction) {
    //connect and grab data from open ai
    const id = res.locals.userId;
    let { website, timeFrame } = req.body;
    if (website == "Select website") {
      website = "";
    }
    console.log(website);
    console.log(timeFrame);
    let query: string,
      queryParams: Array<string | number> = [id];

    if (website) {
      query = `
         SELECT 
      "page_url",
      COUNT(*) AS total_clicks,
      AVG(CAST("x_coord" AS INTEGER)) AS avg_x_coord,
      AVG(CAST("y_coord" AS INTEGER)) AS avg_y_coord
    FROM 
      "clickTable2"
    WHERE
      "user_id" = $1
      AND "website_name" = $2
      ${
        timeFrame !== "allTime"
          ? `AND "created_at" >= NOW() - INTERVAL '${timeFrame}'`
          : ""
      }
    GROUP BY 
      "page_url"
    ORDER BY 
      "page_url";
  `;
      queryParams.push(website);
    } else {
      query = `
        SELECT 
          "website_name",
          COUNT(*) AS total_clicks
        FROM 
          "clickTable2"
        WHERE
          "user_id" = $1
          ${
            timeFrame !== "allTime"
              ? `AND "created_at" >= NOW() - INTERVAL '${timeFrame}'`
              : ""
          }
        GROUP BY 
          "website_name"
        ORDER BY 
          total_clicks DESC;
      `;
    }

    const response = await pool.query(query, queryParams);

    const relevantData = response.rows.map((row: ClickData) => {
      if (website) {
        return {
          page_url: row.page_url,
          total_clicks: row.total_clicks,
          avg_x_coord: row.avg_x_coord,
          avg_y_coord: row.avg_y_coord,
        };
      } else {
        return {
          website_name: row.website_name,
          total_clicks: row.total_clicks,
        };
      }
    });

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.OPEN_AI_KEY!,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "user",
                content:
                JSON.stringify(relevantData) + "based on this data just generate a pdf file report, use some graphs and create a actual report",
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as OpenAIResponse;
      console.log("OpenAI API response:", data);

      if (data.choices && data.choices.length > 0) {
        const summarizedText = data.choices[0].message.content;
        res.json({ summarizedText });
      } else {
        res.status(500).json({ error: "No choices returned from OpenAI API" });
      }
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in getAiData: " + error.message,
        log: error,
      });
    }
  },
};

export default aiController;
