# Hiretrack: Job Application Tracker

A React app for tracking job applications from wishlist to offer. Built as a portfolio project with no backend: authentication is simulated and all data lives in the browser's `localStorage`.

> Add screenshots to `docs/screenshots/` and link them here (see `docs/SCREENSHOTS_CHECKLIST.md`).

## Features

- Login and signup with form validation (simulated authentication)
- Protected routes: logged-out users are redirected to the login page and sent back after logging in
- Add, edit, and delete job applications (full CRUD) with a confirmation step before delete
- Change a job's stage inline from the list
- Search (debounced), filter by stage and job type, and sort four ways
- Dashboard with summary numbers and two Recharts charts (donut by stage, bars per month)
- Pipeline bar on every job showing how far it has progressed
- Per-user data: two accounts on the same browser never see each other's jobs
- Responsive layout, keyboard-friendly modals, labelled form fields, reduced-motion support
- "Load sample data" button for demos and screenshots

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 18 (function components and hooks) |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router 6 |
| Charts | Recharts |
| State | Context API + `useState`/`useMemo`/`useCallback` |
| Persistence | `localStorage` through a custom hook |

## Getting started

```bash
git clone https://github.com/<your-username>/hiretrack-job-tracker.git
cd hiretrack-job-tracker
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build locally
```

Requires Node.js 18 or newer.

## Project structure

```
src/
  main.jsx                 App entry: Router + AuthProvider
  App.jsx                  Route table
  index.css                Tailwind layers and shared classes (.btn, .input, .card)
  context/
    AuthContext.jsx        users, session, signup / login / logout
    JobsContext.jsx        jobs for the logged-in user, add / update / delete
  hooks/
    useLocalStorage.js     useState that persists to localStorage
    useDebounce.js         delays a fast-changing value (search box)
    useJobFilters.js       search + filter + sort state and the derived list
  components/              Layout, Navbar, route guards, Modal, JobForm, JobRow, FilterBar, Charts, ...
  pages/                   Login, Signup, Dashboard, Jobs, NotFound
  utils/                   constants, helpers (sorting, stats, dates), sample data
```

## How it works

**Authentication (simulated).** `AuthContext` keeps a list of users and the current session id in `localStorage`. Signup and login wait 600 ms to mimic a network call, and passwords are only Base64-encoded. This is for demonstration. A real app sends credentials over HTTPS to a server that hashes them (bcrypt or argon2) and returns a token or session cookie.

**Protected routes.** `ProtectedRoute` renders `<Outlet />` when a user exists and otherwise redirects to `/login`, remembering the page the visitor wanted. `PublicOnlyRoute` does the reverse for the login and signup pages.

**Per-user data.** `Layout` renders `<JobsProvider key={user.id}>`. The key forces a fresh provider when the user changes, and each user's jobs are stored under `hiretrack_jobs_<userId>`.

**Filtering.** `useJobFilters` holds the filter state and computes the visible list with `useMemo`, so the list only recalculates when jobs or filters change. Search input is debounced by 250 ms.

## Data model

```js
{
  id: 'uuid',
  company: 'Razorpay',
  role: 'Frontend Developer',
  location: 'Bengaluru',
  type: 'Full-time',          // Full-time | Internship | Contract | Part-time
  status: 'Interview',        // Wishlist | Applied | Interview | Offer | Rejected
  salary: '8 LPA',
  appliedDate: '2026-10-20',  // YYYY-MM-DD
  link: 'https://...',
  notes: '',
  createdAt: 'ISO timestamp'
}
```

## Deployment

- **Vercel / Netlify:** import the repo. Build command `npm run build`, output directory `dist`. For Netlify add a `public/_redirects` file containing `/* /index.html 200` so refreshing on `/jobs` works.
- **GitHub Pages:** it has no server rewrites, so switch `BrowserRouter` to `HashRouter` in `main.jsx` and set `base: '/<repo-name>/'` in `vite.config.js`.

## Known limitations

- Data exists only in one browser; clearing site data deletes it.
- Authentication is a demo and not secure.
- No automated tests yet.

## Ideas for next steps

1. Replace localStorage and fake auth with Node + Express + MongoDB and JWT (a natural full-stack follow-up).
2. Drag-and-drop Kanban board by stage.
3. Follow-up reminders and a calendar view.
4. Unit tests with Vitest and React Testing Library.
5. Export and import jobs as CSV.

## License

MIT
