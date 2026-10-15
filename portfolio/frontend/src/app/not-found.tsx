import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="container-page py-32">
      <p className="label-caps text-accent">404 // NOT FOUND</p>
      <h1 className="display-hero mt-4 italic">This route doesn&apos;t exist.</h1>
      <p className="mt-6 text-lg text-fg-2">The page was moved, or never deployed.</p>
      <div className="mt-8">
        <Button href="/">Back home</Button>
      </div>
    </div>
  );
}
