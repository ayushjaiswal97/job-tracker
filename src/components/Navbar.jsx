import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
    isActive ? 'bg-brand-soft text-brand' : 'text-slate-600 hover:text-ink'
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-8">
          <Logo />
          <nav className="flex gap-1" aria-label="Main">
            <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
            <NavLink to="/jobs" className={linkClass}>Jobs</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-slate-600 sm:inline">{user.name}</span>
          <button onClick={logout} className="btn-ghost !px-3 !py-1.5">Log out</button>
        </div>
      </div>
    </header>
  );
}
