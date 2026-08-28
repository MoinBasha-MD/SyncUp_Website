"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Phone3D } from "@/components/Phone3D";
import {
  StatusScreen,
  ChatsScreen,
  MapsScreen,
  VibesScreen,
  BlinkScreen,
  MayaScreen,
  PrivacyScreen,
  HomeScreen,
} from "@/components/PhoneMockup";
import { useActiveSection } from "@/components/useActiveSection";

// ===== Animation variants =====
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } };

const viewport = { once: false, amount: 0.2 };
const transition = { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const };

// ===== Section IDs =====
const PHONE_SECTIONS = [
  "opening", "hero", "presence", "status", "chats",
  "privacy", "maps", "feedtab", "blink", "maya",
  "ecosystem", "social", "final",
];

function getPhoneScreen(sectionId: string): { screen: React.ReactNode; key: string } {
  switch (sectionId) {
    case "opening":
    case "hero":
    case "presence":
      return { screen: <HomeScreen />, key: "home" };
    case "status": return { screen: <StatusScreen />, key: "status" };
    case "chats": return { screen: <ChatsScreen />, key: "chats" };
    case "privacy": return { screen: <PrivacyScreen />, key: "privacy" };
    case "maps": return { screen: <MapsScreen />, key: "maps" };
    case "feedtab": return { screen: <VibesScreen />, key: "feedtab" };
    case "blink": return { screen: <BlinkScreen />, key: "blink" };
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
function TextSection({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section
      id={`section-${id}`}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "4rem 0",
      }}
    >
      <div className="max-w-xl w-full">{children}</div>
    </section>
  );
}

// ===== MAIN PAGE =====
export default function Home() {
  const activeSection = useActiveSection(PHONE_SECTIONS);
  const { screen, key } = getPhoneScreen(activeSection);

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
              style={{ marginBottom: "2.5rem" }}
            >
              A new way to stay connected to the people and moments that matter.
            </motion.p>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={viewport} transition={{ ...transition, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="cta-primary">Explore Syncup</button>
              <button className="cta-secondary">Discover how it works</button>
            </motion.div>
          </TextSection>

          {/* 03 — PRESENCE */}
          <TextSection id="presence">
            <Label>The problem with &quot;online&quot;</Label>
            <motion.div
              variants={scaleIn} initial="hidden" whileInView="visible"
              viewport={viewport} transition={transition}
              style={{ marginBottom: "2rem" }}
            >
              <div className="flex items-center gap-5 flex-wrap" style={{ marginBottom: "2rem" }}>
                <span className="headline-medium line-through" style={{ color: "var(--fg-dim)" }}>Online</span>
                <span className="text-2xl" style={{ color: "var(--fg-dim)" }}>/</span>
                <span className="headline-medium line-through" style={{ color: "var(--fg-dim)" }}>Offline</span>
              </div>
            </motion.div>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={viewport} transition={transition}
              className="subheadline"
              style={{ marginBottom: "1rem" }}
            >
              Syncup understands something more human:
            </motion.p>
            <Title delay={0.2}>What are you doing right now?</Title>
            <div className="flex flex-wrap gap-2.5" style={{ marginBottom: "2.5rem" }}>
              {[
                { label: "Driving", icon: "🚗" },
                { label: "At lunch", icon: "🍽" },
                { label: "Client meeting", icon: "💼" },
                { label: "Presenting", icon: "📊" },
                { label: "Available", icon: "✨" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={scaleIn} initial="hidden" whileInView="visible"
                  viewport={viewport} transition={{ ...transition, delay: i * 0.08 }}
                  className="glass-card flex items-center gap-2"
                  style={{ padding: "0.6rem 1rem" }}
                >
                  <span>{s.icon}</span>
                  <span className="text-sm font-semibold" style={{ color: "var(--violet)" }}>{s.label}</span>
                </motion.div>
              ))}
            </div>
            <Tagline>Life doesn&apos;t happen in one status.</Tagline>
            <SubTagline>Syncup brings context to connection.</SubTagline>
          </TextSection>

          {/* 04 — STATUS */}
          <TextSection id="status">
            <Label>Feature</Label>
            <Title>Status</Title>
            <BodyText>
              Communicate what you&apos;re currently doing. Organize your connections into groups. Know when life lines up and connect when you&apos;re both free.
            </BodyText>
            <PillRow items={["Family", "Friends", "Colleagues"]} active delay={0.3} />
            <PillRow items={["Driving", "Meeting", "Presenting", "Client meeting", "Lunch", "Free"]} delay={0.4} />
            <Tagline>Know when life lines up.</Tagline>
            <SubTagline>Connect when you&apos;re both free.</SubTagline>
          </TextSection>

          {/* 05 — CHATS */}
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

          {/* 06 — PRIVACY */}
          <TextSection id="privacy">
            <Label>Feature</Label>
            <Title>Privacy</Title>
            <BodyText>
              Your conversations are protected. Encrypted end-to-end, locked on your device, and always under your control.
            </BodyText>
            <PillRow items={["Encrypted conversations", "Chat locking", "Device privacy"]} active delay={0.3} />
            <Tagline>Your conversations stay yours.</Tagline>
          </TextSection>

          {/* 07 — MAPS */}
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

          {/* 08 — FEEDTAB */}
          <TextSection id="feedtab">
            <Label>Feature</Label>
            <Title>Feedtab</Title>
            <BodyText>
              Life being shared, not just an endless content feed. Vibes, short videos, photos, audios, text, uploads, and stories.
            </BodyText>
            <FeatureGrid
              items={[
                { label: "Vibes", icon: "✨" },
                { label: "Short videos", icon: "🎬" },
                { label: "Photos", icon: "📷" },
                { label: "Audios", icon: "🎵" },
                { label: "Text", icon: "📝" },
                { label: "Stories", icon: "⭕" },
              ]}
            />
            <Tagline>Share the moment.</Tagline>
            <SubTagline>Share the vibe.</SubTagline>
          </TextSection>

          {/* 09 — BLINK */}
          <TextSection id="blink">
            <Label>Feature</Label>
            <MegaTitle>Blink</MegaTitle>
            <BodyText>
              Capture what&apos;s happening right now. A photo. A short clip. A spontaneous moment. If it receives engagement, it stays visible for its <span style={{ color: "var(--purple-bright)", fontWeight: 700 }}>12-hour lifespan</span>. When time expires, it dissolves.
            </BodyText>
            <Tagline>Some moments are meant to be now.</Tagline>
            <SubTagline>Blink. Before the moment passes.</SubTagline>
          </TextSection>

          {/* 10 — MAYA */}
          <TextSection id="maya">
            <Label>Intelligent assistant</Label>
            <MegaTitle>Maya</MegaTitle>
            <BodyText>
              An elegant abstract intelligence that connects your digital life. Maya understands context across all Syncup systems — suggesting connections, surfacing moments, and bringing everything together.
            </BodyText>
            <PillRow items={["Status", "Chats", "Maps", "Feedtab", "Blink"]} active delay={0.3} />
            <Tagline>One intelligent layer connecting your digital life.</Tagline>
            <SubTagline>Meet Maya.</SubTagline>
          </TextSection>

          {/* 11 — ECOSYSTEM */}
          <TextSection id="ecosystem">
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
              {["People", "Status", "Chats", "Maps", "Feedtab", "Blink", "Maya"].map((item, i) => (
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

          {/* 12 — SOCIAL FACE */}
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

          {/* 13 — FINAL */}
          <TextSection id="final">
            <div style={{ marginBottom: "2.5rem" }}>
              {["ONE LIFE.", "ONE RHYTHM.", "ONE SYNC."].map((line, i) => (
                <motion.h2
                  key={line}
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={viewport} transition={{ ...transition, delay: i * 0.12 }}
                  className="headline-mega gradient-text"
                  style={{ marginBottom: "0.25rem" }}
                >
                  {line}
                </motion.h2>
              ))}
            </div>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={viewport} transition={{ ...transition, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
              style={{ marginBottom: "3rem" }}
            >
              <button className="cta-primary">Enter Syncup</button>
              <button className="cta-secondary">Explore the experience</button>
            </motion.div>
            <motion.p
              variants={fadeIn} initial="hidden" whileInView="visible"
              viewport={viewport} transition={{ ...transition, delay: 0.7 }}
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
    </>
  );
}
