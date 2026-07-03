export default function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner-orb"></div>
      <div className="loading-text">
        Generating your email
        <span className="loading-dots">
          <span className="dot dot-1">.</span>
          <span className="dot dot-2">.</span>
          <span className="dot dot-3">.</span>
        </span>
      </div>
      <p className="loading-subtext">This may take a few seconds</p>
    </div>
  );
}
