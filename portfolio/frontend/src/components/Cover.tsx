import Image from "next/image";

// Deterministic 0..1 pseudo-random numbers from a string, so each post keeps the same art on every build.
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

/** Generated cover: a small architecture-style diagram in the brand colors (no stock images). */
function CoverArt({ seed, label }: { seed: string; label?: string }) {
  const rnd = seeded(seed);
  // Four nodes left to right; x/w are bounded so the last node always stays inside the 400px canvas.
  const nodes = Array.from({ length: 4 }, (_, i) => ({
    x: 24 + i * 92 + rnd() * 8,
    y: 40 + rnd() * 90,
    w: 56 + rnd() * 10,
  }));
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" role="img" aria-label={label ?? "Cover art"} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" className="fill-surface-2" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={i * 50} x2={i * 50} y1="0" y2="250" className="stroke-border" strokeWidth="1" />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={`h${i}`} y1={i * 50} y2={i * 50} x1="0" x2="400" className="stroke-border" strokeWidth="1" />
      ))}
      {nodes.slice(0, -1).map((n, i) => (
        <line
          key={`l${i}`}
          x1={n.x + n.w}
          y1={n.y + 14}
          x2={nodes[i + 1].x}
          y2={nodes[i + 1].y + 14}
          className="stroke-accent"
          strokeWidth="1.5"
          strokeDasharray={i % 2 ? "4 4" : undefined}
        />
      ))}
      {nodes.map((n, i) => (
        <rect
          key={i}
          x={n.x}
          y={n.y}
          width={n.w}
          height="28"
          rx="4"
          className={`fill-bg ${i === 0 ? "stroke-accent" : i === nodes.length - 1 ? "stroke-status" : "stroke-border-strong"}`}
          strokeWidth="1.5"
        />
      ))}
      {label && (
        <text x="22" y="226" className="fill-muted" style={{ font: "500 11px var(--font-jetbrains), monospace", letterSpacing: "0.12em" }}>
          {label.toUpperCase()}
        </text>
      )}
    </svg>
  );
}

export function Cover({
  cover,
  slug,
  label,
  alt,
  priority,
}: {
  cover: string | null;
  slug: string;
  label?: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
      {cover ? (
        <Image
          src={cover}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
          <CoverArt seed={slug} label={label} />
        </div>
      )}
    </div>
  );
}
