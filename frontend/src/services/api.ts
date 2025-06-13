const API_BASE_URL = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error("Token de autenticação não encontrado.");
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export interface Category {
  id: number; name: string; description: string | null; icon: string; type: string;
}

export interface Transaction {
  id: number; description: string; amount: number; date: string; type: string; userId: number; categoryId: number; category: Category;
}

export interface SummaryData {
  monthlyIncome: number; monthlyExpense: number; totalBalance: number; monthlyBalance: number;
}

export type TransactionPayload = {
  description: string;
  amount: number;
  date: string;
  type: string;
  categoryId: number;
};

export interface User {
  id: number;
  name: string | null;
  email: string;
}

export async function registerUser(data: Record<string, string>) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro ao registrar.');
  }
  return response.json();
}

export async function loginUser(credentials: Record<string, string>) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro ao fazer login.');
  }
  return response.json();
}

export async function getSummaryData(): Promise<SummaryData> {
  const response = await fetch(`${API_BASE_URL}/summary`, { headers: getAuthHeaders() });
  if (!response.ok) throw new Error('Erro ao buscar dados de resumo.');
  return response.json();
}

export async function getTransactions(params: { type?: string, q?: string, limit?: number } = {}): Promise<Transaction[]> {
  const query = new URLSearchParams();
  if (params.type && params.type !== 'todas') query.append('type', params.type);
  if (params.q) query.append('q', params.q);
  if (params.limit) query.append('limit', String(params.limit));

  const response = await fetch(`${API_BASE_URL}/transactions?${query.toString()}`, { headers: getAuthHeaders() });
  if (!response.ok) throw new Error('Erro ao buscar transações.');
  return response.json();
}

export async function createTransaction(data: TransactionPayload) {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro ao criar transação.');
  }
  return response.json();
}

export async function updateTransaction(id: number, data: Partial<TransactionPayload>) {
  const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar transação.');
  return response.json();
}

export async function deleteTransaction(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao excluir transação.');
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/categories`, { headers: getAuthHeaders() });
  if (!response.ok) throw new Error('Erro ao buscar categorias.');
  return response.json();
}

export async function createCategory(data: Omit<Category, 'id'>) {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao criar categoria.');
  return response.json();
}

export async function updateCategory(id: number, data: Partial<Omit<Category, 'id'>>) {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar categoria.');
  return response.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao excluir categoria.');
}

export async function getCurrentUser(): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/me`, { headers: getAuthHeaders() });
  if (!response.ok) throw new Error('Erro ao buscar dados do usuário.');
  return response.json();
}

export async function updateUserProfile(data: { name?: string, email?: string }): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar o perfil.');
  return response.json();
}

export async function changePassword(data: Record<string, string>) {
  const response = await fetch(`${API_BASE_URL}/users/me/change-password`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro ao alterar a senha.');
  }

  return response.json();
}