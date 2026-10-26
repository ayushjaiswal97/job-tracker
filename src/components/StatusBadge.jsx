import { STATUS_STYLES } from '../utils/constants';

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${STATUS_STYLES[status].badge}`}>
      {status}
    </span>
  );
}
