export function StatusDot({ ping = true }: { ping?: boolean }) {
  return (
    <span className="relative flex h-2 w-2" aria-hidden>
      {ping && (
        <span className="absolute inline-flex h-full w-full rounded-full bg-status opacity-60 [animation:status-ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite]" />
      )}
      <span className="relative inline-flex h-2 w-2 rounded-full bg-status" />
    </span>
  );
}
