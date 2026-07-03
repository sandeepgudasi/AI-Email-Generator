import { useAuth } from '../hooks/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <div className="header-text">
          <h1 className="header-title">AI Email Generator</h1>
          <p className="header-subtitle">Generate professional emails with AI</p>
        </div>
        {user && (
          <div className="header-actions" style={{ marginLeft: 'auto' }}>
            <button className="btn btn-outline" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
