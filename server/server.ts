import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import {checkDatabaseConnection } from './models/db';
import userRoutes from './routes/userRoutes'; 
import authMiddleware from'./middleware/auth'; 
const cors = require('cors');

//check db connection
checkDatabaseConnection();


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser()); 
const port = 8080;

app.get('/api',authMiddleware, (req: Request, res: Response) => {
  res.json({ message: 'Hello from server!',
    user: res.locals.userId,
   });
});

app.use('/api/auth',userRoutes )


//Error handling

app.use((req: Request, res: Response) => {
  res.status(404).send("This is not the page you're looking for...");
});


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  
  const errorObj = Object.assign({}, defaultErr, err);
  
  console.error(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
