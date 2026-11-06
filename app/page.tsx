"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Phone3D } from "@/components/Phone3D";
import {
  StatusScreen,
  ChatsScreen,
  MapsScreen,
  MayaScreen,
  PrivacyScreen,
  HomeScreen,
  HeroScreen,
  ProblemScreen,
  SyncScreen,
  ConnectScreen,
  RippleScreen,
  LiveScreen,
  SyncSpacePhoneScreen,
  PulseScreen,
} from "@/components/PhoneMockup";
import { GlobeScene } from "@/components/GlobeScene";
import { WaitlistModal } from "@/components/WaitlistModal";
import { useActiveSection } from "@/components/useActiveSection";
import { getWaitlistCount } from "@/lib/waitlist";

function JoinButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button className="cta-primary" onClick={onClick}>
      {children}
    </button>
  );
}

function JoinCount({ count }: { count: number | null }) {
  if (count === null) return null;
  return (
    <p className="join-count">
      {count > 0 ? (
        <>
          Join <strong>{count.toLocaleString()}</strong> people in sync 💜
        </>
      ) : (
        <>Be the first in sync 💜</>
      )}
    </p>
  );
}

// ===== Animation variants =====
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } };

const viewport = { once: false, amount: 0.2 };
const transition = { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const };

// ===== Section IDs =====
const PHONE_SECTIONS = [
  "opening", "hero", "problem", "status", "sync", "connect",
  "world", "ripples", "live", "syncspace", "pulse", "connections",
  "chats", "privacy", "maps", "maya",
  "ecosystem", "social", "final",
];

function getPhoneScreen(sectionId: string): { screen: React.ReactNode; key: string } {
  switch (sectionId) {
    case "opening":
      return { screen: <HomeScreen />, key: "home" };
    case "hero":
      return { screen: <HeroScreen />, key: "hero" };
    case "problem":
      return { screen: <ProblemScreen />, key: "problem" };
    case "status": return { screen: <StatusScreen />, key: "status" };
    case "sync": return { screen: <SyncScreen />, key: "sync" };
    case "connect": return { screen: <ConnectScreen />, key: "connect" };
    case "world": return { screen: <RippleScreen />, key: "ripple" };
    case "ripples": return { screen: <RippleScreen />, key: "ripple" };
    case "live": return { screen: <LiveScreen />, key: "live" };
    case "syncspace": return { screen: <SyncSpacePhoneScreen />, key: "syncspace" };
    case "pulse": return { screen: <PulseScreen />, key: "pulse" };
    case "connections": return { screen: <PulseScreen />, key: "pulse" };
    case "chats": return { screen: <ChatsScreen />, key: "chats" };
    case "privacy": return { screen: <PrivacyScreen />, key: "privacy" };
    case "maps": return { screen: <MapsScreen />, key: "maps" };
    case "maya": return { screen: <MayaScreen />, key: "maya" };
    default: return { screen: <HomeScreen />, key: "home" };
  }
}

// ===== Scroll indicator =====
function ScrollIndicator() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`scroll-indicator ${visible ? "" : "hidden"}`}>
      <span>Scroll to explore</span>
      <div className="scroll-line" />
    </div>
  );
}

// ===== Reusable building blocks for consistent spacing =====
function Label({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={viewport} transition={transition}
      className="label-text block"
      style={{ marginBottom: "1.25rem" }}
    >
      {children}
    </motion.span>
  );
}

function Title({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.h2
      variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={viewport} transition={{ ...transition, delay: delay + 0.1 }}
      className="headline-large gradient-text"
      style={{ marginBottom: "1.75rem" }}
    >
      {children}
    </motion.h2>
  );
}

function MegaTitle({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.h2
      variants={scaleIn} initial="hidden" whileInView="visible"
      viewport={viewport} transition={{ ...transition, delay: delay + 0.1 }}
      className="headline-mega gradient-text"
      style={{ marginBottom: "1.75rem" }}
    >
      {children}
    </motion.h2>
  );
}

function BodyText({ children, delay = 0.2 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.p
      variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={viewport} transition={{ ...transition, delay }}
      className="body-text"
      style={{ marginBottom: "2.5rem" }}
    >
      {children}
    </motion.p>
  );
}

function Tagline({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.p
      variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={viewport} transition={{ ...transition, delay }}
      className="headline-medium"
      style={{ marginBottom: "0.75rem", marginTop: "0.5rem" }}
    >
      {children}
    </motion.p>
  );
}

function SubTagline({ children, delay = 0.15 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.p
      variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={viewport} transition={{ ...transition, delay }}
      className="subheadline gradient-text-static"
    >
      {children}
    </motion.p>
  );
}

function PillRow({ items, active = false, delay = 0.3 }: { items: string[]; active?: boolean; delay?: number }) {
  return (
    <div className="flex flex-wrap gap-2.5" style={{ marginBottom: "2rem" }}>
      {items.map((item, i) => (
        <motion.span
          key={item}
          variants={scaleIn} initial="hidden" whileInView="visible"
          viewport={viewport} transition={{ ...transition, delay: delay + i * 0.06 }}
          className={active ? "pill pill-active" : "pill"}
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
}

function FeatureGrid({ items, delay = 0.3 }: { items: { label: string; icon: string }[]; delay?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3" style={{ marginBottom: "2.5rem" }}>
      {items.map((f, i) => (
        <motion.div
          key={f.label}
          variants={scaleIn} initial="hidden" whileInView="visible"
          viewport={viewport} transition={{ ...transition, delay: delay + i * 0.07 }}
          whileHover={{ y: -4, scale: 1.03 }}
          className="glass-card flex items-center gap-3"
          style={{ padding: "0.9rem 1rem" }}
        >
          <div
            className="flex items-center justify-center text-lg"
            style={{
              width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem",
              background: "linear-gradient(135deg, #6d28d9, #a78bfa)",
              boxShadow: "0 2px 10px rgba(139,92,246,0.25)",
              flexShrink: 0,
            }}
          >
            {f.icon}
          </div>
          <span className="text-sm font-semibold" style={{ color: "var(--violet)" }}>{f.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ===== Text section wrapper =====
function TextSection({ id, children, world = false }: { id: string; children: React.ReactNode; world?: boolean }) {
  return (
    <section
      id={`section-${id}`}
      className={world ? "world-band" : undefined}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: world ? "4rem var(--page-pad-x)" : "4rem 0",
      }}
    >
      <div className="max-w-xl w-full" style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </section>
  );
}

// ===== MAIN PAGE =====
export default function Home() {
  const activeSection = useActiveSection(PHONE_SECTIONS);
  const { screen, key } = getPhoneScreen(activeSection);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [joinedCount, setJoinedCount] = useState<number | null>(null);
  const openWaitlist = useCallback(() => setWaitlistOpen(true), []);
  const closeWaitlist = useCallback(() => setWaitlistOpen(false), []);

  useEffect(() => {
    let alive = true;
    getWaitlistCount().then((count) => {
      if (alive && count !== null) setJoinedCount(count);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <ScrollIndicator />

      <div className="split-layout">
        {/* ===== LEFT: Scrollable text content ===== */}
        <div className="split-left">

          {/* 01 — OPENING */}
          <TextSection id="opening">
            <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ duration: 1.5 }}>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                style={{ marginBottom: "2rem" }}
              >
                <div className="h-3 w-3 rounded-full pulse-glow" style={{ background: "var(--purple-bright)", boxShadow: "0 0 25px rgba(167,139,250,1)" }} />
              </motion.div>
              <h1 className="headline-large gradient-text" style={{ marginBottom: "1.5rem" }}>Syncup</h1>
              <p className="subheadline">One life. One rhythm. One sync.</p>
            </motion.div>
          </TextSection>

          {/* 02 — HERO */}
          <TextSection id="hero">
            <Label>A new communication ecosystem</Label>
            <div style={{ marginBottom: "2.5rem" }}>
              {["ONE LIFE.", "ONE RHYTHM.", "ONE SYNC."].map((line, i) => (
                <motion.h1
                  key={line}
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={viewport} transition={{ ...transition, delay: i * 0.12 }}
                  className="headline-mega gradient-text"
                  style={{ marginBottom: "0.25rem" }}
                >
                  {line}
                </motion.h1>
              ))}
            </div>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={viewport} transition={{ ...transition, delay: 0.5 }}
              className="subheadline"
              style={{ marginBottom: "1.5rem" }}
            >
              Stop asking, &ldquo;Are you free?&rdquo;
            </motion.p>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={viewport} transition={{ ...transition, delay: 0.6 }}
              className="body-text"
              style={{ marginBottom: "2.5rem" }}
            >
              Syncup helps people share their rhythm, discover when their moments align, and connect at the right time.
            </motion.p>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={viewport} transition={{ ...transition, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <JoinButton onClick={openWaitlist}>Get Early Access</JoinButton>
              <button className="cta-secondary" onClick={() => document.getElementById("section-problem")?.scrollIntoView({ behavior: "smooth" })}>
                See how it works
              </button>
            </motion.div>
            <JoinCount count={joinedCount} />
          </TextSection>

          {/* 03 — PROBLEM */}
          <TextSection id="problem">
            <Label>The problem</Label>
            <Title>We&apos;re connected all the time.</Title>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={viewport} transition={{ ...transition, delay: 0.2 }}
              className="headline-medium gradient-text-static"
              style={{ marginBottom: "2.5rem" }}
            >
              Yet we still don&apos;t know when to connect.
            </motion.p>
            {/* Everyday messages — the problem */}
            <div className="flex flex-col gap-3" style={{ marginBottom: "2.5rem" }}>
              {[
                "Are you free?",
                "Can we talk?",
                "Where are you?",
                "Call me when you're available.",
              ].map((msg, i) => (
                <motion.div
                  key={msg}
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={viewport} transition={{ ...transition, delay: i * 0.1 }}
                  className="problem-message"
                >
                  <span style={{ color: "var(--fg-dim)", fontSize: "0.9rem", marginRight: "0.75rem" }}>→</span>
                  <span className="text-base font-medium" style={{ color: "var(--fg-muted)" }}>{msg}</span>
                </motion.div>
              ))}
            </div>
            <Tagline>There&apos;s a better way.</Tagline>
            <SubTagline>Syncup brings context to connection.</SubTagline>
          </TextSection>

          {/* 04 — STATUS */}
          <TextSection id="status">
            <Label>Feature</Label>
            <Title>Know their rhythm.</Title>
            <BodyText>
              Share what you&apos;re doing. See what others are doing. Know when life lines up — without asking.
            </BodyText>
            {/* Elegant status cards */}
            <div className="flex flex-col gap-3" style={{ marginBottom: "2.5rem" }}>
              {[
                { name: "Alex Chen", initials: "AC", status: "Free", detail: "Coffee & conversation", badge: "available" },
                { name: "Sam Rivera", initials: "SR", status: "Working", detail: "Deep focus", badge: "busy" },
                { name: "Maya Singh", initials: "MS", status: "Available later", detail: "After 7 PM", badge: "away" },
                { name: "Jordan Park", initials: "JP", status: "Busy", detail: "In a meeting", badge: "busy" },
              ].map((p, i) => (
                <motion.div
                  key={p.name}
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={viewport} transition={{ ...transition, delay: i * 0.1 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="status-card"
                >
                  <div className="status-card-avatar">
                    {p.initials}
                    <span className={`phone-status-badge ${p.badge}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold" style={{ color: "#fff" }}>{p.name}</div>
                    <div className="text-xs font-bold uppercase tracking-wide" style={{ color: p.badge === "available" ? "var(--purple-bright)" : "var(--fg-dim)", letterSpacing: "0.1em" }}>
                      {p.status}
                    </div>
                    <div className="text-xs" style={{ color: "var(--fg-muted)" }}>{p.detail}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <Tagline>Know when life lines up.</Tagline>
            <SubTagline>Connect when you&apos;re both free.</SubTagline>
          </TextSection>

          {/* 05 — SYNC */}
          <TextSection id="sync">
            <Label>The moment</Label>
            <Title>When two rhythms align, something happens.</Title>
            <BodyText>
              Syncup watches the rhythms of people you care about. When moments line up, it shows you.
            </BodyText>
            {/* Sync visualization — two people aligning */}
            <div className="sync-viz" style={{ marginBottom: "2.5rem" }}>
              {/* Person A */}
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={viewport} transition={{ ...transition, delay: 0.2 }}
                className="sync-person"
              >
                <div className="status-card-avatar">
                  AC
                  <span className="phone-status-badge available" />
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: "#fff" }}>Alex Chen</div>
                  <div className="text-xs font-bold" style={{ color: "var(--purple-bright)" }}>● Free</div>
                </div>
              </motion.div>

              {/* Connection line */}
              <div className="sync-line-wrap">
                <motion.div
                  variants={fadeIn} initial="hidden" whileInView="visible"
                  viewport={viewport} transition={{ ...transition, delay: 0.4 }}
                  className="sync-line"
                />
                <motion.div
                  variants={scaleIn} initial="hidden" whileInView="visible"
                  viewport={viewport} transition={{ ...transition, delay: 0.6 }}
                  className="sync-badge"
                >
                  SYNCED
                </motion.div>
                <motion.div
                  variants={fadeIn} initial="hidden" whileInView="visible"
                  viewport={viewport} transition={{ ...transition, delay: 0.4 }}
                  className="sync-line"
                />
              </div>

              {/* Person B */}
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={viewport} transition={{ ...transition, delay: 0.3 }}
                className="sync-person"
              >
                <div className="status-card-avatar">
                  MS
                  <span className="phone-status-badge available" />
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: "#fff" }}>Maya Singh</div>
                  <div className="text-xs font-bold" style={{ color: "var(--purple-bright)" }}>● Free</div>
                </div>
              </motion.div>
            </div>
            <Tagline>Two rhythms. One moment.</Tagline>
            <SubTagline>The right time finds you.</SubTagline>
          </TextSection>

          {/* 06 — CONNECT */}
          <TextSection id="connect">
            <Label>The outcome</Label>
            <Title>Don&apos;t interrupt the moment. Find it.</Title>
            <BodyText>
              When rhythms align, Syncup makes it effortless to connect. A call, a chat, a shared moment — at exactly the right time.
            </BodyText>
            <div className="flex flex-col gap-3" style={{ marginBottom: "2.5rem" }}>
              {[
                { icon: "📞", label: "Call when you're both free" },
                { icon: "💬", label: "Chat without the awkward &ldquo;you there?&rdquo;" },
                { icon: "📍", label: "Meet up when you're nearby" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={viewport} transition={{ ...transition, delay: i * 0.1 }}
                  className="connect-item"
                >
                  <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                  <span className="text-sm font-semibold" style={{ color: "var(--violet)" }} dangerouslySetInnerHTML={{ __html: item.label }} />
                </motion.div>
              ))}
            </div>
            <Tagline>Connect when it matters.</Tagline>
          </TextSection>

          {/* ===== ACT II — WORLD ===== */}
          <TextSection id="world" world>
            <GlobeScene />
            <span className="act-label">Act II — The world</span>
            <Title>Your circle is not the whole world.</Title>
            <BodyText>
              Step outside your contacts. Syncup&apos;s Open Network shows what&apos;s happening around you — gatherings, live moments, and people moving through the same places you are.
            </BodyText>
            <PillRow items={["Nearby ripples", "Live rooms", "Public moments"]} delay={0.3} />
            <Tagline>Discover what&apos;s already happening.</Tagline>
          </TextSection>

          <TextSection id="ripples" world>
            <span className="act-label">Open Network</span>
            <MegaTitle>Ripples</MegaTitle>
            <BodyText>
              Start something or join what&apos;s already moving. Ripples are scheduled meetups, spontaneous plans and live events — with a place, a time, and a cap on how many can join.
            </BodyText>
            <FeatureGrid
              items={[
                { label: "Scheduled & live", icon: "◉" },
                { label: "Place-based", icon: "◎" },
                { label: "Participant caps", icon: "◔" },
                { label: "Public or open", icon: "◇" },
              ]}
            />
            <Tagline>Join the moment, not the feed.</Tagline>
          </TextSection>

          <TextSection id="live" world>
            <span className="act-label">Open Network</span>
            <MegaTitle>Live</MegaTitle>
            <BodyText>
              Go live from wherever the moment is. Viewers join in real time, react, and comment while it happens. When it ends, it&apos;s gone.
            </BodyText>
            <div className="live-stage">
              <div className="live-stage-top">
                <span className="live-badge">LIVE</span>
                <span className="live-viewers">1.2k watching</span>
              </div>
              <div className="live-comments">
                <span className="live-comment">Maya: this view 😍</span>
                <span className="live-comment">Alex: where is this?</span>
                <span className="live-comment">Sam: joining now!</span>
              </div>
              <div className="live-wave">
                {[...Array(9)].map((_, i) => (
                  <span key={i} style={{ height: `${30 + ((i * 17) % 70)}%`, animationDelay: `${i * 0.08}s` }} />
                ))}
              </div>
            </div>
            <Tagline>Be there while it happens.</Tagline>
          </TextSection>

          {/* ===== ACT III — TOGETHER ===== */}
          <TextSection id="syncspace">
            <span className="act-label">Act III — Together</span>
            <MegaTitle>Sync Space</MegaTitle>
            <BodyText>
              Your private space for businesses and apps. One Sync ID, one inbox for codes and receipts — and you decide exactly what each connected app can see.
            </BodyText>
            <FeatureGrid
              items={[
                { label: "One Sync ID", icon: "◎" },
                { label: "You control access", icon: "◇" },
                { label: "Codes & receipts", icon: "▤" },
                { label: "Revoke anytime", icon: "⌁" },
              ]}
            />
            <Tagline>One identity. Every connection yours.</Tagline>
          </TextSection>

          <TextSection id="pulse">
            <span className="act-label">Pulse</span>
            <Title>Pulse</Title>
            <BodyText>
              Not a feed. A pulse. Small moments from the people you actually talk to — a free hour, a finished run, a sunset worth sharing. No algorithm, no performance.
            </BodyText>
            <PillRow items={["Free now", "Shared moments", "No algorithm"]} active delay={0.3} />
            <Tagline>Small moments. Close people.</Tagline>
          </TextSection>

          <TextSection id="connections">
            <span className="act-label">Connect</span>
            <Title>More signal. Less noise.</Title>
            <BodyText>
              Connection requests, mutual friends and shared communities — so the people in your Syncup are people you actually know.
            </BodyText>
            <FeatureGrid
              items={[
                { label: "Requests", icon: "＋" },
                { label: "Mutual friends", icon: "◍" },
                { label: "Shared spaces", icon: "◎" },
                { label: "You decide", icon: "◇" },
              ]}
            />
            <Tagline>Connect with intention.</Tagline>
          </TextSection>

          {/* 07 — CHATS */}
          <TextSection id="chats">
            <Label>Feature</Label>
            <Title>Chats</Title>
            <BodyText>
              One-to-one chats. Group chats. Audio calls. Video calls. One continuous experience — not separate features.
            </BodyText>
            <FeatureGrid
              items={[
                { label: "1-to-1 chats", icon: "💬" },
                { label: "Group chats", icon: "👥" },
                { label: "Audio calls", icon: "🎵" },
                { label: "Video calls", icon: "📹" },
              ]}
            />
            <Tagline>Talk when it matters.</Tagline>
          </TextSection>

          {/* 08 — PRIVACY */}
          <TextSection id="privacy">
            <Label>Feature</Label>
            <Title>Privacy</Title>
            <BodyText>
              Your conversations are protected. Encrypted end-to-end, locked on your device, and always under your control.
            </BodyText>
            <PillRow items={["Encrypted conversations", "Chat locking", "Device privacy"]} active delay={0.3} />
            <Tagline>Your conversations stay yours.</Tagline>
          </TextSection>

          {/* 09 — MAPS */}
          <TextSection id="maps">
            <Label>Feature</Label>
            <Title>Maps</Title>
            <BodyText>
              See where your people are. Share your location temporarily — up to 24 hours. Discover nearby places and find where to go together.
            </BodyText>
            <PillRow items={["Friend locations", "Multiple people", "Temporary sharing", "Up to 24 hours", "Nearby places", "Restaurants"]} delay={0.3} />
            <Tagline>Find your people.</Tagline>
            <SubTagline>Find where to go together.</SubTagline>
          </TextSection>

          {/* 10 — MAYA */}
          <TextSection id="maya">
            <Label>Intelligent assistant</Label>
            <MegaTitle>Maya</MegaTitle>
            <BodyText>
              An elegant abstract intelligence that connects your digital life. Maya understands context across all Syncup systems — suggesting connections, surfacing moments, and bringing everything together.
            </BodyText>
            <PillRow items={["Status", "Chats", "Maps", "Open Network", "Pulse"]} active delay={0.3} />
            <Tagline>One intelligent layer connecting your digital life.</Tagline>
            <SubTagline>Meet Maya.</SubTagline>
          </TextSection>

          {/* 13 — ECOSYSTEM */}
          <TextSection id="ecosystem">
            <Label>More than messaging</Label>
            <MegaTitle>Everything connects.</MegaTitle>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={viewport} transition={{ ...transition, delay: 0.2 }}
              className="subheadline"
              style={{ marginBottom: "2.5rem" }}
            >
              One place for the people, conversations, moments and experiences that make up your life.
            </motion.p>
            <div className="flex flex-wrap gap-2.5 items-center">
              {["People", "Status", "Chats", "Maps", "Open Network", "Sync Space", "Maya"].map((item, i) => (
                <motion.div
                  key={item}
                  variants={scaleIn} initial="hidden" whileInView="visible"
                  viewport={viewport} transition={{ ...transition, delay: i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <span className="glass-card font-bold text-sm" style={{ color: "var(--violet)", padding: "0.5rem 1.1rem" }}>{item}</span>
                  {i < 6 && (
                    <motion.div
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      style={{ width: "1.25rem", height: "2px", background: "linear-gradient(to right, transparent, #a78bfa)" }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </TextSection>

          {/* 14 — SOCIAL FACE */}
          <TextSection id="social">
            <Tagline>A more human way to be social.</Tagline>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={viewport} transition={{ ...transition, delay: 0.15 }}
              className="subheadline"
              style={{ marginBottom: "3rem" }}
            >
              The social face of your life.
            </motion.p>
            <MegaTitle delay={0.3}>Syncup</MegaTitle>
          </TextSection>

          {/* 15 — FINAL */}
          <TextSection id="final">
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={viewport} transition={{ ...transition, delay: 0.1 }}
              className="headline-medium gradient-text-static"
              style={{ marginBottom: "1.5rem" }}
            >
              Find your people.
            </motion.p>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={viewport} transition={{ ...transition, delay: 0.2 }}
              className="headline-medium gradient-text-static"
              style={{ marginBottom: "1.5rem" }}
            >
              Find your rhythm.
            </motion.p>
            <div style={{ marginBottom: "2.5rem" }}>
              {["ONE LIFE.", "ONE RHYTHM.", "ONE SYNC."].map((line, i) => (
                <motion.h2
                  key={line}
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={viewport} transition={{ ...transition, delay: 0.3 + i * 0.12 }}
                  className="headline-mega gradient-text"
                  style={{ marginBottom: "0.25rem" }}
                >
                  {line}
                </motion.h2>
              ))}
            </div>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={viewport} transition={{ ...transition, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
              style={{ marginBottom: "3rem" }}
            >
              <JoinButton onClick={openWaitlist}>Join Syncup</JoinButton>
              <button className="cta-secondary" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Back to top
              </button>
            </motion.div>
            <JoinCount count={joinedCount} />
            <motion.p
              variants={fadeIn} initial="hidden" whileInView="visible"
              viewport={viewport} transition={{ ...transition, delay: 0.9 }}
              className="text-sm"
              style={{ color: "var(--fg-dim)", letterSpacing: "0.25em", textTransform: "uppercase" }}
            >
              Syncup — One life. One rhythm. One sync.
            </motion.p>
          </TextSection>
        </div>

        {/* ===== RIGHT: Fixed 3D phone ===== */}
        <div className="split-right">
          <Phone3D screenKey={key}>
            {screen}
          </Phone3D>
        </div>
      </div>

      {waitlistOpen && (
        <WaitlistModal
          onClose={closeWaitlist}
          initialCount={joinedCount}
          onJoined={setJoinedCount}
        />
      )}
    </>
  );
}
