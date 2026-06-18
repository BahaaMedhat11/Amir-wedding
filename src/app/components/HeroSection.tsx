import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useLang } from "./LanguageContext";
import { BokehParticles } from "./BokehParticles";

const WEDDING_DATE = new Date("2026-06-29T18:00:00");

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function HeroSection({ onWishClick }: { onWishClick: () => void }) {
  const { t, isRTL } = useLang();
  const [time, setTime] = useState(getTimeLeft);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1529330821961-0414396878d8?w=1920&h=1200&fit=crop&auto=format"
          alt="Wedding white flowers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </div>

      {/* Bokeh */}
      <BokehParticles count={50} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.3em" }}
          className="text-xs uppercase text-amber-200 mb-6 tracking-widest"
        >
          {t("heroTagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <h1
            style={{
              fontFamily: isRTL ? "'Amiri', serif" : "'Cormorant Garamond', serif",
              fontWeight: 300,
              lineHeight: 1.1,
            }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-4"
          >
            {t("groomName")}
          </h1>
          <div className="flex items-center justify-center gap-6 my-2">
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-amber-300" />
            <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2rem, 5vw, 3.5rem)" }} className="text-amber-300">
              &
            </span>
            <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-amber-300" />
          </div>
          <h1
            style={{
              fontFamily: isRTL ? "'Amiri', serif" : "'Cormorant Garamond', serif",
              fontWeight: 300,
              lineHeight: 1.1,
            }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-8"
          >
            {t("brideName")}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-12"
        >
          <p
            style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.15em" }}
            className="text-amber-200 text-sm uppercase mb-2"
          >
            {t("heroSubtitle")}
          </p>
          <p
            style={{ fontFamily: isRTL ? "'Amiri', serif" : "'Cormorant Garamond', serif", fontStyle: "italic" }}
            className="text-white/80 text-2xl"
          >
            {t("weddingDate")}
          </p>
        </motion.div>

        {/* Mini countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center justify-center gap-4 sm:gap-8 mb-10"
        >
          {[
            { value: time.days, label: t("countdownDays") },
            { value: time.hours, label: t("countdownHours") },
            { value: time.minutes, label: t("countdownMinutes") },
            { value: time.seconds, label: t("countdownSeconds") },
          ].map(({ value, label }, i) => (
            <div key={i} className="text-center">
              <div
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
                className="text-3xl sm:text-4xl text-white"
              >
                {pad(value)}
              </div>
              <div
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}
                className="text-amber-300/80 text-xs uppercase mt-1"
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onWishClick}
          style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.2em" }}
          className="px-10 py-4 border border-amber-300/60 text-amber-200 text-sm uppercase hover:bg-amber-300/10 transition-all duration-500 rounded-none"
        >
          💍 {t("leaveWish")}
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.2em" }} className="text-xs uppercase">
          {t("scrollDown")}
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
