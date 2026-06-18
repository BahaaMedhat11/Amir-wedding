import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useLang } from "./LanguageContext";

export function RSVPSection() {
  const { t, isRTL } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", attend: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.attend) e.attend = "Please select attendance";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setTimeout(() => setSubmitted(true), 600);
  };

  return (
    <section
      ref={ref}
      id="rsvp"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #2C2416 0%, #1a1208 50%, #2C2416 100%)" }}
    >
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1665607437981-973dcd6a22bb?w=1400&h=800&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at center, rgba(184,151,90,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-2xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.25em" }} className="text-xs uppercase text-amber-400/60 mb-4">
            {t("rsvpSubtitle")}
          </p>
          <h2
            style={{ fontFamily: isRTL ? "'Amiri', serif" : "'Cormorant Garamond', serif", fontWeight: 400 }}
            className="text-5xl md:text-6xl text-amber-100"
          >
            {t("rsvpTitle")}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600/40" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            background: "rgba(255,253,249,0.05)",
            border: "1px solid rgba(184,151,90,0.2)",
            backdropFilter: "blur(16px)",
          }}
          className="rounded-sm p-8 md:p-12"
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <CheckCircle2 size={56} className="text-amber-400 mx-auto mb-6" />
              <p
                style={{ fontFamily: isRTL ? "'Amiri', serif" : "'Cormorant Garamond', serif" }}
                className="text-2xl text-amber-100 mb-3"
              >
                {t("rsvpSuccess")}
              </p>
              <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2rem" }} className="text-amber-400">
                {t("coupleNames")}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }} className="block text-xs uppercase text-amber-200/50 mb-2">
                  {t("rsvpName")}
                </label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={{ fontFamily: isRTL ? "'Amiri', serif" : "'DM Sans', sans-serif", direction: isRTL ? "rtl" : "ltr" }}
                  className="w-full px-4 py-3 bg-white/5 border border-amber-600/20 rounded-sm text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                  placeholder={t("rsvpName")}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }} className="block text-xs uppercase text-amber-200/50 mb-3">
                  {t("rsvpAttend")}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "yes", label: t("rsvpYes") },
                    { value: "no", label: t("rsvpNo") },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, attend: opt.value }))}
                      style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}
                      className={`py-3 px-4 text-sm border rounded-sm transition-all duration-300 ${
                        form.attend === opt.value
                          ? "bg-primary/20 border-primary text-amber-200"
                          : "border-amber-600/20 text-amber-200/50 hover:border-amber-600/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors.attend && <p className="text-red-400 text-xs mt-1">{errors.attend}</p>}
              </div>

              <div>
                <label style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }} className="block text-xs uppercase text-amber-200/50 mb-2">
                  {t("rsvpMessage")}
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={4}
                  style={{ fontFamily: isRTL ? "'Amiri', serif" : "'DM Sans', sans-serif", direction: isRTL ? "rtl" : "ltr", resize: "none" }}
                  className="w-full px-4 py-3 bg-white/5 border border-amber-600/20 rounded-sm text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                  placeholder={t("rsvpMessage")}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.2em" }}
                className="w-full py-4 bg-primary text-primary-foreground text-sm uppercase hover:bg-primary/90 transition-colors duration-300 rounded-sm"
              >
                {t("rsvpSend")}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
