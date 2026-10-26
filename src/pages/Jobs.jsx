import { useCallback, useState } from 'react';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import FilterBar from '../components/FilterBar';
import JobForm from '../components/JobForm';
import JobRow from '../components/JobRow';
import Modal from '../components/Modal';
import { useJobs } from '../context/JobsContext';
import { useJobFilters } from '../hooks/useJobFilters';

export default function Jobs() {
  const { jobs, addJob, updateJob, deleteJob, loadSamples } = useJobs();
  const filters = useJobFilters(jobs);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const openAdd = () => { setEditing(null); setFormOpen(true); };
  const openEdit = useCallback((job) => { setEditing(job); setFormOpen(true); }, []);
  const askDelete = useCallback((job) => setDeleting(job), []);
  const changeStatus = useCallback((id, status) => updateJob(id, { status }), [updateJob]);
  const closeForm = useCallback(() => setFormOpen(false), []);

  const handleSubmit = (data) => {
    if (editing) updateJob(editing.id, data);
    else addJob(data);
    setFormOpen(false);
  };

  const confirmDelete = () => {
    deleteJob(deleting.id);
    setDeleting(null);
  };

  const { visibleJobs } = filters;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Jobs</h1>
          <p className="text-sm text-slate-600">
            Showing {visibleJobs.length} of {jobs.length}
          </p>
        </div>
        <button className="btn-primary" onClick={openAdd}>Add job</button>
      </div>

      {jobs.length > 0 && <FilterBar filters={filters} />}

      {jobs.length === 0 ? (
        <EmptyState title="No applications yet" message="Add the first job you have applied to or want to apply to.">
          <button className="btn-primary" onClick={openAdd}>Add job</button>
          <button className="btn-ghost" onClick={loadSamples}>Load sample data</button>
        </EmptyState>
      ) : visibleJobs.length === 0 ? (
        <EmptyState title="Nothing matches" message="Try a different search or clear the filters.">
          <button className="btn-ghost" onClick={filters.reset}>Clear filters</button>
        </EmptyState>
      ) : (
        <ul className="card divide-y divide-slate-100">
          {visibleJobs.map((job) => (
            <JobRow key={job.id} job={job} onEdit={openEdit} onDelete={askDelete} onStatusChange={changeStatus} />
          ))}
        </ul>
      )}

      <Modal open={formOpen} title={editing ? 'Edit job' : 'Add job'} onClose={closeForm}>
        <JobForm key={editing?.id ?? 'new'} initial={editing} onSubmit={handleSubmit} onCancel={closeForm} />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete this job?"
        message={deleting ? `${deleting.role} at ${deleting.company} will be removed. This cannot be undone.` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
