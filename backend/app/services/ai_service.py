import json

import google.generativeai as genai
from openai import OpenAI

from app.config import get_settings

SYSTEM_PROMPT_TEMPLATE = """You are an expert email writing assistant. Generate an email based on the user's request.

Crucial Instruction: You MUST strictly adopt a "{tone}" tone for the entire email.

Tone Guidelines:
- professional: Use formal business language, be direct, clear, and maintain a respectful distance.
- friendly: Use warm, approachable language, and a positive, conversational style.
- formal: Use highly respectful, traditional formatting, avoiding contractions and colloquialisms.
- casual: Use relaxed, everyday language, as if writing to a close colleague or friend.

Rules:
- Write ONLY the email content
- Ensure the "{tone}" tone is obvious from the vocabulary, greeting, and sign-off
- Be concise and effective
- Do NOT include any meta-commentary

You MUST respond in this exact JSON format:
{{
  "subject": "Email subject line here",
  "body": "Full email body here with proper formatting using \\n for newlines"
}}

Respond ONLY with valid JSON. No markdown, no code blocks, no extra text."""


def generate_email(prompt: str, tone: str, provider: str | None = None, model: str | None = None) -> dict:
    """Generate an email using the specified AI provider and model.

    Args:
        prompt: User's description of the email to generate.
        tone: Desired tone (professional, friendly, formal, casual).
        provider: AI provider to use. Defaults to settings if None.
        model: AI model to use. Defaults to settings if None.

    Returns:
        Dict with 'subject' and 'body' keys.

    Raises:
        ValueError: If the configured AI provider is not supported.
        Exception: If the AI API call fails.
    """
    settings = get_settings()
    actual_provider = (provider or settings.AI_PROVIDER).lower()
    actual_model = model or settings.AI_MODEL

    if actual_provider == "gemini":
        return _generate_gemini(prompt, tone, settings, actual_model)
    elif actual_provider == "openai":
        return _generate_openai(prompt, tone, settings, actual_model)
    elif actual_provider == "openrouter":
        return _generate_openrouter(prompt, tone, settings, actual_model)
    elif actual_provider == "ollama":
        return _generate_ollama(prompt, tone, settings, actual_model)
    else:
        raise ValueError(f"Unsupported AI provider: {actual_provider}")


def _generate_gemini(prompt: str, tone: str, settings, model_name: str) -> dict:
    """Generate email using Google Gemini API."""
    genai.configure(api_key=settings.AI_API_KEY)
    model = genai.GenerativeModel(model_name)

    system_prompt = SYSTEM_PROMPT_TEMPLATE.format(tone=tone)
    full_prompt = f"{system_prompt}\n\nUser request: {prompt}"

    response = model.generate_content(full_prompt)
    return _parse_response(response.text)


def _generate_openai(prompt: str, tone: str, settings, model_name: str) -> dict:
    """Generate email using OpenAI API."""
    client = OpenAI(api_key=settings.AI_API_KEY)

    system_prompt = SYSTEM_PROMPT_TEMPLATE.format(tone=tone)

    response = client.chat.completions.create(
        model=model_name,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
    )
    return _parse_response(response.choices[0].message.content)


def _generate_openrouter(prompt: str, tone: str, settings, model_name: str) -> dict:
    """Generate email using OpenRouter API (OpenAI-compatible endpoint)."""
    client = OpenAI(
        api_key=settings.AI_API_KEY,
        base_url="https://openrouter.ai/api/v1",
    )

    system_prompt = SYSTEM_PROMPT_TEMPLATE.format(tone=tone)

    response = client.chat.completions.create(
        model=model_name,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
    )
    return _parse_response(response.choices[0].message.content)


def _generate_ollama(prompt: str, tone: str, settings, model_name: str) -> dict:
    """Generate email using local Ollama instance (OpenAI-compatible endpoint)."""
    client = OpenAI(
        api_key="ollama", # API key is not required for Ollama
        base_url=settings.OLLAMA_BASE_URL,
    )

    system_prompt = SYSTEM_PROMPT_TEMPLATE.format(tone=tone)

    response = client.chat.completions.create(
        model=model_name,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
        response_format={"type": "json_object"},
    )
    return _parse_response(response.choices[0].message.content)


def _parse_response(text: str) -> dict:
    """Parse AI response, handling potential markdown code blocks and extra text."""
    start_idx = text.find('{')
    end_idx = text.rfind('}')
    
    if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
        json_str = text[start_idx:end_idx+1]
        try:
            data = json.loads(json_str)
            return {
                "subject": data.get("subject", "No Subject"),
                "body": data.get("body", text),
            }
        except json.JSONDecodeError:
            pass

    # Fallback if no valid JSON found
    fallback_text = text.strip()
    
    # Try to clean up basic JSON-like strings if it failed to parse
    fallback_text = fallback_text.replace('{\n"subject":', '')
    fallback_text = fallback_text.replace('{\n  "subject":', '')
    fallback_text = fallback_text.replace('{"subject":', '')
    fallback_text = fallback_text.replace('\\n', '\n')
    fallback_text = fallback_text.replace('\\"', '"')
    
    import re
    fallback_text = re.sub(r'".*?",\s*"body":\s*"(.*?)"\s*}', r'\1', fallback_text, flags=re.DOTALL)
    fallback_text = fallback_text.replace('}\n}', '').strip()

    return {
        "subject": "Generated Email",
        "body": fallback_text,
    }
