import { Request, Response, NextFunction } from 'express';
import { pool } from '../models/db';

const dataController = {
  //get everything from all website, URL looks like http://yourdomain.com/api/data
  async getAllUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.userId;
//user_id, element, element_name, dataset_id, x_coord, y_coord, user_browser, user_os, page_url
      const response = await pool.query(
        `SELECT *
          FROM "clickTable2"
          WHERE user_id = $1`,
        [id]
      );

      if (response.rows.length > 0) {
        res.status(200).json(response.rows);
      } else {
        res.status(404).json({ message: 'No data' });
      }
    } catch (err) {
      const error = err as Error;
      return next({
        message: 'Error in getAllUserData: ' + error.message,
        log: err,
      });
    }
  },
  //grab id from cookie (res locals)-- this is the userId(cognito id)
  //create a query string to grab website data <--- need the user id and need website(paramns?)
  //check if row exists and if not error handling
  //global error handling

  async getWebsiteData(req: Request, res: Response, next: NextFunction) {
    try {
      const website: string = req.params.id;
      const id: string = res.locals.userId;
      const response = await pool.query(
        `SELECT * FROM "clickTable2"
      WHERE user_id = $1
      AND website_name = $2
      `,
        [id, website]
      );
      if (response.rows.length > 0) {
        res.status(200).json(response.rows);
      } else {
        res.status(404).json({ message: 'No data' });
      }
    } catch (err) {
      const error = err as Error;
      return next({
        message: 'Error in getWebsiteData:' + error.message,
        log: err,
      });
    }
  },


async getAllUserWebsites(req: Request, res: Response, next: NextFunction) {
  try {
    const id = res.locals.userId;

    const response = await pool.query(
      `SELECT DISTINCT website_name
       FROM "clickTable2"
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
}
}


export default dataController;
