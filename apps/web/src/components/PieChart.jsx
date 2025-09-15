import { useMemo } from "react";

export default function PieChart({ data, size = 180, strokeWidth = 24 }) {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  const segments = useMemo(() => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let accumulated = 0;
    return data.map((d) => {
      const fraction = total > 0 ? d.value / total : 0;
      const length = fraction * circumference;
      const dashArray = `${length} ${circumference - length}`;
      const dashOffset = circumference * 0.25 - accumulated; // start at 12 o'clock
      accumulated += length;
      return { ...d, dashArray, dashOffset };
    });
  }, [data, circumference]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={strokeWidth}
      />
      {segments.map((seg, idx) => (
        <circle
          key={idx}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={seg.color}
          strokeWidth={strokeWidth}
          strokeDasharray={seg.dashArray}
          strokeDashoffset={seg.dashOffset}
          strokeLinecap="butt"
        />
      ))}
    </svg>
  );
}

