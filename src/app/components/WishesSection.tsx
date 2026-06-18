import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Send, Heart } from "lucide-react";
import { useLang } from "./LanguageContext";
import { getWishes, addWish } from "../../api/wishes";

const isRTLText = (text: string) => {
  return /[\u0600-\u06FF]/.test(text);
};

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

function formatTime(ts: number, isRTL: boolean) {
  if (!ts || isNaN(ts)) return "";
  const date = new Date(ts);
  return date.toLocaleString(isRTL ? "ar-EG" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function WishesSection() {
  const { t, isRTL } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  // const [wishes, setWishes] = useState<Wish[]>(() => {
  //   try {
  //     const saved = localStorage.getItem("wedding-wishes");
  //     return saved ? JSON.parse(saved) : [];
  //   } catch {
  //     return [];
  //   }
  // });
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getWishes();
        setWishes(data.sort((a, b) => b.timestamp - a.timestamp));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!name.trim() || !message.trim()) {
  //     setError("Please fill in all fields.");
  //     return;
  //   }
  //   if (message.trim().length < 5) {
  //     setError("Message too short.");
  //     return;
  //   }
  //   setSending(true);
  //   setError("");
  //   setTimeout(() => {
  //     const newWish: Wish = {
  //       id: crypto.randomUUID(),
  //       name: name.trim(),
  //       message: message.trim(),
  //       timestamp: Date.now(),
  //     };
  //     const updated = [newWish, ...wishes];
  //     setWishes(updated);
  //     localStorage.setItem("wedding-wishes", JSON.stringify(updated));
  //     setName("");
  //     setMessage("");
  //     setSending(false);
  //     setSent(true);
  //     setTimeout(() => setSent(false), 3000);
  //   }, 800);
  // };
  useEffect(() => {
    console.log("WISHES STATE:", wishes);
  }, [wishes]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      setError("Please fill all fields");
      return;
    }

    if (message.trim().length < 5) {
      setError("Message too short");
      return;
    }

    setSending(true);
    setError("");

    try {
      await addWish({
        name: name.trim(),
        message: message.trim(),
      });

      const data = await getWishes();
      setWishes(data.sort((a, b) => b.timestamp - a.timestamp));
      setName("");
      setMessage("");
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setError("Failed to send wish");
    } finally {
      setSending(false);
    }
  };
  return (
    <section
      ref={ref}
      id="wishes"
      className="relative py-28 px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, rgba(232,196,190,0.5) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          // animate={inView ? { opacity: 1, y: 0 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.25em",
            }}
            className="text-xs uppercase text-primary mb-4"
          >
            {t("wishesSubtitle")}
          </p>
          <h2
            style={{
              fontFamily: isRTL
                ? "'Amiri', serif"
                : "'Cormorant Garamond', serif",
              fontWeight: 400,
            }}
            className="text-5xl md:text-6xl text-foreground"
          >
            {t("wishesTitle")}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
            <span
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "1.5rem",
              }}
              className="text-primary"
            >
              ✉
            </span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-sm p-8 shadow-sm"
            >
              <div className="mb-6">
                <label
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.1em",
                  }}
                  className="block text-xs uppercase text-muted-foreground mb-2"
                >
                  {t("wishesName")}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  dir={isRTL ? "rtl" : "ltr"}
                  style={{
                    fontFamily: isRTL
                      ? "'Amiri', serif"
                      : "'DM Sans', sans-serif",
                    background: "#F5ECE0",
                    color: "#2C2416",
                  }}
                  className="w-full px-4 py-3 border border-border rounded-sm placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder={t("wishesName")}
                  type="text"
                />
              </div>
              <div className="mb-6">
                <label
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.1em",
                  }}
                  className="block text-xs uppercase text-muted-foreground mb-2"
                >
                  {t("wishesMessage")}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={400}
                  rows={5}
                  dir={isRTL ? "rtl" : "ltr"}
                  style={{
                    fontFamily: isRTL
                      ? "'Amiri', serif"
                      : "'DM Sans', sans-serif",
                    background: "#F5ECE0",
                    color: "#2C2416",
                    resize: "none",
                  }}
                  className="w-full px-4 py-3 border border-border rounded-sm placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder={t("wishesPlaceholder")}
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {message.length}/400
                </p>
              </div>
              {error && (
                <p
                  className="text-destructive text-sm mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {error}
                </p>
              )}
              <motion.button
                type="submit"
                disabled={sending || sent}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.15em",
                }}
                className={`w-full py-3.5 flex items-center justify-center gap-3 text-sm uppercase transition-all duration-300 rounded-sm ${
                  sent
                    ? "bg-green-600/20 border border-green-600/40 text-green-700"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {sent ? (
                  <>
                    <Heart size={16} fill="currentColor" /> Wish Sent! 💕
                  </>
                ) : sending ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    <Send size={15} /> {t("wishesSend")}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Wishes list */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4 max-h-[520px] overflow-y-auto pr-1"
            style={{ scrollbarWidth: "none" }}
          >
            <AnimatePresence initial={false}>
              {wishes.length === 0 ? (
                <p
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  className="text-muted-foreground text-center py-12"
                >
                  {t("wishesEmpty")}
                </p>
              ) : (
                wishes.map((wish, i) => (
                  // <motion.div
                  //   key={wish.id}
                  //   initial={{ opacity: 0, y: -20 }}
                  //   animate={{ opacity: 1, y: 0 }}
                  //   transition={{ duration: 0.4, delay: i * 0.05 }}
                  //   className="bg-card border border-border rounded-sm p-5 relative overflow-hidden group hover:border-primary/30 transition-colors duration-300"
                  // >
                  //   <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/40 to-accent/40" />
                  //   <div
                  //     className={`flex items-start justify-between gap-3 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}
                  //   >
                  //     <span
                  //       style={{
                  //         fontFamily: isRTL
                  //           ? "'Amiri', serif"
                  //           : "'Cormorant Garamond', serif",
                  //         fontWeight: 500,
                  //       }}
                  //       className="text-foreground text-lg"
                  //     >
                  //       {wish.name}
                  //     </span>
                  //     <span
                  //       style={{ fontFamily: "'DM Sans', sans-serif" }}
                  //       className="text-xs text-muted-foreground mt-1 flex-shrink-0"
                  //     >
                  //       {formatTime(wish.timestamp)}
                  //     </span>
                  //   </div>
                  //   <p
                  //     style={{
                  //       fontFamily: isRTL
                  //         ? "'Amiri', serif"
                  //         : "'DM Sans', sans-serif",
                  //       lineHeight: 1.7,
                  //       direction: wish.message.match(/[؀-ۿ]/) ? "rtl" : "ltr",
                  //     }}
                  //     className="text-foreground/75 text-sm"
                  //   >
                  //     {wish.message}
                  //   </p>
                  //   <Heart
                  //     size={12}
                  //     className="absolute bottom-3 right-3 text-accent/40 group-hover:text-accent transition-colors duration-300"
                  //     fill="currentColor"
                  //   />
                  // </motion.div>
                  // <motion.div
                  //   key={wish.id}
                  //   initial={{ opacity: 0, y: -20 }}
                  //   animate={{ opacity: 1, y: 0 }}
                  //   transition={{ duration: 0.4, delay: i * 0.05 }}
                  //   className="bg-card border border-border rounded-sm p-5 relative overflow-hidden group hover:border-primary/30 transition-colors duration-300"
                  // >
                  //   <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/40 to-accent/40" />

                  //   <div className="flex items-center justify-between mb-2">
                  //     <span
                  //       style={{
                  //         fontFamily: "'Cormorant Garamond', serif",
                  //         fontWeight: 500,
                  //       }}
                  //       className="text-foreground text-lg"
                  //     >
                  //       {wish.name}
                  //     </span>
                  //     <span
                  //       style={{ fontFamily: "'DM Sans', sans-serif" }}
                  //       className="text-xs text-muted-foreground flex-shrink-0"
                  //     >
                  //       {formatTime(wish.timestamp, isRTL)}
                  //     </span>
                  //   </div>

                  //   <p
                  //     style={{
                  //       fontFamily: "'DM Sans', sans-serif",
                  //       lineHeight: 1.7,
                  //       direction: wish.message.match(/[\u0600-\u06FF]/)
                  //         ? "rtl"
                  //         : "ltr",
                  //     }}
                  //     className="text-foreground/75 text-sm"
                  //   >
                  //     {wish.message}
                  //   </p>

                  //   <Heart
                  //     size={12}
                  //     className="absolute bottom-3 right-3 text-accent/40 group-hover:text-accent transition-colors duration-300"
                  //     fill="currentColor"
                  //   />
                  // </motion.div>
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="bg-card border border-border rounded-sm p-5 relative overflow-hidden group hover:border-primary/30 transition-colors duration-300"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/40 to-accent/40" />

                    {/* HEADER: NAME + TIME */}
                    <div
                      className="flex items-start justify-between mb-2"
                      dir={isRTLText(wish.name) ? "rtl" : "ltr"}
                    >
                      <span
                        style={{
                          fontFamily: isRTLText(wish.name)
                            ? "'Amiri', serif"
                            : "'Cormorant Garamond', serif",
                          fontWeight: 500,
                        }}
                        className="text-foreground text-lg"
                      >
                        {wish.name}
                      </span>

                      <span
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                        className="text-xs text-muted-foreground flex-shrink-0 mt-1"
                      >
                        {formatTime(wish.timestamp)}
                      </span>
                    </div>

                    {/* MESSAGE */}
                    <p
                      dir={isRTLText(wish.message) ? "rtl" : "ltr"}
                      style={{
                        fontFamily: isRTLText(wish.message)
                          ? "'Amiri', serif"
                          : "'DM Sans', sans-serif",
                        lineHeight: 1.7,
                        whiteSpace: "pre-wrap",
                      }}
                      className="text-foreground/75 text-sm"
                    >
                      {wish.message}
                    </p>

                    <Heart
                      size={12}
                      className="absolute bottom-3 right-3 text-accent/40 group-hover:text-accent transition-colors duration-300"
                      fill="currentColor"
                    />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
