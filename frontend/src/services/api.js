const API_BASE = 'http://localhost:8000';

export async function generateEmail(prompt, tone) {
  const response = await fetch(`${API_BASE}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, tone }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to generate email' }));
    throw new Error(error.detail || 'Failed to generate email');
  }

  return response.json();
}

export async function getHistory(skip = 0, limit = 20) {
  const response = await fetch(`${API_BASE}/api/history?skip=${skip}&limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch history');
  return response.json();
}

export async function deleteHistoryItem(id) {
  const response = await fetch(`${API_BASE}/api/history/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete history item');
}

export async function clearHistory() {
  const response = await fetch(`${API_BASE}/api/history`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to clear history');
}
