import { createContext, useCallback, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';
import { uid } from '../utils/helpers';
import { makeSampleJobs } from '../utils/sampleData';

const JobsContext = createContext(null);

// Rendered with key={user.id} in Layout, so each user gets their own storage key and state.
export function JobsProvider({ children }) {
  const { user } = useAuth();
  const [jobs, setJobs] = useLocalStorage(`${STORAGE_KEYS.jobsPrefix}${user.id}`, []);

  const addJob = useCallback(
    (data) => setJobs((prev) => [{ ...data, id: uid(), createdAt: new Date().toISOString() }, ...prev]),
    [setJobs]
  );

  const updateJob = useCallback(
    (id, changes) => setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...changes } : j))),
    [setJobs]
  );

  const deleteJob = useCallback((id) => setJobs((prev) => prev.filter((j) => j.id !== id)), [setJobs]);

  const loadSamples = useCallback(
    () =>
      setJobs((prev) => [
        ...makeSampleJobs().map((j) => ({ ...j, id: uid(), createdAt: new Date().toISOString() })),
        ...prev,
      ]),
    [setJobs]
  );

  const value = useMemo(
    () => ({ jobs, addJob, updateJob, deleteJob, loadSamples }),
    [jobs, addJob, updateJob, deleteJob, loadSamples]
  );
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error('useJobs must be used inside <JobsProvider>');
  return ctx;
}
