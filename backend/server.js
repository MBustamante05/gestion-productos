import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { PORT } from '../config.js';
import connectDB from './libs/db.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
})