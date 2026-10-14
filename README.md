# LLM Persona Content Generator

A small full-stack generative AI project that explores how persona, audience, context, model choice, and output length affect LLM-generated content.

The application sends structured prompt inputs to an OpenAI model through a Node.js/Express API and returns the generated text together with basic execution metadata such as token usage and latency.

## What the Project Demonstrates

- Prompt construction using system and user messages
- Persona-based generation
- Audience-aware content generation
- Context injection into prompts
- OpenAI API integration
- Token-usage tracking
- Response-latency tracking
- Basic error handling
- A lightweight browser UI for testing different prompt inputs

## Tech Stack

- Node.js
- Express
- OpenAI API
- JavaScript
- HTML
- CSS
- dotenv

## How It Works

The API accepts a request containing:

- `inputText` — the generation task
- `persona` — the role/style the model should adopt
- `audience` — the intended audience
- `context` — additional facts or constraints
- `model` — the OpenAI model to call
- `length` — maximum completion tokens

The server builds a system message similar to:

```text
You are a {persona} writing for {audience}. Context: {context}
```

and combines it with the user request before sending it to the model.

## Example Request

```json
{
  "inputText": "Write a funny product description for a smart water bottle.",
  "persona": "witty marketer",
  "audience": "students",
  "length": 60,
  "model": "gpt-4o-mini",
  "context": [
    "Tracks hydration",
    "Phone app sync",
    "Reminders to drink"
  ]
}
```

## Example Response Structure

```json
{
  "title": "Generated Content",
  "body": "Model-generated content appears here.",
  "style": "witty marketer",
  "citations": [],
  "moderation_flags": "",
  "tokens": {
    "prompt": 44,
    "completion": 60
  },
  "latency_ms": 1711,
  "cost_est": 0.0031
}
```

> Note: `cost_est` is currently a demo placeholder rather than a dynamic pricing calculation.

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/emanbarakat/PersonaApp.git
cd PersonaApp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the environment

Copy `.env.example` to `.env` and add your own OpenAI API key:

```env
OPENAI_API_KEY=your_api_key_here
```

Never commit your real API key.

### 4. Start the API

```bash
npm start
```

The API runs on:

```text
http://localhost:8080
```

### 5. Test the endpoint

Send a POST request to:

```text
POST /generate
```

The repository also contains a lightweight UI under `views/` for experimenting with prompt inputs.

## Current Scope

The backend currently uses OpenAI for generation. The interface contains early experimentation around additional providers, but multi-provider execution is not yet implemented.

## Possible Next Improvements

- Add response evaluation and quality scoring
- Compare outputs from multiple LLM providers
- Add grounding and hallucination checks
- Calculate model cost dynamically
- Add input validation
- Add automated tests
- Serve the frontend directly from Express
- Add prompt experiment logging and comparison

## Why I Built This

This project is part of my practical work with generative AI and LLM-based applications. It focuses on understanding how prompt structure, personas, audiences, contextual information, and model parameters influence generated responses.

## Author

**Eman Barakat**

AI & Software Development | LLMs | Generative AI
