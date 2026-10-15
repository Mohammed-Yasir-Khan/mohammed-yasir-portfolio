// Small one-row diagram for project cards and project headers: first node = source (accent), last = outcome (green).
// Always one row: boxes share the width equally and their text wraps inside, so no arrow is ever left dangling.
export function FlowDiagram({ nodes }: { nodes: string[] }) {
  if (nodes.length === 0) return null;
  return (
    <div
      role="img"
      aria-label={`Flow: ${nodes.join(" to ")}`}
      className="flex w-full items-stretch justify-center"
    >
      {nodes.map((n, i) => {
        const first = i === 0;
        const last = i === nodes.length - 1 && nodes.length > 1;
        const tone = first
          ? "border-accent text-accent"
          : last
            ? "border-status text-status"
            : "border-border-strong text-fg-2";
        return (
          <div key={n + i} className="flex min-w-0 flex-1 items-center">
            <span
              className={`label-code flex min-h-12 min-w-0 flex-1 items-center justify-center break-words rounded-md border bg-bg px-1.5 py-1.5 text-center text-[10px] leading-tight sm:text-[11px] ${tone}`}
            >
              {n}
            </span>
            {i < nodes.length - 1 && (
              <span aria-hidden className="label-code shrink-0 px-0.5 text-accent sm:px-1">
                →
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
