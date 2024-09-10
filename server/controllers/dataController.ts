import { Request, Response, NextFunction } from "express";
import { pool } from "../models/db";

const dataController = {
  //get everything from all website, URL looks like http://yourdomain.com/api/data
  async getAllUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.userId;
      //user_id, element, element_name, dataset_id, x_coord, y_coord, user_browser, user_os, page_url
      const response = await pool.query(
        `SELECT *
FROM "clickTable"
WHERE user_id = $1
ORDER BY created_at ASC;`,
        [id]
      );

      if (response.rows.length > 0) {
        res.status(200).json(response.rows);
      } else {
        res.status(404).json({ message: "No data" });
      }
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in getAllUserData: " + error.message,
        log: err,
      }); 
    }
  },

  async getAllreferralData(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.userId;
      const response = await pool.query(
        `SELECT *
          FROM "referrerTable"
          WHERE user_id = $1`,
        [id]
      );
      if (response.rows.length > 0) {
        res.status(200).json(response.rows);
      } else {
        res.status(404).json({ message: "No data" });
      }
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in getAllreferralData: " + error.message,
        log: err,
      });
    }
  },
  async deleteWebsite(req: Request, res: Response, next: NextFunction) {
    const { website_name } = req.body;
    const userId = res.locals.userId;

    try {
      const deleteClicks = await pool.query(
        `DELETE FROM "clickTable" WHERE website_name = $1 AND user_id = $2`,
        [website_name, userId]
      );
      const deleteReferrals = await pool.query(
        `DELETE FROM "referrerTable" WHERE website_name = $1 AND user_id = $2`,
        [website_name, userId]
      );

      if (deleteClicks.rowCount > 0 || deleteReferrals.rowCount > 0) {
        res.status(200).json({ message: "Website data deleted successfully" });
      } else {
        res.status(404).json({ message: "No data found for this website" });
      }
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in deleteWebsite: " + error.message,
        log: err,
      });
    }
  },
  async getWebsiteData(req: Request, res: Response, next: NextFunction) {
    try {
      const website: string = req.params.id;
      const id: string = res.locals.userId;
      const response = await pool.query(
        `SELECT * FROM "clickTable"
      WHERE user_id = $1
      AND website_name = $2
      `,
        [id, website]
      );
      if (response.rows.length > 0) {
        res.status(200).json(response.rows);
      } else {
        res.status(404).json({ message: "No data" });
      }
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in getWebsiteData:" + error.message,
        log: err,
      });
    }
  },

  async getAllUserWebsites(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.userId;

      const response = await pool.query(
        `SELECT DISTINCT website_name
       FROM "clickTable"
       WHERE user_id = $1`,
        [id]
      );

      if (response.rows.length > 0) {
        res.status(200).json(response.rows);
      } else {
        res.status(404).json({ message: "No data" });
      }
    } catch (err) {
      const error = err as Error;
      return next({
        message: "Error in getAllUserWebsites: " + error.message,
        log: err,
      });
    }
  },
};

export default dataController;
