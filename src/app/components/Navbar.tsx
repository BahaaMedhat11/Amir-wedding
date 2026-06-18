import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLang } from "./LanguageContext";

const NAV_ITEMS = [
  { key: "navDetails", href: "#details" },
  { key: "navGift", href: "#gift" },
  { key: "navWishes", href: "#wishes" },
];

export function Navbar() {
  const { t, lang, setLang, isRTL } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3 shadow-lg" : "py-5"}`}
        style={{
          background: scrolled ? "rgba(250,247,242,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(184,151,90,0.15)" : "none",
        }}
      >
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.6rem", lineHeight: 1 }}
            className={`transition-colors duration-300 ${scrolled ? "text-primary" : "text-amber-200"}`}
          >
            {t("coupleNames")}
          </button>

          <div className={`hidden md:flex items-center gap-8 ${isRTL ? "flex-row-reverse" : ""}`}>
            {NAV_ITEMS.map(({ key, href }) => (
              <button
                key={key}
                onClick={() => scrollTo(href)}
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
                className={`text-xs uppercase transition-colors duration-300 hover:text-primary ${scrolled ? "text-foreground/70" : "text-white/70"}`}
              >
                {t(key)}
              </button>
            ))}
          </div>

          <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}
              className={`text-xs uppercase px-3 py-1.5 border rounded-sm transition-all duration-300 ${
                scrolled
                  ? "border-primary/30 text-primary hover:bg-primary/10"
                  : "border-amber-300/40 text-amber-200 hover:bg-amber-300/10"
              }`}
            >
              {t("langToggle")}
            </button>

            <button
              onClick={() => setMobileOpen(o => !o)}
              className={`md:hidden p-1 transition-colors duration-300 ${scrolled ? "text-foreground" : "text-white"}`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border shadow-xl"
          >
            <div className={`py-6 px-8 flex flex-col gap-5 ${isRTL ? "items-end" : "items-start"}`}>
              {NAV_ITEMS.map(({ key, href }) => (
                <button
                  key={key}
                  onClick={() => scrollTo(href)}
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.15em" }}
                  className="text-xs uppercase text-foreground/70 hover:text-primary transition-colors"
                >
                  {t(key)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
