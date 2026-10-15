import fs from "node:fs";
import path from "node:path";

const CANDIDATES = ["profile.jpg", "profile.jpeg", "profile.png", "profile.webp"];

/** Returns "/profile.jpg" (etc.) if a photo exists in frontend/public, otherwise null. Server-only. */
export function getProfilePhoto(): string | null {
  const dir = path.join(process.cwd(), "public");
  const found = CANDIDATES.find((f) => fs.existsSync(path.join(dir, f)));
  return found ? `/${found}` : null;
}
