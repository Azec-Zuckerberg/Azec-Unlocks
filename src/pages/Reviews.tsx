import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundNeo from "@/components/BackgroundNeo";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

type Review = { name: string; date: string; review: string; vouchNo: number };

function sanitizeReviewText(input: string): string {
  return input
    // remove common boilerplate lines
    .replace(/\bView proof\b/gi, "")
    // remove Discord mentions and channel/role references
    .replace(/<@!?\d+>/g, "")
    .replace(/<@&\d+>/g, "")
    .replace(/<#\d+>/g, "")
    // remove URLs
    .replace(/https?:\/\/\S+/g, "")
    // remove explicit game references (R6/R6S/Rainbow Six Siege)
    .replace(/\brainbow\s+six\s*siege\b/gi, "game")
    .replace(/\br6s\b/gi, "game")
    .replace(/\br6\b/gi, "game")
    // collapse multiple spaces/newlines
    .replace(/\s+/g, " ")
    .trim();
}

function formatHumanDate(dateTime: string): string {
  const base = dateTime.includes(" ") ? dateTime.split(" ")[0] : (dateTime.includes("T") ? dateTime.split("T")[0] : dateTime);
  const [y, m, d] = base.split("-").map((n) => parseInt(n, 10));
  const dt = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(dt);
  // Lowercase the month
  return formatted.replace(/[A-Za-z]+/g, (s) => s.toLowerCase());
}

function parseReviews(raw: string): Review[] {
  const text = raw.replace(/\r\n?/g, "\n");
  const entries: Review[] = [];
  // Pattern: @username (id) \n <review text> \n Vouch Nº123 \n YYYY-MM-DD hh:mm:ss
  const userBlockRegex = /(\n|^)\s*@([^\n]+?)\s*\([^\n]*\)\s*\n([\s\S]*?)\n\s*Vouch Nº\s*(\d+)\s*\n\s*([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2})/g;
  let m: RegExpExecArray | null;
  while ((m = userBlockRegex.exec(text)) !== null) {
    const nameRaw = m[2].trim();
    const name = nameRaw.startsWith("@") ? nameRaw : `@${nameRaw}`;
    const reviewRaw = m[3];
    const review = sanitizeReviewText(reviewRaw);
    const vouchNo = parseInt(m[4], 10);
    const date = m[5];
    if (review.length > 0) {
      entries.push({ name, review, vouchNo, date });
    }
  }
  // Remove all vouches from @sixifyy
  const filtered = entries.filter(e => e.name.toLowerCase() !== "@sixifyy");
  // Sort by date desc, then vouchNo desc
  filtered.sort((a, b) => {
    const dt = new Date(b.date).getTime() - new Date(a.date).getTime();
    return dt !== 0 ? dt : b.vouchNo - a.vouchNo;
  });
  const count = filtered.length;
  // Renumber sequentially from 1..N
  const renumbered = filtered.map((e, idx) => ({ ...e, vouchNo: count - idx }));
  return renumbered;
}

const Reviews = () => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/reviews.txt")
      .then((r) => r.text())
      .then((raw) => {
        if (cancelled) return;
        const parsed = parseReviews(raw);
        setReviews(parsed);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      <BackgroundNeo />
      <Header />
      <main className="container mx-auto px-6 py-16 pt-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white mb-2 text-center">{t('reviews_title')}</h1>
          <p className="text-white/70 text-center mb-8">{t('reviews_subtitle')}</p>

        {!loaded && (
          <div className="text-center text-white/60">Loading reviews…</div>
        )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {reviews.map((r, i) => (
              <div key={i} className="glass-base rounded-2xl p-5 flex flex-col justify-between min-h-[180px] border border-white/10 shadow-md">
                <div className="mb-4 text-white/90 text-base font-medium">"{r.review}"</div>
                <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-semibold">{r.name}</span>
                    <span className="text-white/60 text-xs">Vouch Nº{r.vouchNo}</span>
                  </div>
                  <div className="flex items-center justify-end text-xs text-white/50">
                    <span>{formatHumanDate(r.date)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews; 