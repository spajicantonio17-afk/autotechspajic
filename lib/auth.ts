// Minimal shared-team gate for the internal pages. Intentionally simple —
// a single shared password stored in INTERNAL_PASSWORD, kept in a cookie.
// Not meant as high-security auth, just to keep the quick-entry tool private.
export const INTERN_COOKIE = "intern_auth";

export function isValidPassword(value: string | undefined): boolean {
  const expected = process.env.INTERNAL_PASSWORD;
  if (!expected) return false;
  return Boolean(value) && value === expected;
}
