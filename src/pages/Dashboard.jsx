import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MonthlyBars, StatusDonut } from '../components/Charts';
import EmptyState from '../components/EmptyState';
import PipelineBar from '../components/PipelineBar';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobsContext';
import { formatDate, getStats, sortJobs } from '../utils/helpers';

export default function Dashboard() {
  const { user } = useAuth();
  const { jobs, loadSamples } = useJobs();
  const stats = useMemo(() => getStats(jobs), [jobs]);
  const recent = useMemo(() => sortJobs(jobs, 'newest').slice(0, 5), [jobs]);

  if (jobs.length === 0) {
    return (
      <EmptyState
        title={`Welcome, ${user.name.split(' ')[0]}`}
        message="You have not added any applications yet. Add your first one, or load sample data to see how the dashboard looks."
      >
        <Link to="/jobs" className="btn-primary">Add a job</Link>
        <button className="btn-ghost" onClick={loadSamples}>Load sample data</button>
      </EmptyState>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Hi {user.name.split(' ')[0]}, here is your search so far</h1>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Summary">
        <StatCard accent label="Applications tracked" value={stats.total} />
        <StatCard label="In interview" value={stats.interviews} />
        <StatCard label="Offers" value={stats.offers} />
        <StatCard label="Response rate" value={`${stats.responseRate}%`} hint="Replies out of applications sent" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <StatusDonut jobs={jobs} />
        <MonthlyBars jobs={jobs} />
      </section>

      <section className="card">
        <div className="flex items-center justify-between p-4 sm:p-5">
          <h2 className="text-lg font-bold">Latest applications</h2>
          <Link to="/jobs" className="text-sm font-semibold text-brand hover:underline">View all jobs</Link>
        </div>
        <ul className="divide-y divide-slate-100 border-t border-slate-100">
          {recent.map((j) => (
            <li key={j.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="truncate font-semibold">{j.company}</p>
                <p className="truncate text-sm text-slate-600">{j.role}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden sm:block"><PipelineBar status={j.status} /></span>
                <StatusBadge status={j.status} />
                <span className="hidden w-28 text-right text-sm text-slate-500 sm:block">{formatDate(j.appliedDate)}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
