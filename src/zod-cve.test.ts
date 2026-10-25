import { describe, expect, test } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const lock = JSON.parse(
  readFileSync(resolve(repoRoot, "package-lock.json"), "utf8"),
) as { packages?: Record<string, { version?: string }> };

const zodVersion = lock.packages?.["node_modules/zod"]?.version;

describe("GHSA-mrhx-c7xc-m3w5 (zod email ReDoS)", () => {
  test("zod resolves to a CVE-fixed release (>=4.6.6)", () => {
    expect(zodVersion).toBeDefined();
    const [major, minor, patch] = (zodVersion ?? "")
      .split(".")
      .map((part) => Number(part));
    expect(major).toBeGreaterThanOrEqual(4);
    if (major === 4) {
      expect(minor).toBeGreaterThanOrEqual(6);
      if (minor === 6) {
        expect(patch).toBeGreaterThanOrEqual(6);
      }
    }
  });
});
