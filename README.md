# DotEye Order Tracker Frontend

React + Vite frontend for the DotEye Order Tracker application.

Production frontend: https://dot-eye-order-tracker-front-end.vercel.app

The frontend uses the deployed Render backend for REST requests and Socket.IO
realtime communication.

## Important

There is no frontend mock store. Users, orders, messages and disputes come from the backend API/database. Seed sample records with the backend `npm run seed` command.

## Setup

```bash
npm install
npm run dev
```

Create `.env` if required:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

The backend must be running on port 5000.

## Production deployment

This project is deployed on Vercel as a Vite application.

Vercel settings:

```text
Framework preset: Vite
Root directory: /
Build command: npm run build
Output directory: dist
```

Set these environment variables in Vercel for the Production environment:

```env
VITE_API_BASE_URL=https://doteyeordertracker-backend.onrender.com/api
VITE_SOCKET_URL=https://doteyeordertracker-backend.onrender.com
```

The API URL includes `/api` because REST routes are mounted below that prefix.
The Socket.IO URL uses the backend root and must not include `/api`.

The frontend uses the same JWT for both authenticated REST requests and the
Socket.IO handshake:

```js
const socket = io('https://doteyeordertracker-backend.onrender.com', {
	auth: {token},
})
```

After changing Vercel environment variables, redeploy the frontend because Vite
injects `VITE_*` values during the build.

## Integration flow

1. The user logs in through `POST /api/auth/login`.
2. The frontend stores the returned JWT locally for the current session.
3. REST requests send `Authorization: Bearer <token>`.
4. Socket.IO sends the same token as `auth.token`.
5. The backend validates the token, loads the user, and authorizes order rooms.
6. Chat, typing, order status, read receipts, and dispute updates use the
	 Socket.IO connection on the same Render backend.

The backend `CLIENT_URL` must exactly match this Vercel origin:

```text
https://dot-eye-order-tracker-front-end.vercel.app
```

## Production verification

- Open the production frontend and log in with a seeded account.
- Confirm browser requests use `/api/auth/login` and return successfully.
- Open the same order chat in two browser windows.
- Send a message and verify it appears in the other window.
- Test typing indicators and read receipts.
- Test an order status or dispute update with the appropriate accounts.
- The free Render service may need several seconds to wake after inactivity.

Do not commit `.env` files. Use `.env.example` for local configuration
templates and configure production values in Vercel and Render dashboards.
