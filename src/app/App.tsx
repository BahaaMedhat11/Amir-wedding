import { useRef, useEffect } from "react";
import { LanguageProvider } from "./components/LanguageContext";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { WeddingDetails } from "./components/WeddingDetails";
import { CountdownSection } from "./components/CountdownSection";
import { GiftSection } from "./components/GiftSection";
import { WishesSection } from "./components/WishesSection";
import { FooterSection } from "./components/FooterSection";

function useOGMeta() {
  useEffect(() => {
    const metas: [string, string, string][] = [
      ["property", "og:title", "Amir & Rowida Wedding Invitation 💍"],
      [
        "property",
        "og:description",
        "You are invited to celebrate the wedding of Amir & Rowida on 29 June 2026. Join us for this beautiful occasion!",
      ],
      [
        "property",
        "og:image",
        "https://images.unsplash.com/photo-1622838202134-69571da3a0ee?w=1200&h=630&fit=crop&auto=format",
      ],
      ["property", "og:image:width", "1200"],
      ["property", "og:image:height", "630"],
      ["property", "og:type", "website"],
      ["property", "og:url", window.location.href],
      ["name", "twitter:card", "summary_large_image"],
      ["name", "twitter:title", "Amir & Rowida Wedding Invitation 💍"],
      [
        "name",
        "twitter:description",
        "You are invited to celebrate the wedding of Amir & Rowida on 29 June 2026",
      ],
      [
        "name",
        "twitter:image",
        "https://images.unsplash.com/photo-1622838202134-69571da3a0ee?w=1200&h=630&fit=crop&auto=format",
      ],
    ];
    document.title = "Amir & Rowida | Wedding Invitation — 29 June 2026";
    for (const [attr, attrVal, content] of metas) {
      let el = document.querySelector(`meta[${attr}="${attrVal}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    }
  }, []);
}

function WeddingApp() {
  useOGMeta();
  const wishesRef = useRef<HTMLDivElement>(null);

  const scrollToWishes = () => {
    wishesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    /* MARKER-MAKE-KIT-INVOKED */
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Navbar />

      <HeroSection onWishClick={scrollToWishes} />
      <WeddingDetails />
      <CountdownSection />
      <GiftSection />

      <div ref={wishesRef}>
        <WishesSection />
      </div>

      <FooterSection />

      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 0; }
        * { scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <WeddingApp />
    </LanguageProvider>
  );
}
