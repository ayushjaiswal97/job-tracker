import {
  Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { STATUS_STYLES } from '../utils/constants';
import { monthlyCounts, statusCounts } from '../utils/helpers';

export function StatusDonut({ jobs }) {
  const data = statusCounts(jobs);
  return (
    <div className="card p-4 sm:p-5">
      <h3 className="text-lg font-bold">Where your applications stand</h3>
      <div className="h-64" role="img" aria-label="Donut chart of applications by stage">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
              {data.map((d) => <Cell key={d.name} fill={STATUS_STYLES[d.name].color} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
        {data.map((d) => (
          <li key={d.name} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: STATUS_STYLES[d.name].color }} />
            {d.name} ({d.value})
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MonthlyBars({ jobs }) {
  const data = monthlyCounts(jobs, 6);
  return (
    <div className="card p-4 sm:p-5">
      <h3 className="text-lg font-bold">Applications per month</h3>
      <div className="mt-2 h-64" role="img" aria-label="Bar chart of applications in the last six months">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip cursor={{ fill: '#F1F5F9' }} />
            <Bar dataKey="applications" fill="#2F4BFF" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
