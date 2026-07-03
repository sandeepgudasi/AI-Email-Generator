import { useState, useCallback } from 'react';
import { useEmailGenerator } from './hooks/useEmailGenerator';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import ToneSelector from './components/ToneSelector';
import EmailDisplay from './components/EmailDisplay';
import HistorySidebar from './components/HistorySidebar';

function Toast({ message, type, onClose }) {
  return (
    <div className={`toast toast-${type}`} onAnimationEnd={(e) => {
      if (e.animationName === 'fadeOut') onClose();
    }}>
      {type === 'success' && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      {type === 'error' && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      )}
      {message}
    </div>
  );
}

export default function App() {
  const {
    email,
    loading,
    error,
    history,
    historyLoading,
    generate,
    removeHistoryItem,
    clearAllHistory,
    selectHistoryItem,
  } = useEmailGenerator();

  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('professional');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      showToast('Please enter a prompt to generate an email', 'error');
      return;
    }
    try {
      await generate(prompt, tone);
      showToast('Email generated successfully!');
    } catch {
      // error state is handled by the hook
    }
  }, [prompt, tone, generate, showToast]);

  const handleCopy = useCallback((label) => {
    showToast(`${label} — copied to clipboard!`);
  }, [showToast]);

  const handleSelectHistory = useCallback((item) => {
    selectHistoryItem(item);
    setPrompt(item.prompt);
    setTone(item.tone);
    setSidebarOpen(false);
  }, [selectHistoryItem]);

  const handleClearAll = useCallback(async () => {
    try {
      await clearAllHistory();
      showToast('History cleared');
    } catch {
      showToast('Failed to clear history', 'error');
    }
  }, [clearAllHistory, showToast]);

  const handleDeleteItem = useCallback(async (id) => {
    try {
      await removeHistoryItem(id);
    } catch {
      showToast('Failed to delete item', 'error');
    }
  }, [removeHistoryItem, showToast]);

  return (
    <div className="app-layout">
      <HistorySidebar
        history={history}
        loading={historyLoading}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
        onSelect={handleSelectHistory}
        onDelete={handleDeleteItem}
        onClearAll={handleClearAll}
      />

      <main className="main-content">
        {/* Mobile sidebar toggle */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen((v) => !v)}
          title="Toggle history"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="toggle-badge">{history.length}</span>
        </button>

        <div className="main-inner">
          <Header />

          <div className="generator-section card">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              disabled={loading}
            />

            <ToneSelector
              selected={tone}
              onSelect={setTone}
            />

            <button
              className="btn btn-primary generate-btn"
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></div>
                  Generating...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Generate Email
                </>
              )}
            </button>
          </div>

          <EmailDisplay
            email={email}
            loading={loading}
            error={error}
            onRetry={handleGenerate}
            onCopy={handleCopy}
          />
        </div>
      </main>

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
