# Request Logger API

A small backend service to create requests and track their lifecycle.

## Endpoints

- `POST /request` – create a request  
- `GET /request` – list all requests  
- `GET /request/:id` – get request by id  
- `PATCH /request/:id/status` – advance request status  

## Status Flow
- PENDING->PROCESSING->COMPLETED

## Stack

- Node.js
- Express
- Prisma


Installation

```bash
bun install
```

To run:

```bash
bun run dev
```

