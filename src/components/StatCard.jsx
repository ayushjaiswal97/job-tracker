export default function StatCard({ label, value, hint, accent = false }) {
  return (
    <div className={`rounded-xl p-4 sm:p-5 ${accent ? 'bg-ink text-white' : 'card'}`}>
      <p className={`text-sm ${accent ? 'text-slate-300' : 'text-slate-600'}`}>{label}</p>
      <p className="mt-1 font-display text-3xl font-bold sm:text-4xl">{value}</p>
      {hint && <p className={`mt-1 text-xs ${accent ? 'text-slate-400' : 'text-slate-500'}`}>{hint}</p>}
    </div>
  );
}
