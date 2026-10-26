# Interview guide: Hiretrack

## 1. The 30-second pitch
"I built Hiretrack, a job application tracker in React. You sign up, add the jobs you apply to, move them through stages like Applied, Interview, and Offer, and a dashboard shows your numbers and charts. It has protected routes, full CRUD, search, filtering and sorting, and it keeps data in localStorage. I used Context API and custom hooks for state, Tailwind for a responsive UI, and Recharts for the charts. I built it because I was tracking my own applications in a spreadsheet and wanted something better."

## 2. The 2-minute walkthrough
1. **Problem:** applications get scattered across emails and sheets, and it is hard to see where you stand.
2. **Auth:** a simulated login and signup. Users are stored in localStorage, and a session id says who is logged in. I was upfront that this is a demo, because real auth needs a server.
3. **Routing:** private pages sit behind `ProtectedRoute`, which redirects to login and remembers where the visitor was going.
4. **Data:** `JobsContext` exposes the job list and add, update, and delete functions. Each user's jobs are stored under their own key.
5. **List:** a custom hook `useJobFilters` combines debounced search, stage and type filters, and sorting into one derived list using `useMemo`.
6. **Dashboard:** stats are computed from the same job list, then fed into two Recharts charts.
7. **Polish:** form validation, empty states, a delete confirmation, responsive layout, and keyboard-accessible modals.

## 3. Challenges and what I learned
- **Stale state in updates:** I switched to functional updates (`setJobs(prev => ...)`) so rapid actions never overwrite each other.
- **Switching users:** the first version showed the previous user's jobs after logout and login. Rendering the provider with `key={user.id}` remounts it with the right storage key.
- **Recharts sizing:** `ResponsiveContainer` rendered at zero height until I gave its parent a fixed height.
- **Redirect after login:** I let `PublicOnlyRoute` handle the redirect when `user` becomes set, instead of calling `navigate` manually, which avoided a race between the two.

## 4. What I would improve
Add a Node, Express, and MongoDB backend with JWT auth, drag-and-drop Kanban, reminders, and tests with Vitest and React Testing Library. Being honest about limitations (fake auth, no tests) goes down well in interviews.

## 5. React interview questions and answers (based on this project)

### Fundamentals

**1. Why did you choose React for this project?**
The UI is driven by data that changes often (jobs, filters, stats), and React's component model and state-driven rendering make that easy to keep consistent. Components like `JobRow` and `StatCard` are reused across pages.

**2. What is the difference between state and props? Where did you use each?**
Props are inputs passed from a parent and are read-only; state is data a component owns and can change. `JobRow` receives `job` and callbacks as props, while `JobForm` owns its `form` and `errors` as state.

**3. What are controlled components? Show an example from your project.**
A controlled input has its value held in React state and updated through `onChange`. In `JobForm`, every input uses `value={form[name]}` and one `set` handler updates `form`. This makes validation and resetting simple.

**4. Why do list items need a `key`? What did you use?**
Keys let React match items between renders so it updates, moves, or removes the right DOM nodes and keeps component state attached to the right item. I used `job.id` (a UUID), not the array index, because the list is sorted and filtered, so indexes change.

**5. What is the Virtual DOM and how does reconciliation help here?**
React keeps a lightweight tree of the UI in memory, compares the new tree with the previous one after state changes, and applies only the differences to the real DOM. When I change one job's stage, only that row and the dependent stats update.

**6. Explain JSX. Is it required?**
JSX is syntax that looks like HTML but compiles to `React.createElement` calls (or the newer jsx runtime). It is not required, but it makes component code far easier to read.

### Hooks

**7. Why did you use `useMemo` in `useJobFilters`? Is it always needed?**
Filtering and sorting loop through the whole list, so I memoise the result and recompute only when jobs or filter values change. It is an optimisation, not a necessity: with 10 jobs it makes no visible difference, but it shows the pattern and keeps unrelated re-renders cheap.

**8. What does `useCallback` do and where did you use it?**
It returns the same function reference between renders unless dependencies change. In `Jobs.jsx` I wrapped `openEdit`, `askDelete`, and `changeStatus` so `React.memo` on `JobRow` is effective: otherwise new function props every render would defeat the memoisation.

**9. What does `React.memo` do? When does it help?**
It skips re-rendering a component if its props are shallow-equal to last time. It helps with long lists where a parent re-renders often (for example while typing in the search box). It is useless if you pass new object or function props each render.

**10. Explain `useEffect` and its cleanup. Give two examples from the project.**
`useEffect` runs side effects after render; the returned function cleans up before the next run or on unmount. In `useDebounce` the cleanup clears the timeout so only the last keystroke triggers an update. In `Modal`, the cleanup removes the Escape key listener and restores page scrolling.

**11. What is the dependency array and what happens if you get it wrong?**
It lists the values the effect uses; React re-runs the effect when any change. Missing dependencies cause stale values (bugs); extra or unstable ones cause needless re-runs or loops. That is why `onClose` is wrapped in `useCallback` before it goes into `Modal`'s effect.

**12. Walk me through your `useLocalStorage` hook.**
It takes a key and an initial value. The state's lazy initialiser reads and parses the stored value (with `try/catch` for bad JSON or blocked storage). An effect writes the value back whenever it changes. It returns `[value, setValue]`, the same shape as `useState`, so components use it without knowing about storage.

**13. Why use a lazy initialiser in `useState(() => ...)`?**
So the expensive work (reading and parsing localStorage) runs once on the first render rather than on every render.

**14. What is a custom hook and why write one?**
A function starting with `use` that calls other hooks to package reusable stateful logic. I wrote `useLocalStorage`, `useDebounce`, and `useJobFilters` so components stay focused on UI and the logic is reusable and testable.

**15. Why did you use functional updates like `setJobs(prev => ...)`?**
State updates are batched and asynchronous, so using the current variable can overwrite a pending update. The functional form always receives the latest state.

### State management and architecture

**16. Why Context API instead of Redux?**
The shared state is small: the current user and that user's jobs. Context is built in and enough here. Redux would add boilerplate without much benefit. I would consider it (or Zustand or React Query) if state grew, many components needed fine-grained updates, or I added server data.

**17. What are the downsides of Context?**
Every component consuming a context re-renders when its value changes, and there are no built-in selectors. I reduce the impact by splitting auth and jobs into separate contexts and memoising the `value` objects with `useMemo`.

**18. Why did you memoise the context `value`?**
Creating a new object on each render makes React treat the value as changed, re-rendering all consumers. `useMemo` keeps the same reference until something inside actually changes.

**19. What does `key={user.id}` on `JobsProvider` do?**
Changing a component's key makes React unmount and remount it. When a different user logs in, the provider remounts and reads that user's storage key, so jobs from the previous user never leak.

**20. Why throw an error in `useAuth` and `useJobs` when the context is missing?**
It fails fast with a clear message if a component is used outside its provider, instead of causing confusing `undefined` errors later.

**21. What is "derived state" and where did you use it?**
Values you can compute from existing state should not be stored separately. Stats, the visible job list, chart data, and even `user` (found from `users` and `sessionId`) are all computed, so they cannot get out of sync.

### Routing and auth

**22. How do protected routes work in your app?**
`ProtectedRoute` reads `user` from `AuthContext`. If there is a user it renders `<Outlet />` (the nested pages); otherwise it returns `<Navigate to="/login" replace state={{ from: location }} />`. After login, `PublicOnlyRoute` sends the user to `state.from` or `/`.

**23. Why `replace` in `Navigate`?**
It replaces the current history entry, so pressing Back does not return the user to a page that would just redirect them again.

**24. Is your authentication secure? What would you change?**
No. It is a front-end simulation: passwords are only Base64-encoded in localStorage, and route guards on the client can be bypassed. Real security needs a backend that hashes passwords, issues JWTs or session cookies (preferably `httpOnly`), and checks permissions on every API request. Frontend route guards only improve user experience.

**25. What is the difference between `BrowserRouter` and `HashRouter`? Which did you pick?**
`BrowserRouter` uses clean URLs (`/jobs`) but the server must serve `index.html` for all paths. `HashRouter` uses `/#/jobs`, which works on static hosts like GitHub Pages. I used `BrowserRouter` and deploy to Vercel or Netlify, which support rewrites.

### Forms, performance, and quality

**26. How did you validate forms?**
On submit, a pure `validate` function returns an errors object. If it has keys, I show messages beside the fields and stop. Fields get `aria-invalid` and labels are tied to inputs with `htmlFor`. For production I would consider React Hook Form with Zod or Yup.

**27. What is debouncing and why did you add it to search?**
Debouncing waits until the user pauses before acting. Without it, every keystroke re-filters and re-sorts the list. With a 250 ms debounce, filtering runs once after typing stops, while the input itself still updates instantly because it is bound to the un-debounced state.

**28. How would you handle thousands of jobs?**
Paginate or virtualise the list (`react-window`), move filtering and sorting to the server, and use a data layer like React Query for caching. Memoisation alone would not be enough.

**29. How did you make the app responsive and accessible?**
Tailwind breakpoints (for example the job row is stacked on mobile and a grid from `md` up), a modal that becomes a bottom sheet on small screens, labels on every input, `role="dialog"` with Escape to close, visible focus styles, and a `prefers-reduced-motion` rule. I would add automated checks with axe or Lighthouse.

**30. How would you test this app?**
Unit-test the pure helpers (`sortJobs`, `getStats`, `monthlyCounts`) with Vitest. Use React Testing Library for components and flows: add a job and see it in the list, filter by stage, redirect when logged out. Mock `localStorage` or clear it between tests. Add Playwright for one or two end-to-end flows.

**31. What happens if localStorage is full or disabled?**
Reads and writes are wrapped in `try/catch`, so the app falls back to in-memory state instead of crashing. Data just will not persist across refreshes.

**32. What would you do to move this to a full-stack app?**
Create an Express API with MongoDB: `POST /auth/signup`, `POST /auth/login`, and `GET/POST/PUT/DELETE /jobs` protected by JWT middleware. On the frontend, replace the localStorage logic inside the contexts with `fetch` or Axios calls, add loading and error states, and keep the component layer almost unchanged. That separation is why I put data logic in contexts and hooks.

## 6. Questions to ask the interviewer
- How does your team structure shared state in React apps?
- What does code review look like for a new developer?
- Which part of the frontend would a fresher be working on first?
