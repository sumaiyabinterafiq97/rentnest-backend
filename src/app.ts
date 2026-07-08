import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(cors());

import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

// Application Routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('RentNest API is running');
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'API Not Found',
    errorDetails: {
      path: req.originalUrl,
      method: req.method,
    }
  });
});

export default app;
