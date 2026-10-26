import { memo } from 'react';
import { STATUSES } from '../utils/constants';
import { formatDate } from '../utils/helpers';
import PipelineBar from './PipelineBar';

function JobRow({ job, onEdit, onDelete, onStatusChange }) {
  return (
    <li className="flex flex-col gap-3 p-4 md:grid md:grid-cols-[1.6fr_1.2fr_1fr_auto] md:items-center md:gap-4">
      <div className="min-w-0">
        <p className="truncate font-semibold">
          {job.link ? (
            <a href={job.link} target="_blank" rel="noopener noreferrer" className="hover:text-brand hover:underline">
              {job.company}
            </a>
          ) : job.company}
        </p>
        <p className="truncate text-sm text-slate-600">{job.role}</p>
        <p className="truncate text-xs text-slate-500">
          {[job.location, job.type].filter(Boolean).join(', ')}
        </p>
      </div>

      <div className="space-y-2">
        <PipelineBar status={job.status} />
        <label className="sr-only" htmlFor={`status-${job.id}`}>Change stage for {job.company}</label>
        <select
          id={`status-${job.id}`}
          value={job.status}
          onChange={(e) => onStatusChange(job.id, e.target.value)}
          className="input !w-auto !py-1 text-xs font-semibold"
        >
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="text-sm text-slate-600">
        <p>{formatDate(job.appliedDate)}</p>
        {job.salary && <p className="text-xs text-slate-500">{job.salary}</p>}
      </div>

      <div className="flex gap-2">
        <button className="btn-ghost !px-3 !py-1.5" onClick={() => onEdit(job)}>Edit</button>
        <button className="btn-ghost !px-3 !py-1.5 !text-rose-600" onClick={() => onDelete(job)}>Delete</button>
      </div>
    </li>
  );
}

export default memo(JobRow);
