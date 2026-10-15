# LLM Persona Content Generator

A small generative-AI learning project that explores how persona, audience, context, model choice, and output length affect LLM-generated content.

The application uses a Node.js/Express backend to send structured prompts to the OpenAI API and a lightweight browser UI to experiment with different prompt configurations.

## What the Project Demonstrates

- Prompt construction using system and user messages
- Persona-based generation
- Audience-aware content generation
- Context injection into prompts
- OpenAI API integration
- Token-usage tracking
- Response-latency tracking
- Input validation and centralized error handling
- Separation of routes, controllers, services, configuration, middleware, and frontend assets

## Project Structure

```text
llm-persona-content-generator/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── env.js
│   ├── controllers/
│   │   └── generate.controller.js
│   ├── routes/
│   │   └── generate.routes.js
│   ├── services/
│   │   └── openai.service.js
│   └── middleware/
│       └── error.middleware.js
├── public/
│   ├── index.html
│   ├── source.js
│   └── style.css
├── docs/
│   └── experiment-notes.md
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Tech Stack

- Node.js
- Express
- OpenAI API
- JavaScript
- HTML
- CSS
- dotenv

## How It Works

The browser sends a POST request to `/generate` with:

- `inputText` — the generation task
- `persona` — the role or style the model should adopt
- `audience` — the intended audience
- `context` — additional facts or constraints
- `model` — the OpenAI model to call
- `length` — maximum output tokens

The service layer builds a system message and combines it with the user request before sending it to the model.

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/emanbarakat/llm-persona-content-generator.git
cd llm-persona-content-generator
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

### 4. Start the application

```bash
npm start
```

Open `http://localhost:8080` in your browser.

A simple health-check endpoint is available at `GET /health`.

## Example API Request

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

## Current Scope

The backend currently uses OpenAI for generation. The codebase is structured so additional providers and evaluation features can be added later.

The portfolio refactor was based on static code inspection; the application was not rerun as part of that cleanup.

## Possible Next Improvements

- Add response evaluation and quality scoring
- Compare outputs from multiple LLM providers
- Add grounding and hallucination checks
- Calculate model cost dynamically
- Add automated tests
- Add prompt experiment logging and comparison

## Author

**Eman Barakat**
