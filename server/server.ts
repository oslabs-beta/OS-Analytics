import express, { Request, Response } from 'express';
const cors = require('cors');


const app = express();
app.use(cors());
const port = 8080;

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from server!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
