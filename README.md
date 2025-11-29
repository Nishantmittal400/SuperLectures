# SuperLectures


This is a single-page web app that lets teachers generate an OHCR-based session plan for any concept.

- **Backend**: Node + Express + OpenAI Responses API
- **Frontend**: React + Vite
- **Storage**: None (all plans are generated in-memory on demand)

## Structure

- `server/` – Backend API
- `client/` – Frontend SPA

## Setup

### 1. Backend

```bash
cd server
cp .env.example .env
# edit .env and set OPENAI_API_KEY properly

npm install
npm run dev   # or: npm start

