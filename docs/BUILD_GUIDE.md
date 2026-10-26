# Build guide: how this project was built, step by step

Follow this order if you want to rebuild it yourself or explain your process in an interview. Each step ends in something you can run and see.

## Step 1: Scaffold and tooling
```bash
npm create vite@latest hiretrack-job-tracker -- --template react
cd hiretrack-job-tracker
npm install react-router-dom recharts
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```
Set `content: ['./index.html', './src/**/*.{js,jsx}']` in `tailwind.config.js`, and put the three `@tailwind` lines in `src/index.css`. Run `npm run dev` and confirm a Tailwind class works.

## Step 2: Constants and helpers (`src/utils`)
Define statuses, job types, sort options, and storage keys in one place. Write pure functions for sorting, stats, and date formatting. Pure functions are easy to test and reuse.

## Step 3: `useLocalStorage` hook
Initialise state from `localStorage` with a lazy initialiser, then write back in `useEffect`. Wrap both in `try/catch`.

## Step 4: `AuthContext`
Store users and the session id with `useLocalStorage`. Expose `user`, `signup`, `login`, `logout`. Add the artificial delay and error messages so the UI has loading and error states to show.

## Step 5: Routing and guards
Create `ProtectedRoute` and `PublicOnlyRoute` using `<Outlet />`. Build `App.jsx` with nested routes and `Layout` as the shell for private pages.

## Step 6: Login and signup UI
One `AuthForm` component for both pages. Validate on submit, show field errors, disable the button while loading.

## Step 7: `JobsContext` and CRUD
Provide `jobs`, `addJob`, `updateJob`, `deleteJob`. Always use functional updates (`setJobs(prev => ...)`) so updates never use stale state.

## Step 8: Jobs page UI
Build `Modal`, `JobForm` (with validation), `JobRow`, and `ConfirmDialog`. Wire add, edit, and delete.

## Step 9: Search, filter, sort
Create `useDebounce` and `useJobFilters`. Build `FilterBar`. Add empty states for "no jobs" and "no matches".

## Step 10: Dashboard
Compute stats with `useMemo`. Add `StatCard`, then the two Recharts charts. Wrap each chart in a parent with a fixed height so `ResponsiveContainer` can measure it.

## Step 11: Polish
Responsive checks at 375, 768, and 1280 px. Keyboard test (Tab, Escape). Check empty states. Add the sample-data button.

## Step 12: Ship
Write the README, add screenshots, push to GitHub, deploy to Vercel or Netlify, and put the live link at the top of the README.
