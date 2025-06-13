import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes';
import categoryRoutes from './routes/categoryRoutes';
import summaryRoutes from './routes/summaryRoutes';
import userRoutes from './routes/userRoutes';
import { authMiddleware } from './middleware/authMiddleware';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', authMiddleware, transactionRoutes);
app.use('/api/categories', authMiddleware, categoryRoutes);
app.use('/api/summary', authMiddleware, summaryRoutes);
app.use('/api/users', authMiddleware, userRoutes);

export default app;