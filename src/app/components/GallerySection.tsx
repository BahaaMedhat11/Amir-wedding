import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { X, ZoomIn } from "lucide-react";
import Masonry from "react-responsive-masonry";
import ResponsiveMasonry from "react-responsive-masonry";
import { useLang } from "./LanguageContext";

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1550784718-990c6de52adf?w=600&h=800&fit=crop&auto=format", alt: "Couple in wedding attire" },
  { src: "https://images.unsplash.com/photo-1646325311277-0c35409fdd57?w=600&h=400&fit=crop&auto=format", alt: "Kiss by the lake" },
  { src: "https://images.unsplash.com/photo-1606216794079-73f85bbd57d5?w=600&h=900&fit=crop&auto=format", alt: "Bride in wedding dress" },
  { src: "https://images.unsplash.com/photo-1780901049024-8e504f6024a8?w=600&h=400&fit=crop&auto=format", alt: "Wedding ceremony" },
  { src: "https://images.unsplash.com/photo-1591604442449-ecc9943efabf?w=600&h=750&fit=crop&auto=format", alt: "Bride with bouquet" },
  { src: "https://images.unsplash.com/photo-1621621668101-d5c8329b3784?w=600&h=400&fit=crop&auto=format", alt: "Couple kissing" },
  { src: "https://images.unsplash.com/photo-1522058171200-e61f77c7353d?w=600&h=500&fit=crop&auto=format", alt: "Wedding flowers" },
  { src: "https://images.unsplash.com/photo-1769812343890-4e406a33cfbe?w=600&h=800&fit=crop&auto=format", alt: "Wedding arch" },
  { src: "https://images.unsplash.com/photo-1655901856612-a7f76949fb80?w=600&h=400&fit=crop&auto=format", alt: "Couple together" },
];

export function GallerySection() {
  const { t, isRTL } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FAF7F2 0%, #F5ECE0 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.25em" }} className="text-xs uppercase text-primary mb-4">
            {t("gallerySubtitle")}
          </p>
          <h2
            style={{ fontFamily: isRTL ? "'Amiri', serif" : "'Cormorant Garamond', serif", fontWeight: 400 }}
            className="text-5xl md:text-6xl text-foreground"
          >
            {t("galleryTitle")}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3 }}>
            <Masonry gutter="12px">
              {GALLERY_IMAGES.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="relative overflow-hidden rounded-sm cursor-pointer group"
                  onClick={() => setLightbox(img.src.replace("w=600", "w=1200"))}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                    <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setLightbox(null)}
              whileHover={{ scale: 1.1 }}
            >
              <X size={32} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightbox}
              alt="Gallery"
              className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
