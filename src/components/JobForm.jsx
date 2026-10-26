import { useState } from 'react';
import { JOB_TYPES, STATUSES } from '../utils/constants';
import { todayISO } from '../utils/helpers';

const EMPTY = {
  company: '', role: '', location: '', type: 'Full-time', status: 'Applied',
  salary: '', appliedDate: todayISO(), link: '', notes: '',
};

function validate(form) {
  const errors = {};
  if (!form.company.trim()) errors.company = 'Enter the company name.';
  if (!form.role.trim()) errors.role = 'Enter the job title.';
  if (!form.appliedDate) errors.appliedDate = 'Pick a date.';
  if (form.link && !/^https?:\/\//i.test(form.link.trim())) errors.link = 'Link must start with http:// or https://';
  return errors;
}

export default function JobForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [errors, setErrors] = useState({});

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    onSubmit({
      ...form,
      company: form.company.trim(),
      role: form.role.trim(),
      location: form.location.trim(),
      salary: form.salary.trim(),
      link: form.link.trim(),
      notes: form.notes.trim(),
    });
  };

  const field = (name, label, props = {}) => (
    <div>
      <label htmlFor={name} className="label">{label}</label>
      <input
        id={name} name={name} value={form[name]} onChange={set}
        className={`input ${errors[name] ? 'input-error' : ''}`}
        aria-invalid={Boolean(errors[name])}
        {...props}
      />
      {errors[name] && <p className="mt-1 text-xs text-rose-600">{errors[name]}</p>}
    </div>
  );

  const select = (name, label, options) => (
    <div>
      <label htmlFor={name} className="label">{label}</label>
      <select id={name} name={name} value={form[name]} onChange={set} className="input">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {field('company', 'Company', { placeholder: 'e.g. Razorpay', autoFocus: true })}
        {field('role', 'Job title', { placeholder: 'e.g. Frontend Developer' })}
        {field('location', 'Location', { placeholder: 'City or Remote' })}
        {field('salary', 'Salary (optional)', { placeholder: 'e.g. 6 LPA' })}
        {select('type', 'Job type', JOB_TYPES)}
        {select('status', 'Stage', STATUSES)}
        {field('appliedDate', 'Date', { type: 'date' })}
        {field('link', 'Job link (optional)', { type: 'url', placeholder: 'https://' })}
      </div>
      <div>
        <label htmlFor="notes" className="label">Notes (optional)</label>
        <textarea id="notes" name="notes" rows={3} value={form.notes} onChange={set} className="input" placeholder="Recruiter name, interview date, referral..." />
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary">{initial?.id ? 'Save changes' : 'Add job'}</button>
      </div>
    </form>
  );
}
