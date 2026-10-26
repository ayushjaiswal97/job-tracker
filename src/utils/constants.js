export const STATUSES = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];
export const PIPELINE = ['Wishlist', 'Applied', 'Interview', 'Offer'];
export const JOB_TYPES = ['Full-time', 'Internship', 'Contract', 'Part-time'];

// Full class strings so Tailwind can detect them at build time.
export const STATUS_STYLES = {
  Wishlist: { badge: 'bg-slate-100 text-slate-700 ring-slate-200', color: '#64748B' },
  Applied: { badge: 'bg-blue-50 text-blue-700 ring-blue-200', color: '#2F4BFF' },
  Interview: { badge: 'bg-amber-50 text-amber-800 ring-amber-200', color: '#D98E04' },
  Offer: { badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200', color: '#12905F' },
  Rejected: { badge: 'bg-rose-50 text-rose-700 ring-rose-200', color: '#D6336C' },
};

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'company', label: 'Company A to Z' },
  { value: 'status', label: 'Pipeline stage' },
];

export const STORAGE_KEYS = {
  users: 'hiretrack_users',
  session: 'hiretrack_session',
  jobsPrefix: 'hiretrack_jobs_',
};
