import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="font-display text-6xl font-bold text-brand">404</p>
      <h1 className="text-2xl font-bold">This page does not exist</h1>
      <Link to="/" className="btn-primary">Go to dashboard</Link>
    </div>
  );
}
