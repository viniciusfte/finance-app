import express from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req: AuthRequest, res) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(400).json({ error: 'ID do usuário não encontrado.' });
  }

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const monthlyIncome = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { userId, type: 'receita', date: { gte: startOfMonth, lte: endOfMonth } },
    });

    const monthlyExpense = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { userId, type: 'despesa', date: { gte: startOfMonth, lte: endOfMonth } },
    });

    const totalIncome = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { userId, type: 'receita' },
    });

    const totalExpense = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { userId, type: 'despesa' },
    });

    const summary = {
      monthlyIncome: monthlyIncome._sum.amount || 0,
      monthlyExpense: monthlyExpense._sum.amount || 0,
      totalBalance: (totalIncome._sum.amount || 0) - (totalExpense._sum.amount || 0),
      monthlyBalance: (monthlyIncome._sum.amount || 0) - (monthlyExpense._sum.amount || 0),
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar o resumo financeiro.' });
  }
});

export default router;