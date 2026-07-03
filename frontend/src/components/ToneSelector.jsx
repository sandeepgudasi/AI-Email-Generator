const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
];

export default function ToneSelector({ selected, onSelect }) {
  return (
    <div className="tone-selector">
      <label className="tone-label">Select Tone</label>
      <div className="tone-pills">
        {TONES.map((tone) => (
          <button
            key={tone.value}
            className={`tone-pill ${selected === tone.value ? 'tone-pill-active' : ''}`}
            onClick={() => onSelect(tone.value)}
            type="button"
          >
            <span className="tone-text">{tone.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
