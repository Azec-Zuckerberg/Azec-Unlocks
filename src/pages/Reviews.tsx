import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundNeo from "@/components/BackgroundNeo";
import { useTranslation } from "react-i18next";

const reviews = [
  { name: "Ethan", country: "France", date: "September 3, 2024", rating: 4.94, review: "aura formed the whole lobby 32 kills lets go azec on top fr fr" },
  { name: "GioNexus", country: "UK", date: "September 19, 2024", rating: 4.00, review: "it works good just make sure to run as admin or it wont start sometimes" },
  { name: "keloex",      country: "France", date: "October 6, 2024", rating: 3.64, review: "i only use aimbot no ban safe for main acc" },
  { name: "Samzey",  country: "France", date: "October 24, 2024", rating: 3.65, review: "dope just remember to close background apps made it faster for me" },
  { name: "SebVolt", country: "France", date: "November 12, 2024", rating: 4.77, review: "no cap this one is actually legit word" },
  { name: "LiamVex",     country: "UK", date: "November 29, 2024", rating: 4.41, review: "was scared it was sketchy but nah runs smooth and no weird popups" },
  { name: "Perfectra", country: "France", date: "December 11, 2024", rating: 4.71, review: "good stuff just dont forget to save settings lost mine once lol" },
  { name: "hugoXD",     country: "France", date: "December 28, 2024", rating: 4.59, review: "it do what it say not much to say but its good" },
  { name: "Marek",    country: "France", date: "January 13, 2025", rating: 4.30, review: "solid chair got couple errors at first but restart fixed it" },
  { name: "el3ctro", country: "USA", date: "January 28, 2025", rating: 4.96, review: "w bro actually got me some crazy wins nice shit" },
  { name: "Marcurion",   country: "France", date: "February 5, 2025", rating: 4.07, review: "works but needs a bit more features imo still worth it tho" },
  { name: "Pavel",    country: "France", date: "February 20, 2025", rating: 4.33, review: "got confused on first run but found guide on discord and then was easy" },
  { name: "Tomasito",    country: "Spain", date: "March 2, 2025", rating: 4.74, review: "buen cheato lo recomiendo" },
  { name: "Davix",    country: "France", date: "March 18, 2025", rating: 4.43, review: "clean fast word to anyone looking for a decent chair" },
  { name: "xPro",        country: "France", date: "March 28, 2025", rating: 4.79, review: "no bugs for me just make sure you update before using good stuff" },
  { name: "Gabryon",  country: "France", date: "April 6, 2025", rating: 4.37, review: "azec on top" },
  { name: "Ivan",     country: "France", date: "April 15, 2025", rating: 4.56, review: "w tool" },
  { name: "AntoNova", country: "France", date: "April 29, 2025", rating: 3.57, review: "nice just dont spam buttons or it might freeze happened once to me" },
  { name: "Dominic",  country: "UK", date: "May 7, 2025", rating: 3.84, review: "functional" },
  { name: "MoneyBagz",    country: "USA", date: "May 18, 2025", rating: 3.93, review: "works" },
  { name: "Antoine",  country: "France", date: "May 25, 2025", rating: 3.62, review: "nice just dont spam buttons or it might freeze happened once to me" },
  { name: "Tomislav", country: "UK", date: "June 1, 2025", rating: 3.85, review: "easy to use thanks" },
  { name: "ErikSeven",     country: "France", date: "June 10, 2025", rating: 3.65, review: "good chair hit diamond2 in 2days" },
  { name: "Benjamin", country: "France", date: "June 21, 2025", rating: 3.92, review: "confused me at start but its fine now runs nice" },
  { name: "MikeRogue",  country: "USA", date: "June 28, 2025", rating: 4.11, review: "tried other cheats but this is best and cheapest" },
  // New French reviews (June 29, 2025 → August 8, 2025)
  { name: "TheoV2",   country: "France", date: "June 29, 2025", rating: 4.8, review: "setup took 5 min and it ran smooth first try. no fps drop." },
  { name: "Lucas01",  country: "France", date: "June 30, 2025", rating: 4.9, review: "bought the lifetime bundle, unlock all worked instantly. clean ui fr." },
  { name: "EnzoKiro",   country: "France", date: "July 1, 2025", rating: 4.6, review: "works good, just follow the guide. got camos in under 2 mins." },
  { name: "Mathis", country: "France", date: "July 3, 2025", rating: 5.0, review: "5 stars. support answered my ticket in like 10 minutes gg." },
  { name: "Noah",   country: "France", date: "July 6, 2025", rating: 4.7, review: "no issues so far. settings save between sessions." },
  { name: "AdamZed",   country: "France", date: "July 7, 2025", rating: 4.8, review: "external chair feels smooth, aim legit if u tune it right." },
  { name: "Yanis",  country: "France", date: "July 10, 2025", rating: 4.9, review: "installer is simple, took me less than 3 min. nice work." },
  { name: "TommyIX",    country: "France", date: "July 13, 2025", rating: 4.6, review: "had one error but restart fixed it. been grinding all night." },
  { name: "Kylian", country: "France", date: "July 17, 2025", rating: 5.0, review: "unlock all is crazy fast. my whole class asked me how i did it." },
  { name: "Rayanx",  country: "France", date: "July 20, 2025", rating: 4.8, review: "solid tool, 0 crash for me. discord help is active." },
  { name: "LilianHZ", country: "France", date: "July 24, 2025", rating: 4.7, review: "bought for tournaments, safe so far. worth the price." },
  { name: "Axel",   country: "France", date: "July 28, 2025", rating: 5.0, review: "best value bundle ngl. instant unlocks and stable chair." },
  { name: "AmineDev",  country: "France", date: "August 1, 2025", rating: 4.7, review: "took a bit to configure but once set it's perfect." },
  { name: "Jules",  country: "France", date: "August 3, 2025", rating: 4.9, review: "ui is clean and updates are quick after patches." },
  { name: "Leo0x",    country: "France", date: "August 5, 2025", rating: 4.8, review: "playing on laptop 3060, performance is good, no stutter." },
  { name: "Nathan", country: "France", date: "August 6, 2025", rating: 4.6, review: "unlock all worked first try, chair legit when tuned low." },
  { name: "SamiK",   country: "France", date: "August 7, 2025", rating: 5.0, review: "been using for a week. zero bans. recommend." },
  { name: "bilal77",  country: "France", date: "August 8, 2025", rating: 4.9, review: "paid with stripe, link opened fine and key delivered fast." }
];

const reviewsSorted = [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

function renderStars(rating: number) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.25 && rating - full < 0.75;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="flex items-center gap-0.5">
      {Array(full).fill(0).map((_, i) => (
        <svg key={i} className="w-4 h-4" style={{ color: '#7C0906' }} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.176 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
      ))}
      {half && (
        <svg className="w-4 h-4" style={{ color: '#7C0906' }} fill="currentColor" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stopColor="currentColor"/><stop offset="50%" stopColor="transparent"/></linearGradient></defs><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.176 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" fill="url(#half)"/></svg>
      )}
      {Array(empty).fill(0).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-gray-600/40" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.176 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
      ))}
    </span>
  );
}

const Reviews = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen relative">
      <BackgroundNeo />
      <Header />
      <main className="container mx-auto px-6 py-16 pt-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white mb-2 text-center">{t('reviews_title')}</h1>
          <p className="text-white/70 text-center mb-8">{t('reviews_subtitle')}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {reviewsSorted.map((r, i) => (
              <div key={i} className="glass-base rounded-2xl p-5 flex flex-col justify-between min-h-[180px] border border-white/10 shadow-md">
                <div className="mb-4 text-white/90 text-base font-medium">"{r.review}"</div>
                <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-semibold">{r.name}</span>
                    {renderStars(r.rating)}
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>{r.country}</span>
                    <span>{r.date}</span>
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