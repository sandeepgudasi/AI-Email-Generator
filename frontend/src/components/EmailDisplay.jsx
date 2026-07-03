import CopyButton from './CopyButton';
import LoadingSpinner from './LoadingSpinner';

export default function EmailDisplay({ email, loading, error, onRetry, onCopy }) {
  if (loading) {
    return (
      <div className="email-display card fade-in">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="email-display card fade-in">
        <div className="email-error">
          <div className="error-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h3 className="error-title">Generation Failed</h3>
          <p className="error-message">{error}</p>
          <button className="btn btn-primary" onClick={onRetry}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="email-display card">
        <div className="email-empty">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h3 className="empty-title">Your email will appear here</h3>
          <p className="empty-subtitle">Enter a prompt, select a tone, and click Generate</p>
        </div>
      </div>
    );
  }

  const fullEmail = `Subject: ${email.subject}\n\n${email.body}`;

  return (
    <div className="email-display card fade-in">
      <div className="email-header">
        <div className="email-header-left">
          <h3 className="email-section-title">Generated Email</h3>
          {email.tone && (
            <span className="email-tone-badge">{email.tone}</span>
          )}
        </div>
        <div className="email-actions">
          <CopyButton text={email.subject} label="Copy Subject" onCopy={onCopy} />
          <CopyButton text={fullEmail} label="Copy All" onCopy={onCopy} />
        </div>
      </div>

      <div className="email-content">
        <div className="email-subject-row">
          <span className="email-subject-label">Subject:</span>
          <span className="email-subject-text">{email.subject}</span>
        </div>
        <div className="email-body">
          {email.body}
        </div>
      </div>
    </div>
  );
}
