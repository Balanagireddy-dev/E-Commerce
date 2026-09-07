export type ClassValue = string | number | boolean | null | undefined;

/** Minimal className joiner — keeps the template dependency-free. */
export function clsx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
