const snowflakes = [
  ["7%", "2s", "11s"], ["18%", "5s", "14s"], ["31%", "0s", "13s"], ["48%", "7s", "16s"],
  ["63%", "3s", "12s"], ["77%", "8s", "15s"], ["91%", "1s", "17s"]
];

export function ChristmasDecorations() {
  return (
    <div className="snow-field" aria-hidden="true">
      {snowflakes.map(([left, delay, duration]) => (
        <span key={left} className="snowflake" style={{ left, animationDelay: delay, animationDuration: duration }} />
      ))}
    </div>
  );
}
