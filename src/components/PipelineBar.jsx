import { PIPELINE, STATUS_STYLES } from '../utils/constants';

export default function PipelineBar({ status }) {
  const reached = status === 'Rejected' ? 1 : PIPELINE.indexOf(status);
  const color = STATUS_STYLES[status].color;
  return (
    <div className="flex gap-1" role="img" aria-label={`Pipeline stage: ${status}`}>
      {PIPELINE.map((stage, i) => (
        <span
          key={stage}
          title={stage}
          className="h-1.5 w-8 rounded-full bg-slate-200"
          style={i <= reached ? { backgroundColor: color } : undefined}
        />
      ))}
    </div>
  );
}
