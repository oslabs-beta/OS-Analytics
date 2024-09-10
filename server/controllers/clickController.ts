import { Request, Response, NextFunction } from "express";
import { pool } from "../models/db";

const clickDataController = {
  async storeClickData (req: Request, res: Response){

    //get click data back as a body
    const { websiteName, x_coord, y_coord, element, activityId, userAgent, platform, pageUrl} = req.body;
    const userId = res.locals.user;
    if (!userId) {
      res
        .status(400)
        .json({ error: "User information is missing from the request" });
      return;
    }
//insert query to store click data in clickTable
    try {
      await pool.query(  
        `
          INSERT INTO "clickTable" (user_id, website_name, element, dataset_id, x_coord, y_coord, user_browser,user_os,page_url)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [userId, websiteName, element,activityId, x_coord, y_coord, userAgent, platform, pageUrl]
      );

      res.status(201).json({ message: "Click data stored successfully" });
    } catch (error) {
      console.error("Error storing click data:", error);
      res.status(500).json({ error: "Failed to store click data" });
    }
  }, 

  async storeVisitData(req: Request, res: Response) {
  
    const { websiteName, referrer } = req.body;
    const userId = res.locals.user;

    if (!userId) {
      res
        .status(400)
        .json({ error: "User information is missing from the request" });
      return;
    }
    try {
      await pool.query(
        `
        INSERT INTO "referrerTable" (user_id, website_name, referrer)
        VALUES ($1, $2, $3)`,
        [userId, websiteName, referrer]
      );

      res.status(201).json({ message: "Visit data stored successfully" });
    } catch (error) {
      console.error("Error storing visit data:", error);
      res.status(500).json({ error: "Failed to store visit data" });
    }
  },
};

export default clickDataController;
