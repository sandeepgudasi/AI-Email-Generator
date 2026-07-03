import json

import google.generativeai as genai
from openai import OpenAI

from app.config import get_settings

SYSTEM_PROMPT_TEMPLATE = """You are a professional email writing assistant. Generate an email based on the user's request.

Tone: {tone}

Rules:
- Write ONLY the email content
- Match the requested tone precisely
- Be concise and effective
- Use appropriate greeting and sign-off for the tone
- Do NOT include any meta-commentary

You MUST respond in this exact JSON format:
{{
  "subject": "Email subject line here",
  "body": "Full email body here with proper formatting using \\n for newlines"
}}

Respond ONLY with valid JSON. No markdown, no code blocks, no extra text."""


def generate_email(prompt: str, tone: str) -> dict:
    """Generate an email using the configured AI provider.

    Args:
        prompt: User's description of the email to generate.
        tone: Desired tone (professional, friendly, formal, casual).

    Returns:
        Dict with 'subject' and 'body' keys.

    Raises:
        ValueError: If the configured AI provider is not supported.
        Exception: If the AI API call fails.
    """
    settings = get_settings()
    provider = settings.AI_PROVIDER.lower()

    if provider == "gemini":
        return _generate_gemini(prompt, tone, settings)
    elif provider == "openai":
        return _generate_openai(prompt, tone, settings)
    elif provider == "openrouter":
        return _generate_openrouter(prompt, tone, settings)
    elif provider == "ollama":
        return _generate_ollama(prompt, tone, settings)
    else:
        raise ValueError(f"Unsupported AI provider: {provider}")


def _generate_gemini(prompt: str, tone: str, settings) -> dict:
    """Generate email using Google Gemini API."""
    genai.configure(api_key=settings.AI_API_KEY)
    model = genai.GenerativeModel(settings.AI_MODEL)

    system_prompt = SYSTEM_PROMPT_TEMPLATE.format(tone=tone)
    full_prompt = f"{system_prompt}\n\nUser request: {prompt}"

    response = model.generate_content(full_prompt)
    return _parse_response(response.text)


def _generate_openai(prompt: str, tone: str, settings) -> dict:
    """Generate email using OpenAI API."""
    client = OpenAI(api_key=settings.AI_API_KEY)

    system_prompt = SYSTEM_PROMPT_TEMPLATE.format(tone=tone)

    response = client.chat.completions.create(
        model=settings.AI_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
    )
    return _parse_response(response.choices[0].message.content)


def _generate_openrouter(prompt: str, tone: str, settings) -> dict:
    """Generate email using OpenRouter API (OpenAI-compatible endpoint)."""
    client = OpenAI(
        api_key=settings.AI_API_KEY,
        base_url="https://openrouter.ai/api/v1",
    )

    system_prompt = SYSTEM_PROMPT_TEMPLATE.format(tone=tone)

    response = client.chat.completions.create(
        model=settings.AI_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
    )
    return _parse_response(response.choices[0].message.content)


def _generate_ollama(prompt: str, tone: str, settings) -> dict:
    """Generate email using local Ollama instance (OpenAI-compatible endpoint)."""
    client = OpenAI(
        api_key="ollama", # API key is not required for Ollama
        base_url=settings.OLLAMA_BASE_URL,
    )

    system_prompt = SYSTEM_PROMPT_TEMPLATE.format(tone=tone)

    response = client.chat.completions.create(
        model=settings.AI_MODEL,
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
