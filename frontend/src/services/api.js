const API_BASE = 'http://localhost:8000';

function getHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  fetchData: async (endpoint, options = {}) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }));
      throw new Error(error.detail || 'Request failed');
    }
    
    return response.json();
  }
};

export async function generateEmail(prompt, tone, provider = null, model = null) {
  const body = { prompt, tone };
  if (provider) body.provider = provider;
  if (model) body.model = model;

  const response = await fetch(`${API_BASE}/api/generate`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to generate email' }));
    throw new Error(error.detail || 'Failed to generate email');
  }

  return response.json();
}

export async function getHistory(skip = 0, limit = 20) {
  const response = await fetch(`${API_BASE}/api/history?skip=${skip}&limit=${limit}`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch history');
  return response.json();
}

export async function deleteHistoryItem(id) {
  const response = await fetch(`${API_BASE}/api/history/${id}`, { 
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete history item');
}

export async function clearHistory() {
  const response = await fetch(`${API_BASE}/api/history`, { 
    method: 'DELETE',
    headers: getHeaders(), 
  });
  if (!response.ok) throw new Error('Failed to clear history');
}
