import { JOB_TYPES, SORT_OPTIONS, STATUSES } from '../utils/constants';

export default function FilterBar({ filters }) {
  const { search, setSearch, status, setStatus, type, setType, sort, setSort, hasFilters, reset } = filters;
  return (
    <div className="card grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto] lg:items-end">
      <div className="sm:col-span-2 lg:col-span-1">
        <label htmlFor="search" className="label">Search</label>
        <input id="search" type="search" value={search} onChange={(e) => setSearch(e.target.value)} className="input" placeholder="Company, title, or city" />
      </div>
      <div>
        <label htmlFor="f-status" className="label">Stage</label>
        <select id="f-status" value={status} onChange={(e) => setStatus(e.target.value)} className="input">
          <option>All</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="f-type" className="label">Job type</label>
        <select id="f-type" value={type} onChange={(e) => setType(e.target.value)} className="input">
          <option>All</option>
          {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="f-sort" className="label">Sort by</label>
        <select id="f-sort" value={sort} onChange={(e) => setSort(e.target.value)} className="input">
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <button className="btn-ghost" onClick={reset} disabled={!hasFilters}>Clear filters</button>
    </div>
  );
}
