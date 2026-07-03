function getRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

const TONE_COLORS = {
  professional: '#6366f1',
  friendly: '#22c55e',
  formal: '#f59e0b',
  casual: '#a855f7',
};

export default function HistorySidebar({
  history,
  loading,
  isOpen,
  onToggle,
  onSelect,
  onDelete,
  onClearAll,
}) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onToggle}></div>}

      <aside className={`history-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title-row">
            <h2 className="sidebar-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              History
              {history.length > 0 && (
                <span className="history-count">{history.length}</span>
              )}
            </h2>
            <button className="sidebar-close-btn" onClick={onToggle} title="Close sidebar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          {history.length > 0 && (
            <button className="clear-all-btn" onClick={onClearAll}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Clear All
            </button>
          )}
        </div>

        <div className="sidebar-list">
          {loading && (
            <div className="sidebar-loading">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-item">
                  <div className="skeleton" style={{ width: '80%', height: '14px', marginBottom: '8px' }}></div>
                  <div className="skeleton" style={{ width: '50%', height: '12px' }}></div>
                </div>
              ))}
            </div>
          )}

          {!loading && history.length === 0 && (
            <div className="sidebar-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <p>No emails generated yet</p>
              <span>Your email history will show up here</span>
            </div>
          )}

          {!loading &&
            history.map((item) => (
              <div
                key={item.id}
                className="history-item"
                onClick={() => onSelect(item)}
              >
                <div className="history-item-content">
                  <p className="history-prompt">{item.prompt}</p>
                  <div className="history-meta">
                    <span
                      className="history-tone-badge"
                      style={{
                        backgroundColor: `${TONE_COLORS[item.tone] || '#6366f1'}20`,
                        color: TONE_COLORS[item.tone] || '#6366f1',
                        borderColor: `${TONE_COLORS[item.tone] || '#6366f1'}40`,
                      }}
                    >
                      {item.tone}
                    </span>
                    <span className="history-time">
                      {getRelativeTime(item.created_at)}
                    </span>
                  </div>
                </div>
                <button
                  className="history-delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  title="Delete"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            ))}
        </div>
      </aside>
    </>
  );
}
