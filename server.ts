import express, { Request, Response } from 'express';

const app = express();
const port = 8080;

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from server!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
