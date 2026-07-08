import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(cors());

// Application Routes
// app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('RentNest API is running');
});

// Global Error Handler will be added here
// Not Found Handler will be added here

export default app;
