import { useState, useEffect, useCallback } from 'react';
import {
  generateEmail as apiGenerateEmail,
  getHistory as apiGetHistory,
  deleteHistoryItem as apiDeleteHistoryItem,
  clearHistory as apiClearHistory,
} from '../services/api';

export function useEmailGenerator() {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const data = await apiGetHistory(0, 50);
      setHistory(data.items || []);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const generate = useCallback(async (prompt, tone) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGenerateEmail(prompt, tone);
      setEmail(data);
      // Refresh history after generating
      fetchHistory();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchHistory]);

  const removeHistoryItem = useCallback(async (id) => {
    try {
      await apiDeleteHistoryItem(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Failed to delete history item:', err);
      throw err;
    }
  }, []);

  const clearAllHistory = useCallback(async () => {
    try {
      await apiClearHistory();
      setHistory([]);
    } catch (err) {
      console.error('Failed to clear history:', err);
      throw err;
    }
  }, []);

  const selectHistoryItem = useCallback((item) => {
    setEmail({
      subject: item.subject,
      body: item.body,
      prompt: item.prompt,
      tone: item.tone,
    });
    setError(null);
  }, []);

  return {
    email,
    loading,
    error,
    history,
    historyLoading,
    generate,
    fetchHistory,
    removeHistoryItem,
    clearAllHistory,
    selectHistoryItem,
  };
}
