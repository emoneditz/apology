import { useState, useEffect, useRef } from "react";

interface Particle {
  id: number;
  left: number;
  duration: number;
  size: number;
  type: "feather" | "petal" | "ember";
}

const noMessages = [
  "No.",
  "...Still no.",
  "Not a chance.",
  "I said no.",
  "You cannot win this.",
  "Give up.",
  "Never.",
  "I am the King of this World. No.",
  "This is getting embarrassing.",
  "FINE. But still no.",
];

let pid = 0;

export default function App() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [answered, setAnswered] = useState<"yes" | null>(null);
  const [noCount, setNoCount] = useState(0);
  const [noStyle, setNoStyle] = useState<React.CSSProperties>({});
  const [shake, setShake] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [glitch, setGlitch] = useState(false);
  const btnAreaRef = useRef<HTMLDivElement>(null);

  const fullText = "Ms Hasu Afa 🥰 aka Ms Hafsa — abarer jonno maf kore den.";

  // Typing effect
  useEffect(() => {
    if (!showLetter) return;
    let i = 0;
    setTypedText("");
    const iv = setInterval(() => {
      i++;
      setTypedText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(iv);
    }, 45);
    return () => clearInterval(iv);
  }, [showLetter]);

  // Particles
  useEffect(() => {
    const iv = setInterval(() => {
      const types: Particle["type"][] = ["feather", "petal", "ember"];
      setParticles((p) => [
        ...p.slice(-25),
        {
          id: pid++,
          left: Math.random() * 100,
          duration: 6 + Math.random() * 5,
          size: 10 + Math.random() * 14,
          type: types[Math.floor(Math.random() * types.length)],
        },
      ]);
    }, 500);
    return () => clearInterval(iv);
  }, []);

  // Glitch on NO
  useEffect(() => {
    if (noCount > 0) {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 600);
    }
  }, [noCount]);

  const handleNo = () => {
    setNoCount((c) => c + 1);
    setShake(true);
    setTimeout(() => setShake(false), 500);
    if (btnAreaRef.current) {
      const r = btnAreaRef.current.getBoundingClientRect();
      setNoStyle({
        position: "absolute",
        top: `${10 + Math.random() * (r.height - 55)}px`,
        left: `${10 + Math.random() * (r.width - 110)}px`,
        transition: "top 0.35s cubic-bezier(.4,2,.6,1), left 0.35s cubic-bezier(.4,2,.6,1)",
      });
    }
  };

  const yesScale = Math.min(1 + noCount * 0.18, 2.5);
  const noLabel = noMessages[Math.min(noCount, noMessages.length - 1)];

  const particleChar = (type: Particle["type"]) => {
    if (type === "feather") return "🖤";
    if (type === "petal") return "🌹";
    return "🔴";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&family=Dancing+Script:wght@700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --red: #c0392b;
          --dark-red: #7b0d0d;
          --gold: #c9a84c;
          --light-gold: #e8c97a;
          --cream: #f5ede0;
          --dark: #0a0a0a;
          --dark2: #111;
          --paper: #1a1008;
        }

        body {
          background: var(--dark);
          font-family: 'Crimson Text', serif;
          overflow-x: hidden;
          cursor: default;
        }

        /* ===== BACKGROUND ===== */
        .bg {
          position: fixed; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse at 15% 20%, rgba(150,10,10,0.18) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 80%, rgba(100,5,5,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, #0e0a04 0%, #070707 70%, #030303 100%);
        }

        /* Animated red vignette pulse */
        .bg-pulse {
          position: fixed; inset: 0; z-index: 0;
          background: radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(120,0,0,0.12) 100%);
          animation: bgPulse 4s ease-in-out infinite;
        }
        @keyframes bgPulse {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }

        /* Grid lines */
        .bg-grid {
          position: fixed; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(180,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(180,0,0,0.04) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        /* ===== PARTICLES ===== */
        .particle {
          position: fixed; pointer-events: none; z-index: 1;
          animation: fall linear forwards;
          user-select: none;
          bottom: 100%;
        }
        @keyframes fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(110vh) rotate(540deg); opacity: 0; }
        }

        /* ===== PAGE ===== */
        .page {
          position: relative; z-index: 2;
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 40px 16px;
          gap: 0;
        }

        /* ===== TOP ORNAMENT ===== */
        .top-ornament {
          text-align: center; margin-bottom: 8px;
          animation: fadeIn 1s ease both;
        }
        .ornament-line {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          color: var(--gold); font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase;
          font-family: 'Cinzel', serif;
        }
        .ornament-line::before, .ornament-line::after {
          content: '';
          display: block; width: 80px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        /* ===== MAIN WRAPPER ===== */
        .main-wrapper {
          width: 100%; max-width: 820px;
          display: flex; flex-direction: column; align-items: center;
          gap: 0;
          animation: riseUp 1s ease 0.3s both;
        }
        @keyframes riseUp {
          from { opacity:0; transform: translateY(40px); }
          to   { opacity:1; transform: translateY(0); }
        }

        /* ===== NOTEBOOK CARD ===== */
        .notebook {
          width: 100%;
          background: #0d0d0d;
          border: 1px solid rgba(180,0,0,0.3);
          border-radius: 4px;
          box-shadow:
            0 0 0 1px rgba(201,168,76,0.08),
            0 0 80px rgba(150,0,0,0.2),
            0 20px 60px rgba(0,0,0,0.8),
            inset 0 0 30px rgba(0,0,0,0.5);
          overflow: hidden;
          position: relative;
        }

        /* Red spine line */
        .notebook::before {
          content: '';
          position: absolute; left: 52px; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, transparent, var(--dark-red) 20%, var(--dark-red) 80%, transparent);
          z-index: 2;
        }

        /* ===== HEADER ===== */
        .nb-header {
          background: linear-gradient(180deg, #0f0000 0%, #140a00 50%, #0d0d0d 100%);
          border-bottom: 1px solid rgba(180,0,0,0.3);
          padding: 36px 48px 28px 80px;
          position: relative;
          display: flex; align-items: center; gap: 32px;
        }
        .nb-header::after {
          content:'';
          position: absolute; inset:0;
          background: radial-gradient(ellipse at 30% 50%, rgba(150,0,0,0.08) 0%, transparent 70%);
        }

        .deathnote-img {
          width: 90px; flex-shrink: 0;
          filter: drop-shadow(0 0 20px rgba(180,0,0,0.6)) drop-shadow(0 4px 12px rgba(0,0,0,0.8));
          animation: floatBook 4s ease-in-out infinite;
          position: relative; z-index: 1;
        }
        @keyframes floatBook {
          0%,100% { transform: translateY(0) rotate(-3deg); }
          50%      { transform: translateY(-8px) rotate(2deg); }
        }

        .header-text { flex: 1; position: relative; z-index: 1; }
        .header-eyebrow {
          font-family: 'Cinzel', serif;
          font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--gold); opacity: 0.7; margin-bottom: 6px;
        }
        .header-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.6rem, 4vw, 2.6rem);
          font-weight: 900;
          color: var(--cream);
          line-height: 1.15;
          text-shadow: 0 0 30px rgba(201,168,76,0.3), 0 2px 4px rgba(0,0,0,0.8);
        }
        .header-title span {
          color: var(--gold);
          text-shadow: 0 0 20px rgba(201,168,76,0.6);
        }
        .header-subtitle {
          font-family: 'Crimson Text', serif;
          font-style: italic;
          font-size: 0.95rem;
          color: rgba(245,237,224,0.45);
          margin-top: 6px;
          letter-spacing: 0.04em;
        }

        /* ===== BODY ===== */
        .nb-body {
          display: flex;
          min-height: 420px;
        }

        /* Left: Light Yagami illustration */
        .nb-sidebar {
          width: 200px; flex-shrink: 0;
          background: linear-gradient(180deg, #0a0000 0%, #0d0a04 100%);
          border-right: 1px solid rgba(180,0,0,0.15);
          display: flex; flex-direction: column; align-items: center;
          padding: 24px 12px;
          gap: 16px;
          position: relative;
        }
        .nb-sidebar::after {
          content:'';
          position: absolute; inset:0;
          background: radial-gradient(ellipse at 50% 70%, rgba(120,0,0,0.1) 0%, transparent 70%);
          pointer-events:none;
        }
        .light-img {
          width: 150px;
          filter: drop-shadow(0 0 20px rgba(180,0,0,0.4)) drop-shadow(0 4px 20px rgba(0,0,0,0.9));
          animation: lightGlow 3s ease-in-out infinite;
        }
        @keyframes lightGlow {
          0%,100% { filter: drop-shadow(0 0 15px rgba(180,0,0,0.3)) drop-shadow(0 4px 20px rgba(0,0,0,0.9)); }
          50%      { filter: drop-shadow(0 0 30px rgba(180,0,0,0.6)) drop-shadow(0 4px 20px rgba(0,0,0,0.9)); }
        }
        .sidebar-quote {
          font-family: 'Crimson Text', serif;
          font-style: italic;
          font-size: 0.75rem;
          color: rgba(201,168,76,0.5);
          text-align: center;
          line-height: 1.5;
          padding: 0 8px;
        }
        .rose-img {
          width: 70px;
          filter: drop-shadow(0 0 10px rgba(180,0,0,0.5));
          animation: floatBook 5s ease-in-out infinite reverse;
        }

        /* Right: Letter content */
        .nb-content {
          flex: 1;
          padding: 36px 40px;
          position: relative;
          background: repeating-linear-gradient(
            transparent,
            transparent 31px,
            rgba(180,0,0,0.06) 31px,
            rgba(180,0,0,0.06) 32px
          );
        }

        /* Page number circles */
        .page-dots {
          position: absolute; top: 16px; right: 20px;
          display: flex; gap: 6px;
        }
        .page-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(201,168,76,0.2);
        }
        .page-dot.active { background: var(--gold); box-shadow: 0 0 6px var(--gold); }

        .letter-date {
          font-family: 'Crimson Text', serif;
          font-style: italic;
          font-size: 0.85rem;
          color: rgba(201,168,76,0.5);
          margin-bottom: 24px;
          text-align: right;
        }

        .letter-salutation {
          font-family: 'Dancing Script', cursive;
          font-size: 1.6rem;
          color: var(--cream);
          margin-bottom: 20px;
          text-shadow: 0 0 20px rgba(201,168,76,0.2);
        }

        /* Typewriter message box */
        .typewriter-box {
          background: rgba(201,168,76,0.04);
          border-left: 3px solid var(--dark-red);
          border-radius: 0 8px 8px 0;
          padding: 20px 24px;
          margin-bottom: 28px;
          min-height: 80px;
        }
        .typewriter-text {
          font-family: 'Crimson Text', serif;
          font-size: 1.25rem;
          line-height: 1.9;
          color: var(--cream);
          font-style: italic;
        }
        .cursor {
          display: inline-block;
          width: 2px; height: 1.1em;
          background: var(--red);
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: blink 0.8s step-end infinite;
        }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }

        /* "Before typing" placeholder */
        .reveal-btn {
          background: none;
          border: 1px solid rgba(201,168,76,0.35);
          border-radius: 4px;
          color: rgba(201,168,76,0.7);
          font-family: 'Cinzel', serif;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          padding: 10px 24px;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          display: block; margin: 0 auto 28px;
        }
        .reveal-btn:hover {
          background: rgba(201,168,76,0.08);
          border-color: var(--gold);
          color: var(--gold);
          box-shadow: 0 0 20px rgba(201,168,76,0.15);
        }

        /* Divider */
        .rune-divider {
          display: flex; align-items: center; gap: 10px;
          margin: 20px 0;
          color: rgba(180,0,0,0.5);
          font-size: 0.7rem; letter-spacing: 0.2em;
          font-family: 'Cinzel', serif;
        }
        .rune-divider::before, .rune-divider::after {
          content:''; flex:1; height:1px;
          background: linear-gradient(90deg, transparent, rgba(180,0,0,0.4), transparent);
        }

        /* ===== BUTTON ZONE ===== */
        .verdict-section {
          padding: 28px 40px 36px 40px;
          border-top: 1px solid rgba(180,0,0,0.2);
          background: linear-gradient(0deg, rgba(120,0,0,0.06) 0%, transparent 100%);
        }
        .verdict-label {
          font-family: 'Cinzel', serif;
          font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(201,168,76,0.5);
          text-align: center;
          margin-bottom: 20px;
        }
        .btn-area {
          position: relative; min-height: 100px;
          display: flex; align-items: center; justify-content: center; gap: 24px;
          overflow: hidden;
        }

        /* YES */
        .btn-yes {
          font-family: 'Cinzel', serif;
          font-size: 1rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          background: linear-gradient(135deg, #8b0000, #c0392b, #8b0000);
          color: var(--cream);
          border: 1px solid rgba(201,168,76,0.4);
          border-radius: 3px;
          padding: 14px 40px;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(150,0,0,0.4), 0 0 0 0 rgba(150,0,0,0.2);
          transition: box-shadow 0.2s, transform 0.15s;
          animation: yesDramatic 2.5s ease-in-out infinite;
          transform-origin: center;
          position: relative;
        }
        .btn-yes::after {
          content: '';
          position: absolute; inset: -1px;
          background: linear-gradient(135deg, transparent 30%, rgba(201,168,76,0.15) 50%, transparent 70%);
          border-radius: 3px;
        }
        @keyframes yesDramatic {
          0%,100% { box-shadow: 0 0 20px rgba(150,0,0,0.4), 0 0 0 0 rgba(150,0,0,0); }
          50%      { box-shadow: 0 0 40px rgba(150,0,0,0.7), 0 0 0 8px rgba(150,0,0,0); }
        }
        .btn-yes:hover { box-shadow: 0 0 50px rgba(200,0,0,0.6); }
        .btn-yes:active { transform: scale(0.97); }

        /* NO */
        .btn-no {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem; font-weight: 600; letter-spacing: 0.12em;
          background: rgba(30,10,10,0.7);
          color: rgba(245,180,180,0.9);
          border: 1px solid rgba(200,60,60,0.55);
          border-radius: 3px;
          padding: 12px 28px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          box-shadow: 0 0 10px rgba(180,0,0,0.2), inset 0 1px 0 rgba(255,100,100,0.08);
          text-shadow: 0 0 8px rgba(220,80,80,0.5);
        }
        .btn-no:hover {
          color: #fff;
          border-color: rgba(220,60,60,0.9);
          background: rgba(100,0,0,0.5);
          box-shadow: 0 0 20px rgba(180,0,0,0.45);
        }

        .no-taunt {
          position: absolute; bottom: -20px; left:0; right:0;
          text-align: center;
          font-family: 'Crimson Text', serif; font-style: italic;
          font-size: 0.78rem;
          color: rgba(180,0,0,0.5);
        }

        /* ===== GLITCH ===== */
        .glitch {
          animation: glitchEffect 0.5s ease both;
        }
        @keyframes glitchEffect {
          0%  { filter: none; }
          20% { filter: hue-rotate(90deg) saturate(3) brightness(1.5); transform: translateX(-3px); }
          40% { filter: hue-rotate(-90deg) saturate(3); transform: translateX(3px); }
          60% { filter: hue-rotate(30deg); transform: translateX(-1px); }
          80% { filter: none; transform: translateX(1px); }
          100%{ filter: none; transform: translateX(0); }
        }

        /* ===== SHAKE ===== */
        .shake { animation: shakeIt 0.45s ease both; }
        @keyframes shakeIt {
          0%,100% { transform: translateX(0); }
          25%      { transform: translateX(-10px); }
          75%      { transform: translateX(10px); }
        }

        /* ===== SUCCESS SCREEN ===== */
        .success-page {
          position: relative; z-index: 2;
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 40px 16px; gap: 28px;
        }
        .success-card {
          width: 100%; max-width: 560px;
          background: #0d0d0d;
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 4px;
          box-shadow: 0 0 80px rgba(201,168,76,0.1), 0 0 120px rgba(150,0,0,0.2), 0 20px 60px rgba(0,0,0,0.9);
          overflow: hidden;
          animation: popIn 0.9s cubic-bezier(.4,2,.6,1) both;
          text-align: center;
        }
        @keyframes popIn {
          0%   { opacity:0; transform: scale(0.6) rotate(-4deg); }
          70%  { transform: scale(1.04) rotate(1deg); }
          100% { opacity:1; transform: scale(1) rotate(0); }
        }
        .success-top {
          background: linear-gradient(180deg, #0f0000 0%, #0d0a04 100%);
          border-bottom: 1px solid rgba(180,0,0,0.3);
          padding: 36px 32px 28px;
        }
        .success-title {
          font-family: 'Cinzel', serif;
          font-size: 2rem; font-weight: 900;
          color: var(--gold);
          text-shadow: 0 0 30px rgba(201,168,76,0.5);
          margin-bottom: 8px;
        }
        .success-body { padding: 32px; }
        .success-msg {
          font-family: 'Crimson Text', serif;
          font-size: 1.2rem; font-style: italic;
          color: var(--cream);
          line-height: 1.8;
        }
        .success-light {
          width: 120px;
          filter: drop-shadow(0 0 20px rgba(201,168,76,0.4));
          margin: 0 auto 16px;
          animation: lightGlow 3s ease-in-out infinite;
        }
        .success-roses {
          display: flex; justify-content: center; gap: 12px; margin-top: 20px;
        }
        .success-rose {
          width: 48px;
          filter: drop-shadow(0 0 8px rgba(180,0,0,0.5));
          animation: floatBook 3s ease-in-out infinite;
        }
        .success-rose:nth-child(2) { animation-delay: 0.5s; }
        .success-rose:nth-child(3) { animation-delay: 1s; }

        /* ===== FOOTER ===== */
        .footer {
          font-family: 'Cinzel', serif;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(201,168,76,0.2);
          text-align: center;
          margin-top: 12px;
          animation: fadeIn 1s ease 1.2s both;
        }

        @keyframes fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }

        /* ===== MOBILE ===== */
        @media (max-width: 600px) {
          .nb-body { flex-direction: column; }
          .nb-sidebar { width: 100%; flex-direction: row; justify-content: center; padding: 16px; border-right: none; border-bottom: 1px solid rgba(180,0,0,0.15); }
          .nb-header { padding: 24px 20px 20px; }
          .nb-header::before { display: none; }
          .notebook::before { left: 0; display: none; }
          .nb-content { padding: 24px 20px; }
          .verdict-section { padding: 20px; }
          .light-img { width: 100px; }
          .rose-img { display: none; }
          .sidebar-quote { display: none; }
        }
      `}</style>

      <div className="bg" />
      <div className="bg-pulse" />
      <div className="bg-grid" />

      {/* Falling particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            top: 0,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {particleChar(p.type)}
        </span>
      ))}

      {answered === "yes" ? (
        /* ===== SUCCESS SCREEN ===== */
        <div className="success-page">
          <div className="ornament-line" style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: "0.6rem", letterSpacing: "0.25em", display: "flex", alignItems: "center", gap: 12, width: "100%", maxWidth: 560 }}>
            <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #c9a84c, transparent)", display: "block" }} />
            JUDGMENT RENDERED
            <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #c9a84c, transparent)", display: "block" }} />
          </div>
          <div className="success-card">
            <div className="success-top">
              <img src="/images/light.png" alt="Light Yagami" className="success-light" />
              <div className="success-title">Maf Kore Dilen 🥀</div>
              <p style={{ fontFamily: "'Crimson Text', serif", fontStyle: "italic", color: "rgba(201,168,76,0.6)", fontSize: "0.85rem" }}>
                — Even the God of the New World bows to your kindness —
              </p>
            </div>
            <div className="success-body">
              <p className="success-msg">
                Hasu Afa, you have the grace of a queen and the heart of an angel. 🖤<br /><br />
                Thank you for forgiving me. You truly are one of a kind. 🌹
              </p>
              <div className="success-roses">
                {[0, 0.4, 0.8].map((d, i) => (
                  <img key={i} src="/images/rose.png" alt="rose" className="success-rose" style={{ animationDelay: `${d}s` }} />
                ))}
              </div>
            </div>
          </div>
          <p className="footer">© 2026 Emon — All Rights Reserved &nbsp;|&nbsp; 💀 Written in the Death Note — For Ms. Hasu Afa 🥀</p>
        </div>
      ) : (
        /* ===== MAIN SCREEN ===== */
        <div className="page">
          {/* Top ornament */}
          <div className="top-ornament" style={{ width: "100%", maxWidth: 820 }}>
            <div className="ornament-line">✦ &nbsp; The Death Note &nbsp; ✦</div>
          </div>

          <div className={`main-wrapper ${glitch ? "glitch" : ""}`}>
            <div className="notebook">

              {/* Header */}
              <div className="nb-header">
                <img src="/images/deathnote.png" alt="Death Note" className="deathnote-img" />
                <div className="header-text">
                  <div className="header-eyebrow">✦ A Message From the King of This World ✦</div>
                  <h1 className="header-title">
                    Ms. <span>Hasu Afa</span> 🥀
                  </h1>
                  <p className="header-subtitle">aka Ms. Hafsa — the one who matters</p>
                </div>
              </div>

              {/* Body */}
              <div className="nb-body">

                {/* Sidebar */}
                <div className="nb-sidebar">
                  <img src="/images/light.png" alt="Light Yagami" className="light-img" />
                  <p className="sidebar-quote">"I am the King of This World. And I am... sorry." — L.Y.</p>
                  <img src="/images/rose.png" alt="rose" className="rose-img" />
                </div>

                {/* Letter content */}
                <div className="nb-content">
                  <div className="page-dots">
                    <div className="page-dot active" />
                    <div className="page-dot" />
                    <div className="page-dot" />
                  </div>

                  <div className="letter-date">— The Present Moment —</div>
                  <div className="letter-salutation">Dear Ms. Hasu Afa,</div>

                  {!showLetter ? (
                    <button className="reveal-btn" onClick={() => setShowLetter(true)}>
                      ✦ Open the Message ✦
                    </button>
                  ) : (
                    <div className="typewriter-box">
                      <p className="typewriter-text">
                        "{typedText}"
                        {typedText.length < fullText.length && <span className="cursor" />}
                      </p>
                    </div>
                  )}

                  <div className="rune-divider">✦ &nbsp; maf &nbsp; ✦</div>

                  <p style={{ fontFamily: "'Crimson Text', serif", fontStyle: "italic", fontSize: "1rem", color: "rgba(245,237,224,0.45)", lineHeight: 1.8 }}>
                    Even the most powerful person in the world kneels before your kindness, Afa. Your grace is unmatched. 🌹
                  </p>

                  <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 16 }}>
                    <img src="/images/feather.png" alt="feather" style={{ width: 36, opacity: 0.7, filter: "drop-shadow(0 0 6px rgba(180,0,0,0.4))" }} />
                    <span style={{ fontFamily: "'Dancing Script', cursive", color: "rgba(201,168,76,0.6)", fontSize: "1.1rem" }}>
                      — Signed with regret & love 🖤
                    </span>
                  </div>
                </div>
              </div>

              {/* Button zone */}
              <div className="verdict-section">
                <div className="verdict-label">✦ Your Verdict, Ms. Afa ✦</div>
                <div className="btn-area" ref={btnAreaRef}>
                  <button
                    className="btn-yes"
                    style={{ transform: `scale(${yesScale})`, transformOrigin: "center" }}
                    onClick={() => setAnswered("yes")}
                  >
                    ✦ Maf Korlam ✦
                  </button>

                  {noCount === 0 ? (
                    <button className="btn-no" onClick={handleNo}>
                      Na
                    </button>
                  ) : (
                    <button
                      className={`btn-no ${shake ? "shake" : ""}`}
                      style={{ position: "absolute", ...noStyle }}
                      onClick={handleNo}
                    >
                      {noLabel}
                    </button>
                  )}

                  {noCount > 0 && (
                    <p className="no-taunt">
                      {noCount} attempt{noCount > 1 ? "s" : ""} to refuse... even Ryuk finds this amusing.
                    </p>
                  )}
                </div>
              </div>

            </div>
          </div>

          <p className="footer">© 2026 Emon — All Rights Reserved &nbsp;|&nbsp; ✦ Written in the Death Note — For Ms. Hasu Afa only ✦</p>
        </div>
      )}
    </>
  );
}
