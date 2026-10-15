// Architecture diagram for project pages and blog posts, same visual language as the small card diagrams.
// Usage inside an .mdx file (see SPEC.md section 7.8):
//
//   <Arch title="My flow" layers={[
//     { label: "Input", nodes: [{ t: "Source", tone: "accent" }, "Step 2"] },
//     { label: "Output", gap: "sends result", nodes: [{ t: "Done", sub: "what it means", tone: "status" }] },
//   ]} />
//
// A layer is one row. Nodes in a row are connected by arrows (a sequence), unless link is "none" (alternatives or
// parallel items). Between layers a down arrow is drawn, with an optional text label (gap).

type Tone = "accent" | "status" | "warn" | "ext";
type ArchNode = string | { t: string; sub?: string; tone?: Tone };
type Layer = {
  label?: string;
  nodes: ArchNode[];
  /** "arrow" (default): nodes are a sequence. "none": alternatives or parallel items, no arrows. */
  link?: "arrow" | "none";
  /** Text shown beside the down arrow that leaves this layer. */
  gap?: string;
  /** "none": do not draw a down arrow after this layer (use for alternatives). */
  after?: "arrow" | "none";
};

const toneClass: Record<Tone | "base", string> = {
  base: "border-border-strong text-fg-2",
  accent: "border-accent text-accent",
  status: "border-status text-status",
  warn: "border-accent border-dashed text-accent",
  ext: "border-border-strong border-dashed text-muted",
};

function NodeBox({ node }: { node: ArchNode }) {
  const n = typeof node === "string" ? { t: node } : node;
  const tone = toneClass[n.tone ?? "base"];
  return (
    <div className={`min-w-0 flex-1 rounded-md border bg-bg px-2 py-2.5 text-center ${tone}`}>
      <span className="label-code block break-words text-[10.5px] leading-snug tracking-normal">{n.t}</span>
      {n.sub && (
        <span className="mt-1 block break-words text-[10.5px] font-normal leading-snug text-muted">
          {n.sub}
        </span>
      )}
    </div>
  );
}

export function Arch({ title, layers }: { title?: string; layers: Layer[] }) {
  return (
    <figure className="not-prose overflow-hidden rounded-lg border border-border bg-surface">
      {title && (
        <figcaption className="label-caps border-b border-border px-4 py-2.5 text-accent">
          {title}
        </figcaption>
      )}
      <div className="p-4 md:p-6">
        {layers.map((layer, i) => {
          const sequence = (layer.link ?? "arrow") === "arrow";
          const last = i === layers.length - 1;
          return (
            <div key={i}>
              <div className="grid gap-2 md:grid-cols-[7rem_1fr] md:items-center md:gap-3">
                <p className="label-caps text-[10px] text-muted">{layer.label}</p>
                <div className="flex flex-col items-stretch gap-1 md:flex-row md:items-stretch">
                  {layer.nodes.map((node, j) => (
                    <div key={j} className="flex min-w-0 flex-1 flex-col items-stretch gap-1 md:flex-row md:items-center">
                      <NodeBox node={node} />
                      {sequence && j < layer.nodes.length - 1 && (
                        <>
                          <span aria-hidden className="label-code self-center text-accent md:hidden">↓</span>
                          <span aria-hidden className="label-code hidden shrink-0 text-accent md:inline">→</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {!last &&
                (layer.after === "none" ? (
                  <div className="my-3 border-t border-dashed border-border" />
                ) : (
                  <div className="flex items-center gap-3 py-2.5 md:pl-[8.25rem]">
                    <span aria-hidden className="label-code text-accent">↓</span>
                    {layer.gap && <span className="label-code text-[11px] text-muted">{layer.gap}</span>}
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </figure>
  );
}
