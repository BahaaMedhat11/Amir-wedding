import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Copy, Check, Gift, Smartphone } from "lucide-react";
import { useLang } from "./LanguageContext";

export function GiftSection() {
  const { t, isRTL } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const phone = t("giftPhone");

  const handleCopy = () => {
    navigator.clipboard.writeText(phone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section
      ref={ref}
      id="gift"
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #2C2416 0%, #1a1208 50%, #2C2416 100%)",
      }}
    >
      {/* Subtle decorative bg */}
      <div className="absolute inset-0 opacity-8">
        <img
          src="https://images.unsplash.com/photo-1565034582189-195bb0084dcf?w=1200&h=600&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, rgba(184,151,90,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center">
              <Gift size={28} className="text-amber-300" />
            </div>
          </div>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.25em",
            }}
            className="text-xs uppercase text-amber-400/60 mb-4"
          >
            {t("giftSubtitle")}
          </p>
          <h2
            style={{
              fontFamily: isRTL
                ? "'Amiri', serif"
                : "'Cormorant Garamond', serif",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
            className="text-4xl md:text-5xl text-amber-100 mb-6"
          >
            {t("giftTitle")}
          </h2>

          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600/30" />
          </div>

          <p
            style={{
              fontFamily: isRTL ? "'Amiri', serif" : "'DM Sans', sans-serif",
              lineHeight: 1.8,
              fontSize: isRTL ? "1.1rem" : "0.95rem",
            }}
            className="text-amber-200/60 max-w-md mx-auto"
          >
            {t("giftDescription")}
          </p>
        </motion.div>

        {/* Phone number card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            background: "rgba(255,253,249,0.06)",
            border: "1px solid rgba(184,151,90,0.25)",
            backdropFilter: "blur(16px)",
          }}
          className="rounded-sm p-8 mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Smartphone size={18} className="text-amber-400/70" />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.1em",
              }}
              className="text-xs uppercase text-amber-400/60"
            >
              {isRTL ? "رقم الهدية" : "Gift Number"}{" "}
            </span>
          </div>

          {/* Phone display */}
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
              fontWeight: 400,
              letterSpacing: "0.12em",
              direction: "ltr",
            }}
            className="text-amber-100 mb-6 text-center"
          >
            {phone}
          </div>

          {/* Copy button */}
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.15em",
            }}
            className={`w-full py-3.5 flex items-center justify-center gap-3 text-sm uppercase rounded-sm transition-all duration-300 ${
              copied
                ? "bg-green-600/20 border border-green-500/40 text-green-300"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {copied ? (
              <>
                <Check size={15} /> {t("giftCopied")}
              </>
            ) : (
              <>
                <Copy size={15} /> {t("giftCopy")}
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Payment method badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            {
              label: t("giftVodafone"),
              color: "rgba(229,0,0,0.15)",
              border: "rgba(229,0,0,0.3)",
              text: "#ff6b6b",
            },
            {
              label: t("giftInstapay"),
              color: "rgba(184,151,90,0.15)",
              border: "rgba(184,151,90,0.3)",
              text: "#D4B882",
            },
          ].map(({ label, color, border, text }) => (
            <div
              key={label}
              style={{
                background: color,
                border: `1px solid ${border}`,
                color: text,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.08em",
              }}
              className="px-5 py-2 rounded-sm text-xs uppercase"
            >
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
