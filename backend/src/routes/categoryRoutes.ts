import express from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req: AuthRequest, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar as categorias.' });
  }
});

router.post('/', async (req: AuthRequest, res) => {
  const { name, description, icon, type } = req.body;

  if (!name || !icon || !type) {
    return res.status(400).json({ error: 'Nome, ícone e tipo são obrigatórios.' });
  }

  try {
    const category = await prisma.category.create({
      data: {
        name,
        description,
        icon,
        type,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar a categoria.' });
  }
});

router.put('/:id', async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { name, description, icon, type } = req.body;
  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name, description, icon, type },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível atualizar a categoria.' });
  }
});

router.delete('/:id', async (req: AuthRequest, res) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível excluir a categoria.' });
  }
});

export default router;