import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import PipelineBar from './PipelineBar';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthForm({ mode }) {
  const isSignup = mode === 'signup';
  const { login, signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (isSignup && !form.name.trim()) e.name = 'Enter your name.';
    if (!EMAIL_RE.test(form.email)) e.email = 'Enter a valid email address.';
    if (form.password.length < 6) e.password = 'Use at least 6 characters.';
    if (isSignup && form.confirm !== form.password) e.confirm = 'Passwords do not match.';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError('');
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;
    setLoading(true);
    try {
      await (isSignup ? signup(form) : login(form));
      // PublicOnlyRoute redirects automatically once `user` is set.
    } catch (err) {
      setServerError(err.message);
      setLoading(false);
    }
  };

  const field = (name, label, type = 'text', autoComplete) => (
    <div>
      <label htmlFor={name} className="label">{label}</label>
      <input id={name} name={name} type={type} value={form[name]} onChange={set} autoComplete={autoComplete}
        className={`input ${errors[name] ? 'input-error' : ''}`} aria-invalid={Boolean(errors[name])} />
      {errors[name] && <p className="mt-1 text-xs text-rose-600">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="hidden flex-col justify-between bg-ink p-10 text-white lg:flex">
        <Logo light />
        <div>
          <h1 className="max-w-md text-4xl font-bold leading-tight">Every application, from wishlist to offer.</h1>
          <p className="mt-3 max-w-sm text-slate-300">Keep track of where you applied, what stage you are at, and what to follow up on next.</p>
          <div className="mt-8 space-y-4 text-sm">
            {['Wishlist', 'Applied', 'Interview', 'Offer'].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <span className="w-20 text-slate-300">{s}</span>
                <PipelineBar status={s} />
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-400">Demo project. Accounts are stored only in this browser.</p>
      </aside>

      <section className="flex items-center justify-center px-4 py-10">
        <form onSubmit={handleSubmit} noValidate className="w-full max-w-sm space-y-4">
          <div className="lg:hidden"><Logo /></div>
          <h2 className="text-3xl font-bold">{isSignup ? 'Create your account' : 'Welcome back'}</h2>
          {serverError && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{serverError}</p>}
          {isSignup && field('name', 'Name', 'text', 'name')}
          {field('email', 'Email', 'email', 'email')}
          {field('password', 'Password', 'password', isSignup ? 'new-password' : 'current-password')}
          {isSignup && field('confirm', 'Confirm password', 'password', 'new-password')}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Please wait...' : isSignup ? 'Create account' : 'Log in'}
          </button>
          <p className="text-center text-sm text-slate-600">
            {isSignup ? 'Already have an account? ' : 'New here? '}
            <Link to={isSignup ? '/login' : '/signup'} className="font-semibold text-brand hover:underline">
              {isSignup ? 'Log in' : 'Create an account'}
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
