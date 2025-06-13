import express from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req: AuthRequest, res) => {
  const userId = req.user?.userId;
  const { type, q: searchTerm, limit } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'ID do usuário não encontrado.' });
  }

  try {
    const whereClause: any = { userId };
    if (type && ['receita', 'despesa'].includes(type as string)) {
      whereClause.type = type as string;
    }
    if (searchTerm) {
      whereClause.description = {
        contains: searchTerm as string,
        mode: 'insensitive',
      };
    }

    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      orderBy: { date: 'desc' },
      take: limit ? parseInt(limit as string) : undefined,
      include: {
        category: true,
      },
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar as transações.' });
  }
});

router.post('/', async (req: AuthRequest, res) => {
  const userId = req.user?.userId;
  const { description, amount, date, type, categoryId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'ID do usuário não encontrado.' });
  }
  if (description == null || amount == null || date == null || type == null || categoryId == null) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        description: description,
        amount: amount,
        date: new Date(date),
        type: type,
        userId: userId,
        categoryId: categoryId,
      },
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    res.status(500).json({ error: 'Não foi possível criar a transação.' });
  }
});

router.put('/:id', async (req: AuthRequest, res) => {
  const userId = req.user?.userId;
  const { id } = req.params;
  const { description, amount, date, type, categoryId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'ID do usuário não encontrado.' });
  }

  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id: parseInt(id), userId },
      data: {
        description,
        amount: amount,
        date: date ? new Date(date) : undefined,
        type,
        categoryId: categoryId,
      },
    });
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível atualizar a transação.' });
  }
});

router.delete('/:id', async (req: AuthRequest, res) => {
  const userId = req.user?.userId;
  const { id } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'ID do usuário não encontrado.' });
  }

  try {
    await prisma.transaction.delete({
      where: {
        id: parseInt(id),
        userId: userId,
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível excluir a transação.' });
  }
});

export default router;