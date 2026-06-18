import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useLang } from "./LanguageContext";
import { BokehParticles } from "./BokehParticles";
import confetti from "canvas-confetti";

const WEDDING_DATE = new Date("2026-06-29T18:00:00");

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountUnit({ value, label }: { value: number; label: string }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        style={{
          background: "linear-gradient(135deg, rgba(255,253,249,0.1) 0%, rgba(255,253,249,0.05) 100%)",
          border: "1px solid rgba(184,151,90,0.3)",
          backdropFilter: "blur(10px)",
          padding: "clamp(1rem, 3vw, 2rem)",
          minWidth: "clamp(80px, 15vw, 140px)",
          borderRadius: "2px",
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              display: "block",
              textAlign: "center",
              color: "#EDD9A3",
              lineHeight: 1,
            }}
          >
            {pad(value)}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.2em" }}
        className="text-amber-200/60 text-xs uppercase mt-4"
      >
        {label}
      </span>
    </div>
  );
}

export function CountdownSection() {
  const { t, isRTL } = useLang();
  const [time, setTime] = useState(getTimeLeft);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [celebrated, setCelebrated] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      const t = getTimeLeft();
      setTime(t);
      if (!t && !celebrated) {
        setCelebrated(true);
        confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 }, colors: ["#B8975A", "#E8C4BE", "#EDD9A3"] });
      }
    }, 1000);
    return () => clearInterval(id);
  }, [celebrated]);

  return (
    <section
      ref={ref}
      id="countdown"
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1a1208 0%, #2C2416 40%, #1a1208 100%)" }}
    >
      <BokehParticles count={35} />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at center, rgba(184,151,90,0.08) 0%, transparent 70%)" }} />

      {/* Background decorative image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1654699643507-3047b3e07045?w=1200&h=800&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p
            style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.25em" }}
            className="text-xs uppercase text-amber-400/60 mb-4"
          >
            {t("countdownSubtitle")}
          </p>
          <h2
            style={{
              fontFamily: isRTL ? "'Amiri', serif" : "'Cormorant Garamond', serif",
              fontWeight: 300,
              lineHeight: 1.2,
            }}
            className="text-5xl md:text-6xl text-amber-100"
          >
            {t("countdownTitle")}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600/50" />
            <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.5rem" }} className="text-amber-400">
              ♥
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600/50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {time ? (
            <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
              <CountUnit value={time.days} label={t("countdownDays")} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-amber-600/40 text-5xl mb-4">:</span>
              <CountUnit value={time.hours} label={t("countdownHours")} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-amber-600/40 text-5xl mb-4">:</span>
              <CountUnit value={time.minutes} label={t("countdownMinutes")} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-amber-600/40 text-5xl mb-4">:</span>
              <CountUnit value={time.seconds} label={t("countdownSeconds")} />
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ fontFamily: isRTL ? "'Amiri', serif" : "'Cormorant Garamond', serif" }}
              className="text-4xl md:text-6xl text-amber-200"
            >
              {t("countdownExpired")}
            </motion.div>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          style={{ fontFamily: isRTL ? "'Amiri', serif" : "'Cormorant Garamond', serif", fontStyle: "italic" }}
          className="text-amber-200/50 text-xl mt-16"
        >
          {t("coupleNames")} — {t("weddingDate")}
        </motion.p>
      </div>
    </section>
  );
}
