import { useMemo, useState } from 'react';
import { useDebounce } from './useDebounce';
import { sortJobs } from '../utils/helpers';

export function useJobFilters(jobs) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [type, setType] = useState('All');
  const [sort, setSort] = useState('newest');
  const debouncedSearch = useDebounce(search, 250);

  const visibleJobs = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    const filtered = jobs.filter(
      (j) =>
        (status === 'All' || j.status === status) &&
        (type === 'All' || j.type === type) &&
        (!q || `${j.company} ${j.role} ${j.location}`.toLowerCase().includes(q))
    );
    return sortJobs(filtered, sort);
  }, [jobs, debouncedSearch, status, type, sort]);

  const hasFilters = search !== '' || status !== 'All' || type !== 'All';
  const reset = () => {
    setSearch('');
    setStatus('All');
    setType('All');
  };

  return { search, setSearch, status, setStatus, type, setType, sort, setSort, visibleJobs, hasFilters, reset };
}
