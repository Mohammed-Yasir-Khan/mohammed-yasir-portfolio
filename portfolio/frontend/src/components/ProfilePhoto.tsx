import Image from "next/image";
import { profile } from "@/lib/profile";

/** Shows frontend/public/profile.(jpg|png|webp) if present, otherwise a monogram. */
export function ProfilePhoto({
  src,
  size = "lg",
}: {
  src: string | null;
  size?: "sm" | "lg";
}) {
  const box =
    size === "lg" ? "aspect-square w-full max-w-xs rounded-lg" : "h-10 w-10 rounded-md";
  return (
    <div className={`relative shrink-0 overflow-hidden border border-border bg-surface ${box}`}>
      {src ? (
        <Image
          src={src}
          alt={`Portrait of ${profile.name}`}
          fill
          sizes={size === "lg" ? "320px" : "40px"}
          className="object-cover"
          priority={size === "lg"}
        />
      ) : (
        <span
          className={`absolute inset-0 flex items-center justify-center font-display italic text-muted ${
            size === "lg" ? "text-6xl" : "text-sm"
          }`}
        >
          {profile.initials}
        </span>
      )}
    </div>
  );
}
