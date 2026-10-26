import { STATUSES } from './constants';

export const uid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);

export const todayISO = () => new Date().toISOString().slice(0, 10);

export const daysAgoISO = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
};

export const formatDate = (iso) =>
  iso
    ? new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

export function sortJobs(list, sortKey) {
  const copy = [...list];
  switch (sortKey) {
    case 'oldest':
      return copy.sort((a, b) => a.appliedDate.localeCompare(b.appliedDate));
    case 'company':
      return copy.sort((a, b) => a.company.localeCompare(b.company));
    case 'status':
      return copy.sort((a, b) => STATUSES.indexOf(b.status) - STATUSES.indexOf(a.status));
    case 'newest':
    default:
      return copy.sort((a, b) => b.appliedDate.localeCompare(a.appliedDate));
  }
}

export function getStats(jobs) {
  const count = (s) => jobs.filter((j) => j.status === s).length;
  const applied = jobs.filter((j) => j.status !== 'Wishlist').length;
  const responded = jobs.filter((j) => ['Interview', 'Offer', 'Rejected'].includes(j.status)).length;
  return {
    total: jobs.length,
    interviews: count('Interview'),
    offers: count('Offer'),
    responseRate: applied ? Math.round((responded / applied) * 100) : 0,
  };
}

export const statusCounts = (jobs) =>
  STATUSES.map((s) => ({ name: s, value: jobs.filter((j) => j.status === s).length })).filter(
    (d) => d.value > 0
  );

export function monthlyCounts(jobs, months = 6) {
  const now = new Date();
  return Array.from({ length: months }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    return {
      month: d.toLocaleString('en', { month: 'short' }),
      applications: jobs.filter((j) => j.appliedDate?.startsWith(key)).length,
    };
  });
}
