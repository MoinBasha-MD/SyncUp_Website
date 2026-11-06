/**
 * Waitlist API. The site is a static export, so the backend lives at
 * api.crackman.in (override with NEXT_PUBLIC_API_URL for local dev).
 */
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://api.crackman.in").replace(/\/+$/, "");

export async function getWaitlistCount(): Promise<number | null> {
  try {
    const res = await fetch(`${API_BASE}/api/waitlist/count`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data?.count === "number" ? data.count : null;
  } catch {
    return null;
  }
}

export async function joinWaitlist(
  name: string,
  email: string
): Promise<{ count: number | null }> {
  const res = await fetch(`${API_BASE}/api/waitlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "Could not join right now. Please try again.");
  }
  return { count: typeof data?.count === "number" ? data.count : null };
}
