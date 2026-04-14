# Backend (Express + Sequelize)

## Setup

1. Copy env file:

```bash
cp .env.example .env
```

2. Fill in DB + JWT env vars in `.env`.

## Run

```bash
npm run dev
```

## Endpoints

- `GET /health`
- `POST /auth/login` body: `{ "email": "...", "password": "..." }`
- `POST /auth/refresh` body: `{ "refreshToken": "..." }`
- `GET /users` (Bearer access token)

