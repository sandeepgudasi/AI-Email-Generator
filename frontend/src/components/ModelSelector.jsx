import React from 'react';

const PROVIDERS = {
  gemini: {
    label: 'Google Gemini',
    models: [
      { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
      { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
    ]
  },
  openai: {
    label: 'OpenAI',
    models: [
      { id: 'gpt-4o', label: 'GPT-4o' },
      { id: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    ]
  },
  openrouter: {
    label: 'OpenRouter',
    models: [
      { id: 'anthropic/claude-3-opus', label: 'Claude 3 Opus' },
      { id: 'meta-llama/llama-3-8b-instruct', label: 'Llama 3 8B' },
    ]
  },
  ollama: {
    label: 'Ollama (Local)',
    models: [
      { id: 'llama3', label: 'Llama 3' },
      { id: 'mistral', label: 'Mistral' },
    ]
  }
};

export default function ModelSelector({ provider, model, onModelChange, disabled }) {
  const combinedValue = `${provider}|${model}`;

  const handleChange = (e) => {
    const [newProvider, newModel] = e.target.value.split('|');
    onModelChange(newProvider, newModel);
  };

  return (
    <div className="model-selector-group">
      <div className="form-group">
        <label htmlFor="ai-model">AI Provider & Model</label>
        <div className="select-wrapper">
          <select
            id="ai-model"
            className="model-select single-select"
            value={combinedValue}
            onChange={handleChange}
            disabled={disabled}
          >
            {Object.entries(PROVIDERS).map(([providerKey, data]) => (
              <optgroup key={providerKey} label={data.label}>
                {data.models.map((m) => (
                  <option key={m.id} value={`${providerKey}|${m.id}`}>
                    {data.label} - {m.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="select-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
