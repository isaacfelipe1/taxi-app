import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './docs/swagger';
import rideRoutes from './routes/rideRoutes';
import 'dotenv/config';
import cors from 'cors';

const app = express();

const allowedOrigins = [
  'http://localhost', 
  'http://localhost:3000', 
  'http://frontend:80', 
  'http://backend:8080',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    methods: ['GET', 'POST', 'PATCH'],
    allowedHeaders: ['Content-Type'],
    credentials: true, 
  })
);

app.use(express.json());
app.use('/ride', rideRoutes);

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
