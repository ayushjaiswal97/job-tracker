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

## How it works

**Authentication (simulated).** `AuthContext` keeps a list of users and the current session id in `localStorage`. Signup and login wait 600 ms to mimic a network call, and passwords are only Base64-encoded. This is for demonstration. A real app sends credentials over HTTPS to a server that hashes them (bcrypt or argon2) and returns a token or session cookie.

**Protected routes.** `ProtectedRoute` renders `<Outlet />` when a user exists and otherwise redirects to `/login`, remembering the page the visitor wanted. `PublicOnlyRoute` does the reverse for the login and signup pages.

**Per-user data.** `Layout` renders `<JobsProvider key={user.id}>`. The key forces a fresh provider when the user changes, and each user's jobs are stored under `hiretrack_jobs_<userId>`.

**Filtering.** `useJobFilters` holds the filter state and computes the visible list with `useMemo`, so the list only recalculates when jobs or filters change. Search input is debounced by 250 ms.

