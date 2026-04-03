import { useState, useEffect, useRef } from "react";

const floatingEmojis = ["💖", "🌸", "✨", "💫", "🌺", "💝", "🦋", "🌟", "🎀", "💕", "🍭", "🌈"];

function FloatingEmoji({ emoji, style }: { emoji: string; style: React.CSSProperties }) {
  return (
    <span
      className="absolute select-none pointer-events-none animate-float text-2xl sm:text-3xl"
      style={style}
    >
      {emoji}
    </span>
  );
}

function ConfettiPiece({ style }: { style: React.CSSProperties }) {
  return <div className="absolute rounded-sm animate-confetti" style={style} />;
}

const steps = [
  {
    icon: "🙈",
    title: "Okay... I owe you a BIG apology.",
    text: "So… you don't know me. And I don't really know you either. But through our mutual bestie, I pulled a prank on you — and honestly? It went a little too far. 😬",
  },
  {
    icon: "😅",
    title: "Here's what happened...",
    text: "I thought it would be funny. I convinced our bestie to go along with it and… yeah, I did NOT think through how it would feel on YOUR end. That was totally not cool of me.",
  },
  {
    icon: "💔",
    title: "I genuinely feel bad.",
    text: "You didn't deserve to be pranked by someone you don't even know. That's honestly just awkward and unfair. I put you in a weird spot and I hate that I did that.",
  },
  {
    icon: "🙏",
    title: "From the bottom of my heart...",
    text: "I am SO sorry. Not a fake sorry. Not a 'sorry you got upset' sorry. A real, actual, I-wish-I-could-take-it-back sorry. You seem like an amazing person and you deserved better than that from day one.",
  },
  {
    icon: "🤝",
    title: "Can we start over?",
    text: "I'd love for us to start fresh — no pranks, no weird energy, just good vibes. Maybe one day we'll laugh about this together. Maybe. 😂",
  },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [forgiven, setForgiven] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [floaters, setFloaters] = useState<{ id: number; emoji: string; left: string; delay: string; duration: string }[]>([]);
  const [confetti, setConfetti] = useState<{ id: number; left: string; color: string; delay: string; size: number }[]>([]);
  const [heartBurst, setHeartBurst] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      emoji: floatingEmojis[i % floatingEmojis.length],
      left: `${Math.random() * 95}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${6 + Math.random() * 6}s`,
    }));
    setFloaters(items);
  }, []);

  useEffect(() => {
    if (forgiven) {
      const pieces = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        color: ["#ff6eb4", "#ffd6f0", "#a78bfa", "#fb923c", "#34d399", "#60a5fa", "#fbbf24"][
          Math.floor(Math.random() * 7)
        ],
        delay: `${Math.random() * 2}s`,
        size: 8 + Math.floor(Math.random() * 10),
      }));
      setConfetti(pieces);
    }
  }, [forgiven]);

  const noButtonTexts = [
    "No 😤",
    "Hmm... still no 😒",
    "Really no? 🙄",
    "Come on... 🥺",
    "Please?? 😭",
    "I'll cry 😢",
    "Last chance... 👉👈",
    "Okay fine... but maybe? 🤔",
    "Almost there... 💫",
    "You're breaking my heart 💔",
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowFinal(true);
    }
  };

  const handleForgive = () => {
    setHeartBurst(true);
    setTimeout(() => setForgiven(true), 600);
  };

  const handleNo = () => {
    setNoCount((n) => n + 1);
  };

  const yesSize = Math.min(100 + noCount * 12, 200);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden font-nunito"
      style={{
        backgroundImage: "url('/images/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-pink-50/60 backdrop-blur-[2px]" />

      {/* Floating emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floaters.map((f) => (
          <FloatingEmoji
            key={f.id}
            emoji={f.emoji}
            style={{
              left: f.left,
              bottom: "-60px",
              animationDelay: f.delay,
              animationDuration: f.duration,
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      {forgiven && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confetti.map((c) => (
            <ConfettiPiece
              key={c.id}
              style={{
                left: c.left,
                top: "-20px",
                width: c.size,
                height: c.size,
                backgroundColor: c.color,
                animationDelay: c.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {!showFinal && !forgiven && (
          <div className="w-full max-w-lg">
            {/* Step Card */}
            <div
              key={currentStep}
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-pink-200 p-8 sm:p-10 text-center animate-slideUp"
            >
              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-6">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-500 ${
                      i === currentStep
                        ? "w-6 h-3 bg-pink-500"
                        : i < currentStep
                        ? "w-3 h-3 bg-pink-300"
                        : "w-3 h-3 bg-pink-100"
                    }`}
                  />
                ))}
              </div>

              {/* Big emoji */}
              <div className="text-7xl mb-4 animate-bounce-slow">{steps[currentStep].icon}</div>

              {/* Title */}
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-pink-600 mb-4 leading-tight"
                style={{ fontFamily: "Pacifico, cursive" }}
              >
                {steps[currentStep].title}
              </h2>

              {/* Text */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                {steps[currentStep].text}
              </p>

              {/* Button */}
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-pink-300 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {currentStep < steps.length - 1 ? "Next 💕" : "See My Apology 🎀"}
              </button>
            </div>

            {/* Bear image */}
            <div className="flex justify-center mt-6">
              <img
                src="/images/sorry-bear.png"
                alt="Sorry Bear"
                className="w-36 sm:w-44 drop-shadow-xl animate-wiggle"
              />
            </div>
          </div>
        )}

        {/* Final apology + forgiveness screen */}
        {showFinal && !forgiven && (
          <div className="w-full max-w-lg animate-slideUp">
            <div className="bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl border border-pink-200 p-8 sm:p-10 text-center">
              <div className={`text-7xl mb-4 transition-all duration-500 ${heartBurst ? "scale-150 opacity-0" : "animate-pulse"}`}>
                💖
              </div>
              <h1
                className="text-3xl sm:text-4xl font-extrabold text-pink-600 mb-3"
                style={{ fontFamily: "Pacifico, cursive" }}
              >
                I'm Truly Sorry! 🙏
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-2">
                You didn't deserve that prank. You seem like such a genuine and cool person, and I want you to know that prank had <strong>zero</strong> bad intentions — just really bad execution 😅.
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                I hope you can find it in your heart to forgive a clumsy stranger who only wishes you good things! 🌸✨
              </p>

              {/* Forgiveness buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                <button
                  onClick={handleForgive}
                  className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-black rounded-full shadow-lg hover:scale-110 hover:shadow-green-300 active:scale-95 transition-all duration-200 flex items-center gap-2"
                  style={{ fontSize: `${Math.min(16 + noCount * 2, 22)}px`, padding: `${Math.min(14 + noCount * 2, 24)}px ${Math.min(28 + noCount * 4, 50)}px`, width: yesSize > 140 ? yesSize : undefined }}
                >
                  ✅ Yes, Forgiven!
                </button>
                <button
                  onClick={handleNo}
                  className="bg-gray-100 text-gray-400 font-semibold text-sm px-5 py-3 rounded-full border border-gray-200 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
                  style={{ fontSize: noCount >= 5 ? "10px" : undefined, transform: noCount >= 3 ? `translate(${Math.random() > 0.5 ? 8 : -8}px, 0)` : undefined }}
                >
                  {noButtonTexts[Math.min(noCount, noButtonTexts.length - 1)]}
                </button>
              </div>

              {noCount > 0 && (
                <p className="mt-4 text-pink-400 text-sm font-semibold animate-pulse">
                  {noCount >= 8
                    ? "Okay I'll stay here until you click yes 😭💀"
                    : noCount >= 5
                    ? "The YES button keeps getting bigger for a reason 😂"
                    : noCount >= 3
                    ? "You're so tough but I respect it 🥺"
                    : "I get it... but please? 🌸"}
                </p>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <img
                src="/images/sorry-bear.png"
                alt="Sorry Bear"
                className="w-36 sm:w-44 drop-shadow-xl animate-wiggle"
              />
            </div>
          </div>
        )}

        {/* FORGIVEN screen */}
        {forgiven && (
          <div className="w-full max-w-lg animate-slideUp text-center">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-pink-200 p-8 sm:p-12">
              <div className="text-7xl mb-4 animate-spin-slow">🎉</div>
              <h1
                className="text-3xl sm:text-5xl font-extrabold text-pink-600 mb-4"
                style={{ fontFamily: "Pacifico, cursive" }}
              >
                YAY! We're Cool! 🥳
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                OMG THANK YOU! You are literally the most amazing, most forgiving, most awesome person ever! 🌟
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                You deserve all the good vibes, good days, and good people around you. From this day forward — only good energy between us! 💕✨
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-3xl mb-6">
                {["💖", "🌸", "✨", "🎀", "💫", "🦋", "🌈", "🎉", "🥳", "💝"].map((e, i) => (
                  <span key={i} className="animate-bounce-slow" style={{ animationDelay: `${i * 0.1}s` }}>
                    {e}
                  </span>
                ))}
              </div>
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border border-pink-100">
                <p className="text-pink-500 font-bold text-lg">
                  "Friends by accident, cool by choice." 💕
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <img
                src="/images/sorry-bear.png"
                alt="Sorry Bear"
                className="w-44 drop-shadow-xl"
                style={{ animation: "wiggle 1s infinite, bounce 2s infinite" }}
              />
            </div>
          </div>
        )}

        {/* Footer credit */}
        <p className="relative z-10 mt-10 text-pink-400 text-xs font-semibold tracking-widest uppercase opacity-70">
          Made with 💖 just for you
        </p>
      </div>
    </div>
  );
}
