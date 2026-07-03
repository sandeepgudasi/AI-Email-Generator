
const EXAMPLE_PROMPTS = [
  'Follow-up after a job interview',
  'Request for leave from work',
  'Cold outreach for a SaaS product',
  'Thank you note to a colleague',
  'Meeting reschedule request',
  'Project status update to manager',
];

export default function PromptInput({ value, onChange, disabled }) {
  const maxChars = 1000;

  const handleChipClick = (prompt) => {
    onChange(prompt);
  };

  return (
    <div className="prompt-input-wrapper">
      <label className="prompt-label">What email do you need?</label>
      <div className="prompt-textarea-container">
        <textarea
          className="textarea prompt-textarea"
          placeholder="Describe the email you want to generate..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxChars}
          disabled={disabled}
          rows={4}
        />
        <span className="char-count">
          {value.length}/{maxChars}
        </span>
      </div>
      <div className="example-chips">
        <span className="chips-label">Try:</span>
        {EXAMPLE_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            className="example-chip"
            onClick={() => handleChipClick(prompt)}
            disabled={disabled}
            type="button"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
