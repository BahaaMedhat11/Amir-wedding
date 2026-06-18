import { motion } from "motion/react";
import { Share2, Facebook, MessageCircle, Send } from "lucide-react";
import { useLang } from "./LanguageContext";

export function FooterSection() {
  const { t, isRTL } = useLang();

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText =
    "You are invited to celebrate the wedding of Amir & Amira on 29 July 2026 🎊";

  const shareLinks = [
    {
      label: "WhatsApp",
      Icon: MessageCircle,
      href: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      color: "hover:text-green-400",
    },
    {
      label: "Facebook",
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: "hover:text-blue-400",
    },
    {
      label: "Telegram",
      Icon: Send,
      href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: "hover:text-sky-400",
    },
  ];

  return (
    <footer
      className="relative py-20 px-6 overflow-hidden"
      style={{
        background: "#1a1208",
        borderTop: "1px solid rgba(184,151,90,0.15)",
      }}
    >
      <div className="absolute inset-0 opacity-8">
        <img
          src="https://images.unsplash.com/photo-1570112008549-e4181988109f?w=1200&h=400&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "clamp(3rem, 8vw, 5rem)",
              lineHeight: 1.2,
            }}
            className="text-amber-300 block mb-4"
          >
            {t("coupleNames")}
          </span>

          <p
            style={{
              fontFamily: isRTL
                ? "'Amiri', serif"
                : "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
            }}
            className="text-amber-100/50 text-xl mb-2"
          >
            {t("footerMessage")}
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.15em",
            }}
            className="text-amber-400/40 text-xs uppercase mb-12"
          >
            {t("weddingDate")}
          </p>

          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-600/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-600/40" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-600/20" />
          </div>

          {/* Social share */}
          <div className="mb-10">
            <div
              className={`flex items-center justify-center gap-2 mb-5 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <Share2 size={14} className="text-amber-400/50" />
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.2em",
                }}
                className="text-xs uppercase text-amber-400/50"
              >
                {t("footerShare")}
              </p>
            </div>
            <div className="flex items-center justify-center gap-6">
              {shareLinks.map(({ label, Icon, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center gap-2 text-amber-200/30 ${color} transition-colors duration-300`}
                >
                  <Icon size={22} />
                  <span
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                    className="text-xs"
                  >
                    {label}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          <p
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            className="text-amber-200/20 text-xs"
          >
            © 2026 Amir & R Wedding. Made with ♥
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
