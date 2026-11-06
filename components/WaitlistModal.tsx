"use client";

import { useEffect, useRef, useState } from "react";
import { joinWaitlist } from "@/lib/waitlist";

interface WaitlistModalProps {
  onClose: () => void;
  initialCount: number | null;
  onJoined: (count: number) => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function WaitlistModal({ onClose, initialCount, onJoined }: WaitlistModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [joinedCount, setJoinedCount] = useState<number | null>(initialCount);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => nameRef.current?.focus(), 60);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const result = await joinWaitlist(trimmedName, trimmedEmail);
      if (result.count !== null) {
        setJoinedCount(result.count);
        onJoined(result.count);
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not join right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="waitlist-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="waitlist-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-title"
      >
        <button className="waitlist-close" onClick={onClose} aria-label="Close waitlist">
          ×
        </button>

        {done ? (
          <div className="waitlist-success">
            <div className="waitlist-heart" aria-hidden="true">💜</div>
            <h3 id="waitlist-title" className="waitlist-title">You&apos;re in sync.</h3>
            <p className="waitlist-sub">
              Thanks{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""} — we&apos;ll email you
              when your invite is ready.
            </p>
            <p className="waitlist-success-count">
              {joinedCount && joinedCount > 0 ? (
                <>
                  You&apos;re one of <strong>{joinedCount.toLocaleString()}</strong> people in sync 💜
                </>
              ) : (
                <>You&apos;re first in line 💜</>
              )}
            </p>
            <button className="cta-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <span className="act-label">Early access</span>
            <h3 id="waitlist-title" className="waitlist-title">Join Syncup</h3>
            <p className="waitlist-sub">
              Be first in sync. We&apos;ll email you when your invite is ready.
            </p>

            <form onSubmit={submit} noValidate>
              <label className="waitlist-label" htmlFor="waitlist-name">Name</label>
              <input
                ref={nameRef}
                id="waitlist-name"
                className="waitlist-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                maxLength={80}
                required
              />

              <label className="waitlist-label" htmlFor="waitlist-email">Email</label>
              <input
                id="waitlist-email"
                className="waitlist-input"
                type="email"
                inputMode="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                maxLength={254}
                required
              />

              {error && <p className="waitlist-error" role="alert">{error}</p>}

              <button type="submit" className="cta-primary waitlist-submit" disabled={submitting}>
                {submitting ? "Joining…" : "Join the waitlist 💜"}
              </button>
              <p className="waitlist-privacy">Just your name and email. No spam.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
