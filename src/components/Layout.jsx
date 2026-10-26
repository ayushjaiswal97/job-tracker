import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { JobsProvider } from '../context/JobsContext';
import Navbar from './Navbar';

export default function Layout() {
  const { user } = useAuth();
  return (
    <JobsProvider key={user.id}>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </JobsProvider>
  );
}
