import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    groomName: "Amir",
    brideName: "R",
    coupleNames: "Amir & R",
    weddingDate: "29 June 2026",
    heroSubtitle: "Together Forever",
    heroTagline: "We're getting married",
    leaveWish: "Leave a Wish",
    scrollDown: "Scroll to explore",
    detailsTitle: "Wedding Details",
    detailsSubtitle: "Mark your calendar",
    detailsDate: "Date",
    detailsDateValue: "29 June 2026",
    detailsTime: "Time",
    detailsTimeValue: "6:00 PM",
    detailsVenue: "Venue",
    detailsVenueValue: "Alexandria — Al-Amriya",
    detailsVenueAddress: "Al-Nahda — Al-Fanager",
    detailsDirection: "Get Directions",
    countdownTitle: "Counting the Days",
    countdownSubtitle: "Until we say I do",
    countdownDays: "Days",
    countdownHours: "Hours",
    countdownMinutes: "Minutes",
    countdownSeconds: "Seconds",
    countdownExpired: "Today is the day! 🎉",
    giftTitle: "Wedding Gift",
    giftSubtitle: "Send your blessings",
    giftDescription:
      "If you wish to send a gift, you can transfer to the number below via Vodafone Cash or InstaPay.",
    giftPhone: "01095469416",
    giftCopy: "Copy Number",
    giftCopied: "Copied! ✓",
    giftVodafone: "Vodafone Cash",
    giftInstapay: "InstaPay",
    wishesTitle: "Leave a Wish",
    wishesSubtitle: "Share your love and blessings",
    wishesName: "Your Name",
    wishesMessage: "Your message...",
    wishesSend: "Send Wish",
    wishesPlaceholder: "Write a heartfelt message for the couple...",
    wishesEmpty: "Be the first to leave a wish for the couple.",
    footerMessage: "Two souls, one beautiful forever.",
    footerShare: "Share the joy",
    navDetails: "Details",
    navGift: "Gift",
    navWishes: "Wishes",
    langToggle: "عربي",
  },

  ar: {
    groomName: "أمير",
    brideName: "قرة عيني",

    coupleNames: "أمير ♥ قرة عيني",

    weddingDate: "٢٩ يونيو ٢٠٢٦",

    heroSubtitle: "بداية حكايتنا سوا",
    heroTagline: "مستنين نفرح بيكم في يومنا الكبير",

    leaveWish: "سيب كلمة حلوة",

    scrollDown: "شوف باقي التفاصيل",

    detailsTitle: "ميعاد فرحنا",
    detailsSubtitle: "استنونا في اليوم المميز",

    detailsDate: "اليوم",
    detailsDateValue: "٢٩ يونيو ٢٠٢٦",

    detailsTime: "الساعة",
    detailsTimeValue: "٦:٠٠ مساءً",

    detailsVenue: "مكان الفرح",
    detailsVenueValue: "الإسكندرية - العامرية",

    detailsVenueAddress: "النهضة - الفناجر",

    detailsDirection: "افتح اللوكيشن",

    countdownTitle: "باقي على الفرح",
    countdownSubtitle: "والفرحة تقرب يوم بعد يوم",

    countdownDays: "يوم",
    countdownHours: "ساعة",
    countdownMinutes: "دقيقة",
    countdownSeconds: "ثانية",

    countdownExpired: "النهارده فرحنا 🎉❤️",

    giftTitle: "شاركونا الفرحة 🎁",

    giftSubtitle: "مباركتكم تفرحنا",

    giftDescription:
      "وجودكم معانا هو أحلى هدية، ولو حابين تشاركونا بهدية تقدروا تحولوا على الرقم ده عن طريق فودافون كاش أو إنستاباي.",

    giftPhone: "01095469416",

    giftCopy: "انسخ الرقم",

    giftCopied: "اتنسخ ✔",

    giftVodafone: "فودافون كاش",

    giftInstapay: "إنستاباي",

    wishesTitle: "سيب كلمة حلوة",

    wishesSubtitle: "شاركنا دعوة أو تهنئة من قلبك",

    wishesName: "اسمك",

    wishesMessage: "اكتب رسالتك",

    wishesSend: "ابعت",

    wishesPlaceholder: "اكتب كلمة حلوة أو دعوة جميلة للعروسين...",

    wishesEmpty: "مفيش تهاني لسه... كن أول واحد يسيب كلمة حلوة ❤️",

    footerMessage: "فرحتنا أحلى بوجودكم معانا ❤️",

    footerShare: "شارك الدعوة",

    navDetails: "الميعاد",

    navGift: "الهدية",

    navWishes: "التهاني",

    langToggle: "English",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("wedding-lang");
    if (saved === "ar" || saved === "en") return saved;
    const browser = navigator.language.toLowerCase();
    return browser.startsWith("ar") ? "ar" : "en";
  });

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("wedding-lang", l);
  };

  const t = (key: string) => translations[lang][key] ?? key;
  const isRTL = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
