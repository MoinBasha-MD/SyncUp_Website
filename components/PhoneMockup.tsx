"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { useMemo } from "react";

// ===== Phone Shell (legacy — kept for compatibility) =====
export function Phone({ children, tilt = true }: { children: ReactNode; tilt?: boolean }) {
  return (
    <div className="phone-container">
      <div className="relative">
        <div className="phone-glow" />
        <motion.div
          initial={{ opacity: 0, y: 40, rotateY: tilt ? -20 : 0 }}
          whileInView={{ opacity: 1, y: 0, rotateY: tilt ? -12 : 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`phone ${tilt ? "phone-tilt" : ""}`}
        >
          <div className="phone-notch" />
          <div className="phone-screen">
            <div className="phone-status-bar">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <span style={{ fontSize: "0.6rem" }}>●●●</span>
                <span style={{ fontSize: "0.6rem" }}>📶</span>
                <span style={{ fontSize: "0.6rem" }}>🔋</span>
              </span>
            </div>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ===== Home / Logo Screen (shown before Status section) =====
export function HomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center" style={{ flex: 1, padding: "2rem 1.5rem" }}>
      {/* Logo orb */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8"
      >
        <div className="relative" style={{ width: "80px", height: "80px" }}>
          {/* Outer rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: "rgba(139,92,246,0.2)" }} />
            <div className="absolute inset-2 rounded-full border" style={{ borderColor: "rgba(167,139,250,0.3)" }} />
            <div className="absolute inset-4 rounded-full border" style={{ borderColor: "rgba(196,181,253,0.4)" }} />
          </motion.div>
          {/* Core glow */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-6 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(196,181,253,0.8), rgba(139,92,246,0.4), transparent 70%)",
              filter: "blur(6px)",
            }}
          />
          {/* Core dot */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-8 rounded-full"
            style={{
              background: "linear-gradient(135deg, #c4b5fd, #8b5cf6)",
              boxShadow: "0 0 30px rgba(167,139,250,0.8)",
            }}
          />
        </div>
      </motion.div>

      {/* Syncup text */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="gradient-text-static"
        style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "0.75rem" }}
      >
        Syncup
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        style={{ fontSize: "0.85rem", color: "var(--fg-muted)", textAlign: "center", lineHeight: 1.5, letterSpacing: "0.05em" }}
      >
        One life. One rhythm. One sync.
      </motion.p>

      {/* Decorative particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: "3px",
              height: "3px",
              background: "rgba(196,181,253,0.6)",
              left: `${15 + (i * 7) % 70}%`,
              top: `${20 + (i * 11) % 60}%`,
              position: "absolute",
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ===== Hero Screen — product demo showing people + status + availability =====
export function HeroScreen() {
  const people = [
    { name: "Alex Chen", initials: "AC", status: "Free", badge: "available", detail: "Coffee & conversation" },
    { name: "Sam Rivera", initials: "SR", status: "Available", badge: "available", detail: "Open to a call" },
    { name: "Jordan Park", initials: "JP", status: "Busy", badge: "busy", detail: "In a meeting" },
    { name: "Maya Singh", initials: "MS", status: "Free", badge: "available", detail: "Working on something" },
  ];

  return (
    <>
      <div className="phone-header">
        <h3>Syncup</h3>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full"
          style={{ width: "10px", height: "10px", background: "linear-gradient(135deg, #c4b5fd, #8b5cf6)", boxShadow: "0 0 12px rgba(167,139,250,0.8)" }}
        />
      </div>

      <div className="phone-content">
        {/* Subtle label */}
        <div className="text-xs font-bold px-1 pb-2" style={{ color: "var(--purple-bright)", letterSpacing: "0.1em" }}>
          RHYTHMS NOW
        </div>

        {people.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: i * 0.1 }}
            className="phone-list-item"
            style={{ background: p.badge === "available" ? "rgba(139,92,246,0.06)" : "transparent" }}
          >
            <div className="phone-avatar">
              {p.initials}
              <span className={`phone-status-badge ${p.badge}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold truncate" style={{ color: "#fff" }}>{p.name}</div>
              <div className="text-xs font-semibold" style={{ color: p.badge === "available" ? "var(--purple-bright)" : "var(--fg-dim)" }}>
                {p.status}
              </div>
              <div className="text-xs" style={{ color: "var(--fg-dim)", fontSize: "0.65rem" }}>{p.detail}</div>
            </div>
          </motion.div>
        ))}

        {/* Sync hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6 }}
          className="glass-card text-center mt-2"
          style={{ padding: "0.5rem 0.75rem", background: "linear-gradient(135deg, rgba(109,40,217,0.12), rgba(139,92,246,0.12))", borderColor: "rgba(167,139,250,0.25)" }}
        >
          <span className="text-xs font-bold" style={{ color: "var(--purple-bright)" }}>2 rhythms aligned</span>
        </motion.div>
      </div>

      <PhoneTabBar active="status" />
    </>
  );
}

// ===== Problem Screen — "Are you free?" messages =====
export function ProblemScreen() {
  const messages = [
    { text: "Are you free?", sent: true },
    { text: "Can we talk?", sent: true },
    { text: "Where are you?", sent: true },
    { text: "Call me when you're available", sent: true },
    { text: "You there?", sent: true },
  ];

  return (
    <>
      <div className="phone-header">
        <h3>Chats</h3>
        <span style={{ fontSize: "1.2rem", color: "var(--fg-dim)" }}>···</span>
      </div>

      <div className="phone-content">
        {/* Chat header */}
        <div className="phone-list-item" style={{ background: "rgba(139,92,246,0.06)" }}>
          <div className="phone-avatar">
            AC
            <span className="phone-status-badge busy" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold" style={{ color: "#fff" }}>Alex Chen</div>
            <div className="text-xs" style={{ color: "var(--fg-dim)" }}>Busy · In a meeting</div>
          </div>
        </div>

        {/* Messages — all unanswered */}
        <div className="flex flex-col gap-2 px-1 py-3">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.12 }}
              className="chat-bubble sent"
              style={{ fontSize: "0.75rem", opacity: 0.7 + i * 0.05 }}
            >
              {m.text}
            </motion.div>
          ))}

          {/* No reply indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.8 }}
            className="text-center py-2"
          >
            <span className="text-xs" style={{ color: "var(--fg-dim)", fontStyle: "italic" }}>No reply yet...</span>
          </motion.div>
        </div>
      </div>

      <PhoneTabBar active="chats" />
    </>
  );
}

// ===== Sync Screen — two rhythms aligning → SYNCED =====
export function SyncScreen() {
  return (
    <>
      <div className="phone-header">
        <h3>Sync</h3>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full"
          style={{ width: "10px", height: "10px", background: "linear-gradient(135deg, #c4b5fd, #8b5cf6)", boxShadow: "0 0 15px rgba(167,139,250,1)" }}
        />
      </div>

      <div className="phone-content">
        {/* Person A */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.1 }}
          className="phone-list-item"
          style={{ background: "rgba(139,92,246,0.08)" }}
        >
          <div className="phone-avatar">
            AC
            <span className="phone-status-badge available" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold" style={{ color: "#fff" }}>Alex Chen</div>
            <div className="text-xs font-semibold" style={{ color: "var(--purple-bright)" }}>Free</div>
            <div className="text-xs" style={{ color: "var(--fg-dim)", fontSize: "0.65rem" }}>Coffee & conversation</div>
          </div>
        </motion.div>

        {/* Connection line — animated */}
        <div className="flex justify-center py-2">
          <motion.div
            animate={{ opacity: [0.2, 1, 0.2], scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "2px", height: "24px", background: "linear-gradient(to bottom, transparent, #a78bfa, transparent)", boxShadow: "0 0 10px rgba(167,139,250,0.6)" }}
          />
        </div>

        {/* Person B */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3 }}
          className="phone-list-item"
          style={{ background: "rgba(139,92,246,0.08)" }}
        >
          <div className="phone-avatar">
            MS
            <span className="phone-status-badge available" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold" style={{ color: "#fff" }}>Maya Singh</div>
            <div className="text-xs font-semibold" style={{ color: "var(--purple-bright)" }}>Free</div>
            <div className="text-xs" style={{ color: "var(--fg-dim)", fontSize: "0.65rem" }}>Open to a call</div>
          </div>
        </motion.div>

        {/* SYNCED badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-3"
        >
          <motion.div
            animate={{ boxShadow: ["0 0 20px rgba(139,92,246,0.3)", "0 0 40px rgba(139,92,246,0.6)", "0 0 20px rgba(139,92,246,0.3)"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: "linear-gradient(135deg, #6d28d9, #8b5cf6)", border: "1px solid rgba(196,181,253,0.5)" }}
          >
            <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#fff", letterSpacing: "0.15em" }}>SYNCED</span>
          </motion.div>
        </motion.div>

        {/* Connect button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 1 }}
          className="text-center mt-3"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(196,181,253,0.4)", backdropFilter: "blur(10px)" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff" }}>Connect now</span>
            <span style={{ fontSize: "0.8rem" }}>→</span>
          </div>
        </motion.div>
      </div>

      <PhoneTabBar active="status" />
    </>
  );
}

// ===== Connect Screen — connection happening =====
export function ConnectScreen() {
  return (
    <>
      <div className="phone-header">
        <h3>Connected</h3>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full"
          style={{ width: "10px", height: "10px", background: "#a78bfa", boxShadow: "0 0 15px rgba(167,139,250,1)" }}
        />
      </div>

      <div className="phone-content">
        {/* Connected call card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card text-center"
          style={{ padding: "1.5rem 1rem", background: "linear-gradient(135deg, rgba(109,40,217,0.12), rgba(139,92,246,0.12))", borderColor: "rgba(167,139,250,0.3)" }}
        >
          {/* Dual avatars */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="phone-avatar" style={{ margin: 0 }}>AC<span className="phone-status-badge available" /></div>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ fontSize: "1.2rem" }}
            >
              ⚡
            </motion.div>
            <div className="phone-avatar" style={{ margin: 0 }}>MS<span className="phone-status-badge available" /></div>
          </div>
          <div className="text-sm font-bold mb-1" style={{ color: "#fff" }}>Alex & Maya</div>
          <div className="text-xs mb-3" style={{ color: "var(--purple-bright)", fontWeight: 600 }}>Rhythms aligned</div>

          {/* Call timer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(167,139,250,0.25)" }}
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a78bfa" }}
            />
            <span className="text-xs font-bold" style={{ color: "#fff" }}>00:42</span>
          </motion.div>
        </motion.div>

        {/* Context */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5 }}
          className="mt-3 px-2"
        >
          <div className="text-xs text-center" style={{ color: "var(--fg-muted)", lineHeight: 1.5 }}>
            Connected at the right moment.<br />No interruptions. Just timing.
          </div>
        </motion.div>

        {/* Action buttons */}
        <div className="flex justify-center gap-3 mt-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center rounded-full"
            style={{ width: "40px", height: "40px", background: "rgba(139,92,246,0.15)", border: "1px solid rgba(167,139,250,0.3)" }}
          >
            <span style={{ fontSize: "1rem" }}>💬</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center rounded-full"
            style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #6d28d9, #8b5cf6)", boxShadow: "0 4px 15px rgba(139,92,246,0.4)" }}
          >
            <span style={{ fontSize: "1rem" }}>📞</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.9 }}
            className="flex items-center justify-center rounded-full"
            style={{ width: "40px", height: "40px", background: "rgba(139,92,246,0.15)", border: "1px solid rgba(167,139,250,0.3)" }}
          >
            <span style={{ fontSize: "1rem" }}>📹</span>
          </motion.div>
        </div>
      </div>

      <PhoneTabBar active="chats" />
    </>
  );
}

// ===== Status Screen =====
export function StatusScreen() {
  const contacts = [
    { name: "Alex Chen", initials: "AC", status: "Driving home", badge: "driving", time: "now", detail: "ETA 15 min" },
    { name: "Sam Rivera", initials: "SR", status: "At lunch", badge: "away", time: "12m", detail: "Bistro Garden" },
    { name: "Jordan Park", initials: "JP", status: "Client meeting", badge: "busy", time: "30m", detail: "Until 3 PM" },
    { name: "Maya Singh", initials: "MS", status: "Available", badge: "available", time: "now", detail: "Free to chat" },
    { name: "Tom Wilson", initials: "TW", status: "Presenting", badge: "busy", time: "5m", detail: "Q3 review" },
    { name: "Lisa Kim", initials: "LK", status: "Free", badge: "available", time: "now", detail: "Looking for plans" },
    { name: "Dan Foster", initials: "DF", status: "Meeting", badge: "busy", time: "20m", detail: "Team sync" },
    { name: "Nina Patel", initials: "NP", status: "Traveling", badge: "driving", time: "1h", detail: "Airport → Home" },
    { name: "Chris Lee", initials: "CL", status: "Available", badge: "available", time: "now", detail: "Open to calls" },
  ];

  return (
    <>
      <div className="phone-header">
        <h3>Status</h3>
        <span style={{ fontSize: "1.2rem", color: "var(--purple-bright)" }}>⊕</span>
      </div>

      {/* Group filter */}
      <div className="flex gap-1.5 px-3 pb-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {["All", "Family", "Friends", "Work"].map((g, i) => (
          <span
            key={g}
            className="pill"
            style={{
              padding: "0.3rem 0.7rem",
              fontSize: "0.65rem",
              ...(i === 0 ? { background: "linear-gradient(135deg, rgba(109,40,217,0.3), rgba(139,92,246,0.3))", borderColor: "rgba(196,181,253,0.5)", color: "#fff" } : {}),
            }}
          >
            {g}
          </span>
        ))}
      </div>

      <div className="phone-content">
        {contacts.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: i * 0.05 }}
            className="phone-list-item"
          >
            <div className="phone-avatar">
              {c.initials}
              <span className={`phone-status-badge ${c.badge}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold truncate" style={{ color: "#fff" }}>{c.name}</div>
              <div className="text-xs font-semibold" style={{ color: "var(--purple-bright)" }}>{c.status}</div>
              <div className="text-xs" style={{ color: "var(--fg-dim)", fontSize: "0.65rem" }}>{c.detail}</div>
            </div>
            <span className="text-xs" style={{ color: "var(--fg-dim)" }}>{c.time}</span>
          </motion.div>
        ))}
      </div>

      <PhoneTabBar active="status" />
    </>
  );
}

// ===== Chats Screen =====
export function ChatsScreen() {
  const chats = [
    { name: "Sam Rivera", initials: "SR", last: "Yes! Just finished my meeting 🎉", time: "2m", unread: 2, badge: "available" },
    { name: "Team Sync", initials: "TS", last: "Alex: Let's push to staging now", time: "8m", unread: 5, badge: "busy", group: true },
    { name: "Mom 💜", initials: "M", last: "Call me when you're free honey", time: "1h", unread: 0, badge: "available" },
    { name: "Jordan Park", initials: "JP", last: "Sounds good, see you there 👍", time: "2h", unread: 0, badge: "busy" },
    { name: "Weekend Trip ✈", initials: "WT", last: "Lisa: I booked the Airbnb!", time: "3h", unread: 1, badge: "available", group: true },
    { name: "Dan Foster", initials: "DF", last: "🎵 Voice message (0:24)", time: "5h", unread: 0, badge: "busy" },
    { name: "Nina Patel", initials: "NP", last: "Just landed! Pick me up? 🛬", time: "6h", unread: 3, badge: "driving" },
    { name: "Book Club 📚", initials: "BC", last: "Chris: Chapter 5 was incredible", time: "8h", unread: 0, badge: "available", group: true },
  ];

  return (
    <>
      <div className="phone-header">
        <h3>Chats</h3>
        <span style={{ fontSize: "1.2rem", color: "var(--purple-bright)" }}>✏</span>
      </div>

      {/* Search bar */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-full" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(167,139,250,0.15)" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--fg-dim)" }}>🔍</span>
          <span className="text-xs" style={{ color: "var(--fg-dim)" }}>Search chats...</span>
        </div>
      </div>

      <div className="phone-content">
        {chats.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: i * 0.05 }}
            className="phone-list-item"
          >
            <div className="phone-avatar">
              {c.initials}
              <span className={`phone-status-badge ${c.badge}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold truncate" style={{ color: "#fff" }}>{c.name}</span>
                {c.group && <span style={{ fontSize: "0.6rem" }}>👥</span>}
              </div>
              <div className="text-xs truncate" style={{ color: "var(--fg-muted)" }}>{c.last}</div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className="text-xs" style={{ color: "var(--fg-dim)" }}>{c.time}</span>
              {c.unread > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "linear-gradient(135deg, #6d28d9, #8b5cf6)", color: "#fff", fontSize: "0.6rem", minWidth: "20px", textAlign: "center", boxShadow: "0 2px 8px rgba(139,92,246,0.4)" }}>
                  {c.unread}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <PhoneTabBar active="chats" />
    </>
  );
}

// ===== Maps Screen — richer with places =====
export function MapsScreen() {
  const friends = [
    { name: "You", top: "35%", left: "42%", color: "#a78bfa", isYou: true },
    { name: "Sam", top: "22%", left: "68%", color: "#8b5cf6" },
    { name: "Alex", top: "58%", left: "22%", color: "#8b5cf6" },
    { name: "Lisa", top: "68%", left: "58%", color: "#c4b5fd" },
    { name: "Dan", top: "28%", left: "30%", color: "#6d28d9" },
  ];

  const places = [
    { name: "Bistro Garden", type: "🍽 Restaurant", rating: "4.8", dist: "0.4 km", top: "50%", left: "55%", emoji: "🍽" },
    { name: "Brew & Co.", type: "☕ Cafe", rating: "4.6", dist: "0.6 km", top: "20%", left: "45%", emoji: "☕" },
    { name: "Sunset Park", type: "🌳 Park", rating: "4.9", dist: "0.8 km", top: "72%", left: "35%", emoji: "🌳" },
  ];

  return (
    <>
      <div className="phone-header" style={{ paddingBottom: "0.4rem" }}>
        <h3>Maps</h3>
        <span style={{ fontSize: "0.9rem", color: "var(--purple-bright)" }}>📍</span>
      </div>

      {/* Sharing toggle */}
      <div className="px-3 pb-2 flex items-center justify-between">
        <span className="text-xs font-semibold" style={{ color: "var(--fg-muted)" }}>Location sharing</span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold" style={{ color: "var(--purple-bright)" }}>On · 18h left</span>
          <div className="w-9 h-5 rounded-full flex items-center px-0.5" style={{ background: "linear-gradient(135deg, #6d28d9, #8b5cf6)", boxShadow: "0 2px 8px rgba(139,92,246,0.4)" }}>
            <div className="w-4 h-4 rounded-full bg-white ml-auto" />
          </div>
        </div>
      </div>

      {/* Nearby filter */}
      <div className="flex gap-1.5 px-3 pb-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {["Friends", "Places", "Food", "Parks"].map((f, i) => (
          <span key={f} className="pill" style={{ padding: "0.25rem 0.65rem", fontSize: "0.6rem", ...(i === 0 ? { background: "linear-gradient(135deg, rgba(109,40,217,0.3), rgba(139,92,246,0.3))", borderColor: "rgba(196,181,253,0.5)", color: "#fff" } : {}) }}>
            {f}
          </span>
        ))}
      </div>

      <div className="phone-map-area">
        <div className="phone-map-grid" />

        {/* Map roads */}
        <div className="phone-map-road" style={{ top: "40%", left: 0, right: 0, height: "3px", transform: "rotate(-5deg)" }} />
        <div className="phone-map-road" style={{ top: 0, bottom: 0, left: "48%", width: "3px", transform: "rotate(8deg)" }} />
        <div className="phone-map-road" style={{ top: "65%", left: 0, right: 0, height: "2px", transform: "rotate(3deg)" }} />

        {/* Friend pins */}
        {friends.map((f) => (
          <div key={f.name} className="phone-map-pin" style={{ top: f.top, left: f.left }}>
            {f.isYou && <div className="phone-map-ring" style={{ width: "36px", height: "36px", top: "-11px", left: "-11px" }} />}
            <div className="phone-map-pin-dot" style={f.isYou ? { width: "16px", height: "16px", background: "#a78bfa" } : { background: f.color }} />
            <span className="phone-map-pin-label">{f.name}</span>
          </div>
        ))}

        {/* Place markers */}
        {places.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="phone-map-pin"
            style={{ top: p.top, left: p.left }}
          >
            <div style={{ fontSize: "1.1rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }}>{p.emoji}</div>
          </motion.div>
        ))}

        {/* Bottom place cards */}
        <div className="absolute bottom-2 left-2 right-2 space-y-2">
          {places.slice(0, 2).map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 + i * 0.15 }}
              className="phone-map-place"
              style={{ padding: "0.6rem 0.75rem" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6d28d9, #8b5cf6)" }}>
                  <span style={{ fontSize: "1rem" }}>{p.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate" style={{ color: "#fff" }}>{p.name}</div>
                  <div className="text-xs flex items-center gap-1.5" style={{ color: "var(--fg-muted)", fontSize: "0.6rem" }}>
                    <span>⭐ {p.rating}</span>
                    <span>·</span>
                    <span>{p.dist}</span>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "linear-gradient(135deg, #6d28d9, #8b5cf6)", color: "#fff", fontSize: "0.65rem", boxShadow: "0 2px 8px rgba(139,92,246,0.3)" }}>Go</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <PhoneTabBar active="maps" />
    </>
  );
}

// ===== Maya Screen =====
export function MayaScreen() {
  return (
    <>
      <div className="phone-header">
        <h3>Maya</h3>
        <span style={{ fontSize: "1rem", color: "var(--purple-bright)" }}>✦</span>
      </div>

      {/* Maya core */}
      <div className="flex flex-col items-center py-3 px-3">
        <div className="relative w-20 h-20 mb-2">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
            <div className="absolute inset-0 rounded-full border-2 border-purple opacity-30" />
            <div className="absolute inset-2 rounded-full border border-purple-bright opacity-40" />
            <div className="absolute inset-4 rounded-full border border-violet opacity-50" />
          </motion.div>
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-6 rounded-full" style={{ background: "radial-gradient(circle, rgba(196,181,253,0.7), rgba(139,92,246,0.3), transparent 70%)", filter: "blur(4px)" }} />
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-7 rounded-full" style={{ background: "linear-gradient(135deg, #c4b5fd, #8b5cf6)", boxShadow: "0 0 25px rgba(167,139,250,0.7)" }} />
        </div>
        <div className="text-sm font-bold gradient-text-static mb-0.5">Maya</div>
        <div className="text-xs" style={{ color: "var(--fg-muted)" }}>Your intelligent assistant</div>
      </div>

      <div className="phone-content" style={{ paddingTop: 0 }}>
        {/* Maya suggestions */}
        <div className="mb-3">
          <div className="text-xs font-bold mb-2 px-1" style={{ color: "var(--purple-bright)", letterSpacing: "0.1em" }}>SUGGESTIONS</div>
          {[
            { icon: "📅", text: "Sam is free now — lunch suggestion?", action: "Connect" },
            { icon: "📍", text: "Bistro Garden nearby — 0.4km away", action: "View" },
            { icon: "💬", text: "Mom called 2h ago — call back?", action: "Call" },
            { icon: "◉", text: "Lisa joined a Ripple — 4h left", action: "View" },
            { icon: "🎵", text: "Dan shared a new audio track", action: "Listen" },
            { icon: "🗺", text: "Nina is traveling — ETA 15 min", action: "Track" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.06 }}
              className="phone-list-item"
              style={{ background: "rgba(139,92,246,0.08)" }}
            >
              <span style={{ fontSize: "1rem" }}>{s.icon}</span>
              <div className="flex-1 text-xs font-medium" style={{ color: "#fff" }}>{s.text}</div>
              <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: "linear-gradient(135deg, #6d28d9, #8b5cf6)", color: "#fff", fontSize: "0.6rem", boxShadow: "0 2px 6px rgba(139,92,246,0.3)" }}>{s.action}</span>
            </motion.div>
          ))}
        </div>

        {/* Connected systems */}
        <div className="text-xs font-bold mb-2 px-1" style={{ color: "var(--purple-bright)", letterSpacing: "0.1em" }}>CONNECTED SYSTEMS</div>
        <div className="flex flex-wrap gap-1.5 px-1 pb-2">
          {["Status", "Chats", "Maps", "Sync Space", "Pulse"].map((sys) => (
            <span key={sys} className="pill pill-active" style={{ padding: "0.25rem 0.65rem", fontSize: "0.6rem" }}>{sys}</span>
          ))}
        </div>
      </div>

      <PhoneTabBar active="maya" />
    </>
  );
}

// ===== Privacy Screen =====
export function PrivacyScreen() {
  return (
    <>
      <div className="phone-header">
        <h3>Chats</h3>
        <span style={{ fontSize: "1.1rem" }}>🔒</span>
      </div>

      <div className="phone-content">
        {/* Locked chat indicator */}
        <div className="glass-card text-center mb-3" style={{ padding: "0.6rem", background: "linear-gradient(135deg, rgba(109,40,217,0.12), rgba(139,92,246,0.12))", borderColor: "rgba(167,139,250,0.25)" }}>
          <div className="flex items-center justify-center gap-2">
            <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: "0.9rem" }}>🔒</motion.span>
            <span className="text-xs font-bold" style={{ color: "var(--purple-bright)" }}>End-to-end encrypted</span>
          </div>
        </div>

        {/* Chat with lock */}
        <div className="phone-list-item" style={{ background: "rgba(139,92,246,0.06)" }}>
          <div className="phone-avatar">
            SR
            <span className="phone-status-badge available" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold" style={{ color: "#fff" }}>Sam Rivera</div>
            <div className="text-xs flex items-center gap-1" style={{ color: "var(--fg-muted)" }}>
              <span style={{ fontSize: "0.6rem" }}>🔒</span> Encrypted message
            </div>
          </div>
          <span className="text-xs" style={{ color: "var(--fg-dim)" }}>2m</span>
        </div>

        {/* Chat bubbles */}
        <div className="flex flex-col gap-2 px-1 py-2">
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: 0.2 }} className="chat-bubble sent" style={{ fontSize: "0.75rem" }}>This stays between us 🔒</motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: 0.4 }} className="chat-bubble received" style={{ fontSize: "0.75rem" }}>Always. Chat locked too ✨</motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: 0.6 }} className="chat-bubble sent" style={{ fontSize: "0.75rem" }}>Perfect 👍</motion.div>
        </div>

        {/* Privacy features */}
        <div className="mt-3 space-y-2">
          {[
            { icon: "🔒", label: "Chat locking enabled" },
            { icon: "🔐", label: "End-to-end encryption" },
            { icon: "🛡", label: "Device privacy active" },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg"
              style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(167,139,250,0.12)" }}
            >
              <span style={{ fontSize: "0.85rem" }}>{f.icon}</span>
              <span className="text-xs font-semibold" style={{ color: "var(--violet)" }}>{f.label}</span>
              <span className="ml-auto text-xs font-bold" style={{ color: "var(--purple-bright)" }}>✓</span>
            </motion.div>
          ))}
        </div>
      </div>

      <PhoneTabBar active="chats" />
    </>
  );
}

// ===== Pixel Dissolve Tab Bar =====
const TAB_LIST = [
  { id: "status", icon: "●", label: "Status" },
  { id: "chats", icon: "💬", label: "Chats" },
  { id: "ripple", icon: "🌐", label: "Network" },
  { id: "live", icon: "◉", label: "Live" },
  { id: "syncspace", icon: "◎", label: "Sync Space" },
  { id: "pulse", icon: "♥", label: "Pulse" },
  { id: "maps", icon: "📍", label: "Maps" },
  { id: "maya", icon: "✦", label: "Maya" },
];

// ===== Open Network — Ripples =====
export function RippleScreen() {
  const ripples = [
    { title: "Sunset Run", place: "Marine Drive · 0.8 km", people: 24, live: false },
    { title: "Rooftop Jam", place: "Indiranagar · 1.2 km", people: 12, live: true },
    { title: "Coffee & Ideas", place: "Koramangala · 2.4 km", people: 8, live: false },
    { title: "Pickup Football", place: "Turf 24 · 3.1 km", people: 16, live: false },
    { title: "Night Market", place: "Church Street · 4.0 km", people: 31, live: true },
  ];

  return (
    <>
      <div className="phone-header">
        <h3>Open Network</h3>
        <span style={{ fontSize: "1rem", color: "var(--purple-bright)" }}>◎</span>
      </div>
      <div className="phone-content">
        {ripples.map((r) => (
          <div key={r.title} className="phone-ripple-card">
            <div className="phone-ripple-media">
              {r.live && <span className="phone-ripple-live">LIVE</span>}
            </div>
            <div className="phone-ripple-body">
              <div className="phone-ripple-title">{r.title}</div>
              <div className="phone-ripple-meta">{r.place} · {r.people} going</div>
            </div>
          </div>
        ))}
      </div>
      <PhoneTabBar active="ripple" />
    </>
  );
}

// ===== Open Network — Live =====
export function LiveScreen() {
  return (
    <>
      <div className="phone-header">
        <h3>Live</h3>
        <span style={{ fontSize: "1rem", color: "#ef4444" }}>●</span>
      </div>
      <div className="phone-content" style={{ display: "flex", flexDirection: "column" }}>
        <div className="phone-live-stage">
          <div className="phone-live-top">
            <span className="phone-live-badge">LIVE</span>
            <span className="phone-live-count">1.2k watching</span>
          </div>
          <div className="phone-live-comments">
            <span className="phone-live-comment">Maya: this view 😍</span>
            <span className="phone-live-comment">Alex: where is this?</span>
            <span className="phone-live-comment">Sam: joining now!</span>
          </div>
        </div>
      </div>
      <PhoneTabBar active="live" />
    </>
  );
}

// ===== Sync Space — private identity and connected apps =====
export function SyncSpacePhoneScreen() {
  const apps = [
    { name: "Cafe Ripple", meta: "Codes & receipts · Active", icon: "☕" },
    { name: "Bookstore", meta: "Identity only · Active", icon: "▤" },
    { name: "Wallet", meta: "Access paused", icon: "◇" },
    { name: "Studio", meta: "Revoked", icon: "⌁" },
  ];

  return (
    <>
      <div className="phone-header">
        <h3>Sync Space</h3>
        <span style={{ fontSize: "1rem", color: "var(--purple-bright)" }}>⚙</span>
      </div>
      <div className="phone-content">
        <div className="phone-syncid-card">
          <div className="phone-syncid-label">YOUR SYNC ID</div>
          <div className="phone-syncid-value">alex.sync</div>
          <div className="phone-syncid-meta">Active · you control every connection</div>
        </div>

        <div className="phone-syncspace-title">CONNECTED APPS</div>
        {apps.map((app) => (
          <div key={app.name} className="phone-community-card">
            <div className="phone-community-icon">{app.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="phone-community-name truncate">{app.name}</div>
              <div className="phone-community-meta">{app.meta}</div>
            </div>
          </div>
        ))}
      </div>
      <PhoneTabBar active="syncspace" />
    </>
  );
}

// ===== Pulse — small moments =====
export function PulseScreen() {
  const moments = [
    { who: "AC", text: "Alex is free for coffee", time: "2m" },
    { who: "MS", text: "Maya shared a sunset moment", time: "12m" },
    { who: "SR", text: "Sam finished a run · 5.2 km", time: "28m" },
    { who: "JP", text: "Jordan is heading home", time: "1h" },
    { who: "LK", text: "Lisa is looking for plans tonight", time: "2h" },
  ];

  return (
    <>
      <div className="phone-header">
        <h3>Pulse</h3>
        <span style={{ fontSize: "1rem", color: "var(--purple-bright)" }}>♥</span>
      </div>
      <div className="phone-content">
        {moments.map((m) => (
          <div key={m.text} className="phone-pulse-row">
            <div className="phone-avatar-sm">{m.who}</div>
            <div className="phone-pulse-text">{m.text}</div>
            <span className="phone-pulse-time">{m.time}</span>
          </div>
        ))}
      </div>
      <PhoneTabBar active="pulse" />
    </>
  );
}

const PIXEL_COLS = 16;
const PIXEL_ROWS = 4;

// Deterministic jitter — Math.random() during render is a purity violation.
const pixelNoise = (r: number, c: number, salt: number) => {
  const x = Math.sin(r * 127.1 + c * 311.7 + salt * 74.7) * 43758.5453;
  return x - Math.floor(x);
};

function PhoneTabBar({ active }: { active: string }) {
  const activeTab = TAB_LIST.find((t) => t.id === active) || TAB_LIST[0];

  // Generate pixel grid with random delays — regenerated each tab switch
  const pixels = useMemo(() => {
    const arr: { id: string; delay: number; exitDelay: number }[] = [];
    const seed = active.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
    for (let r = 0; r < PIXEL_ROWS; r++) {
      for (let c = 0; c < PIXEL_COLS; c++) {
        arr.push({
          id: `${r}-${c}`,
          delay: pixelNoise(r, c, seed) * 0.35,
          exitDelay: pixelNoise(r, c, seed + 1) * 0.3,
        });
      }
    }
    return arr;
  }, [active]);

  return (
    <div className="phone-tab-bar pixel-tab-bar">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="pixel-tab"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Pixel grid — matrix dissolve effect */}
          <div className="pixel-grid">
            {pixels.map((p) => (
              <motion.div
                key={p.id}
                className="pixel-box"
                initial={{ opacity: 0, scale: 0, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 6 }}
                transition={{ delay: p.delay, duration: 0.25, ease: "easeOut" }}
              />
            ))}
          </div>

          {/* Tab content — icon + label */}
          <motion.div
            className="pixel-tab-content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            <span className="pixel-tab-icon">{activeTab.icon}</span>
            <span className="pixel-tab-label">{activeTab.label}</span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
