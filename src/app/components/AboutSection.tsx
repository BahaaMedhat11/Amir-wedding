import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLang } from "./LanguageContext";

export function AboutSection() {
  const { t, isRTL } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(232,196,190,0.4) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p
            style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.25em" }}
            className="text-xs uppercase text-primary mb-4"
          >
            {t("aboutSubtitle")}
          </p>
          <h2
            style={{
              fontFamily: isRTL ? "'Amiri', serif" : "'Cormorant Garamond', serif",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
            className="text-5xl md:text-6xl text-foreground"
          >
            {t("aboutTitle")}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
            <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.5rem" }} className="text-primary">
              ♥
            </span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </motion.div>

        <div className={`grid md:grid-cols-2 gap-16 items-center ${isRTL ? "md:grid-flow-dense" : ""}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 60 : -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className={`relative ${isRTL ? "md:col-start-2" : ""}`}
          >
            <div className="relative aspect-[3/4] max-w-sm mx-auto">
              <div className="absolute -inset-4 border border-primary/20 rounded-sm" />
              <div className="absolute -inset-2 border border-primary/10 rounded-sm" />
              <img
                src="https://images.unsplash.com/photo-1646325311277-0c35409fdd57?w=700&h=950&fit=crop&auto=format"
                alt="Amir and Amira"
                className="w-full h-full object-cover rounded-sm shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-sm" />
            </div>
            {/* Floating accent */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-blush/20 blur-2xl"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -60 : 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className={isRTL ? "md:col-start-1" : ""}
          >
            <p
              style={{
                fontFamily: isRTL ? "'Amiri', serif" : "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1.9,
                fontSize: isRTL ? "1.3rem" : "1.2rem",
              }}
              className="text-foreground/80 mb-12"
            >
              {t("aboutText")}
            </p>

            <div className="space-y-8">
              {[
                { name: t("groomName"), desc: t("aboutGroomDesc"), img: "https://images.unsplash.com/photo-1607357910286-1ff94ac13c24?w=200&h=200&fit=crop&auto=format" },
                { name: t("brideName"), desc: t("aboutBrideDesc"), img: "https://images.unsplash.com/photo-1591604442449-ecc9943efabf?w=200&h=200&fit=crop&auto=format" },
              ].map(({ name, desc, img }) => (
                <div key={name} className={`flex items-center gap-5 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="relative flex-shrink-0">
                    <img src={img} alt={name} className="w-16 h-16 rounded-full object-cover border-2 border-primary/30" />
                    <div className="absolute inset-0 rounded-full ring-2 ring-primary/10 ring-offset-2 ring-offset-background" />
                  </div>
                  <div className={isRTL ? "text-right" : ""}>
                    <p
                      style={{ fontFamily: isRTL ? "'Amiri', serif" : "'Cormorant Garamond', serif", fontWeight: 500 }}
                      className="text-xl text-foreground"
                    >
                      {name}
                    </p>
                    <p
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                      className="text-sm text-muted-foreground mt-0.5"
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
