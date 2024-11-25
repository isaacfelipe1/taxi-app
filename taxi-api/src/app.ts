import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './docs/swagger';
import rideRoutes from './routes/rideRoutes';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8081',
    methods: ['GET', 'POST', 'PATCH'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());
app.use('/ride', rideRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
