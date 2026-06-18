import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Calendar, Clock, MapPin, Navigation } from "lucide-react";
import { useLang } from "./LanguageContext";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/Ee5oJvtso1JFMiDb9";

export function WeddingDetails() {
  const { t, isRTL } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const cards = [
    {
      key: "detailsDate",
      valueKey: "detailsDateValue",
      Icon: Calendar,
      delay: 0,
    },
    {
      key: "detailsTime",
      valueKey: "detailsTimeValue",
      Icon: Clock,
      delay: 0.12,
    },
    {
      key: "detailsVenue",
      valueKey: "detailsVenueValue",
      subKey: "detailsVenueAddress",
      Icon: MapPin,
      delay: 0.24,
    },
  ];

  return (
    <section
      ref={ref}
      id="details"
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #F5ECE0 0%, #FAF7F2 50%, #EDE6DB 100%)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, rgba(184,151,90,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(232,196,190,0.15) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
            {t("detailsSubtitle")}
          </p>
          <h2
            style={{
              fontFamily: isRTL
                ? "'Amiri', serif"
                : "'Cormorant Garamond', serif",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
            className="text-5xl md:text-6xl text-foreground"
          >
            {t("detailsTitle")}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </motion.div>

        {/* Venue image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-10 relative overflow-hidden rounded-sm shadow-xl"
          style={{ height: "240px" }}
        >
          <img
            src="https://images.unsplash.com/photo-1705058718118-80cadb3e9f4c?w=1200&h=500&fit=crop&auto=format"
            alt="Wedding rings on flowers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <p
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "2.5rem",
                }}
                className="text-amber-200 mb-1"
              >
                {t("detailsVenueValue")}
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.15em",
                }}
                className="text-xs uppercase text-white/70"
              >
                {t("detailsVenueAddress")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Three detail cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {cards.map(({ key, valueKey, subKey, Icon, delay }) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: delay + 0.2 }}
              whileHover={{
                y: -4,
                boxShadow: "0 20px 40px rgba(184,151,90,0.15)",
              }}
              className="bg-card border border-border rounded-sm p-6 text-center transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon size={20} className="text-primary" />
                </div>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.12em",
                }}
                className="text-xs uppercase text-muted-foreground mb-2"
              >
                {t(key)}
              </p>
              <p
                style={{
                  fontFamily: isRTL
                    ? "'Amiri', serif"
                    : "'Cormorant Garamond', serif",
                  fontWeight: 500,
                }}
                className="text-xl text-foreground"
              >
                {t(valueKey)}
              </p>
              {subKey && (
                <p
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  className="text-xs text-muted-foreground mt-1"
                >
                  {t(subKey)}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Get Directions button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex justify-center"
        >
          <motion.a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.18em",
            }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground text-sm uppercase rounded-sm hover:bg-primary/90 transition-colors duration-300 shadow-lg shadow-primary/20"
          >
            <Navigation size={16} />
            {t("detailsDirection")}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
