import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const staging = mkdtempSync(join(tmpdir(), "tour-frames-"));
const source = join(root, "public/video/house-tour-seamless-1080p.mp4");

// Preserve the original 12 fps / 286-frame scroll timing. Export directly
// from the 1080p master, with restrained luma-only sharpening and WebP q82.
try {
  for (const set of ["desktop", "mobile"]) mkdirSync(join(staging, set));
  const result = spawnSync("ffmpeg", [
    "-hide_banner", "-loglevel", "warning", "-i", source,
    "-filter_complex",
    "[0:v]fps=12,unsharp=5:5:0.3:3:3:0,split=2[desktop][portrait];[portrait]crop=810:1080[mobile]",
    "-map", "[desktop]", "-c:v", "libwebp", "-quality", "82", "-compression_level", "6",
    join(staging, "desktop/f_%04d.webp"),
    "-map", "[mobile]", "-c:v", "libwebp", "-quality", "82", "-compression_level", "6",
    join(staging, "mobile/f_%04d.webp"),
  ], { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Frame export failed (${result.status})`);

  // Validate both sequences before replacing any served files.
  for (const set of ["desktop", "mobile"]) {
    const files = readdirSync(join(staging, set)).sort();
    if (files.length !== 286 || files.some((name, i) => name !== `f_${String(i + 1).padStart(4, "0")}.webp`)) {
      throw new Error(`Unexpected frame sequence for ${set}`);
    }
  }
  for (const set of ["desktop", "mobile"]) {
    cpSync(join(staging, set), join(root, "public/frames", set), { recursive: true });
  }
  console.log("Exported 286 desktop (1920×1080) and mobile (810×1080) frames.");
} finally {
  rmSync(staging, { recursive: true, force: true });
}
