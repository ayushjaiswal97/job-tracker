export default function Logo({ light = false }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill={light ? '#fff' : '#2F4BFF'} />
        <path d="M8 20h4v-4H8zm6 0h4v-8h-4zm6 0h4V9h-4z" fill={light ? '#2F4BFF' : '#fff'} />
      </svg>
      <span className={`font-display text-xl font-bold ${light ? 'text-white' : 'text-ink'}`}>Hiretrack</span>
    </span>
  );
}
