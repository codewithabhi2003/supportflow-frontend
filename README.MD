# SupportFlow Frontend

React + Vite single-page app for SupportFlow. Talks to the Express backend
over REST, handles its own JWT session, and renders everything client-side —
no server-side rendering, no backend logic lives here.

## Tech stack

| Layer | Technology |
|---|---|
| Build tool | Vite |
| UI | React 18 + Tailwind CSS |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Charts | Recharts |
| HTTP | Axios |
| Toasts | react-hot-toast |
| Icons | lucide-react |

## Folder structure

```
.
├── src/
│   ├── components/
│   │   ├── auth/          AuthShell, ProtectedRoute
│   │   ├── layout/         Sidebar, TopBar, AppLayout
│   │   ├── tickets/        table, badges, create modal
│   │   ├── ticket-detail/  AI analysis, notes, status, timeline
│   │   ├── dashboard/      KPI cards, growth/pie charts, insights
│   │   └── common/         Button, Input, Modal, Avatar, etc.
│   ├── pages/               Home, Login, Register, Dashboard, Tickets,
│   │                        TicketDetail, Customers, Analytics, Settings, Profile
│   ├── context/             AuthContext (JWT session, login/register/logout)
│   ├── hooks/                useTickets, useTicketDetail, useDashboard, useTheme
│   ├── services/             api.js (axios instance), ticketService, authService
│   ├── utils/                 formatDate, statusColors, debounce, avatar
│   ├── App.jsx                Route definitions
│   └── main.jsx                Entry point, wraps App in AuthProvider + BrowserRouter
├── index.html
├── vite.config.js
└── tailwind.config.js
```

## Environment variables

Copy `.env.example` to `.env`:

| Variable | Required | Notes |
|---|---|---|
| `VITE_API_URL` | No | Defaults to `http://localhost:5000/api`. Point this at your backend — local or deployed. |

Vite only reads `.env` at startup — restart `npm run dev` after changing it.

## Run locally

```bash
npm install
cp .env.example .env    # set VITE_API_URL if not using the local default
npm run dev              # http://localhost:5173
```

## Authentication

The JWT and logged-in user are kept in `localStorage` (`supportflow-token`,
`supportflow-user`). `src/services/api.js` attaches the token to every
request automatically and clears the session on a real `401` from the
backend. `ProtectedRoute` guards every page except `/`, `/login`, and
`/register` — visiting a protected route while logged out redirects to
`/login` and back once you sign in.

## Deploying

### Vercel (recommended)

1. vercel.com → New Project → import this repo.
2. Framework preset: Vite (auto-detected).
3. Environment Variables → add `VITE_API_URL` pointing at your deployed
   backend, e.g. `https://supportflow-backend-3ayz.onrender.com/api`.
4. Deploy. Vercel builds with `npm run build` and serves `dist/` automatically.
5. Go back to the backend's `CLIENT_URL` environment variable and set it to
   this Vercel URL — CORS will reject every request otherwise.

### Render (Static Site — alternative)

Same repo, different host: New → Static Site → connect this repo → Build
Command `npm run build` → Publish Directory `dist`. Add `VITE_API_URL` under
Environment the same way. Static Site hosting doesn't run a server process,
so unlike the backend, there's no spin-down/cold-start concern here — no
health-check workflow needed for this piece.

Either host works identically from the app's perspective — pick based on
where you'd rather manage it, not because one is more "correct."

## CI (`.github/workflows/frontend-ci.yml`)

Runs `npm install` then `npm run build` on every push/PR to `main`, and
confirms `dist/index.html` actually exists afterward. A failed build here
means the app is genuinely broken — bad imports, JSX syntax errors, or a
dependency issue — not a style preference. It doesn't deploy anything;
Vercel/Render deploy on their own once connected to GitHub.

There's no scheduled "keep warm" workflow for the frontend the way there is
for the backend — static hosting doesn't spin down the way Render's free
Web Service tier does, so there's nothing to ping.