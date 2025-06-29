import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundNeo from "@/components/BackgroundNeo";
import { useTranslation } from "react-i18next";

const ratings = [5,5,5,5,5,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3];
const shuffledRatings = ratings.sort(() => Math.random() - 0.5);
const reviews = [
  { name: "Ethan", country: "Ireland", date: "September 3, 2024", rating: 4.94, review: "Aura formed the whole lobby 32 kills lets go Azec on top" },
  { name: "Giovanni", country: "Italy", date: "September 19, 2024", rating: 4.00, review: "It works good just make sure to run as admin or it wont start sometimes" },
  { name: "keloex",      country: "Canada", date: "October 6, 2024", rating: 3.64, review: "i only use aimbot no ban safe for main" },
  { name: "Samuel",  country: "Denmark", date: "October 24, 2024", rating: 3.65, review: "Dope just rember to close background apps made it faster for me" },
  { name: "Sebastian", country: "Germany", date: "November 12, 2024", rating: 4.77, review: "No lie this one is actually legit word" },
  { name: "Liam",     country: "Ireland", date: "November 29, 2024", rating: 4.41, review: "Was scared it was sketchy but nah runs smooth and no weird popups" },
  { name: "perfectGamer", country: "Bulgaria", date: "December 11, 2024", rating: 4.71, review: "Good stuff just dont forget to save settings lost mine once lol" },
  { name: "Hugo",     country: "France", date: "December 28, 2024", rating: 4.59, review: "It do what it say not much to say but its good" },
  { name: "Marek",    country: "Czech Republic", date: "January 13, 2025", rating: 4.30, review: "solid chair got couple errors at first but restart fixed it" },
  { name: "electroGamer", country: "USA", date: "January 28, 2025", rating: 4.96, review: "W bro actually got me some crazy wins nice shiit" },
  { name: "Marcus",   country: "Sweden", date: "February 5, 2025", rating: 4.07, review: "Works but needs a bit more feature imo still worth it tho" },
  { name: "Pavel",    country: "Russia", date: "February 20, 2025", rating: 4.33, review: "Got confused on first run but found guide on discord and then was easy" },
  { name: "Tomás",    country: "Spain", date: "March 2, 2025", rating: 4.74, review: "Not bad for price just backup your configs just in case" },
  { name: "David",    country: "Poland", date: "March 18, 2025", rating: 4.43, review: "Clean fast word to anyone looking for a decent chair" },
  { name: "xPro",        country: "Denmark", date: "March 28, 2025", rating: 4.79, review: "No bugs for me just make sure you update before using good stuff" },
  { name: "Gabriel",  country: "France", date: "April 6, 2025", rating: 4.37, review: "Azec on top" },
  { name: "Ivan",     country: "Bulgaria", date: "April 15, 2025", rating: 4.56, review: "W toool" },
  { name: "Antoine", country: "Spain", date: "April 29, 2025", rating: 3.57, review: "buen cheato lo recomiendo" },
  { name: "Dominic",  country: "Italy", date: "May 7, 2025", rating: 3.84, review: "Functional" },
  { name: "MoneyInthebag",    country: "USA", date: "May 18, 2025", rating: 3.93, review: "Works" },
  { name: "Antoine",  country: "France", date: "May 25, 2025", rating: 3.62, review: "Nice just dont spam buttons or it might freeze happened once to me" },
  { name: "Tomislav", country: "Croatia", date: "June 1, 2025", rating: 3.85, review: "Easy to use thanks" },
  { name: "Erik",     country: "Norway", date: "June 10, 2025", rating: 3.65, review: "Good chair hit diamond2 in 2days" },
  { name: "Benjamin", country: "Germany", date: "June 21, 2025", rating: 3.92, review: "Confused me at start but it's fine now runs nice" },
  { name: "Michael",  country: "Ireland", date: "June 28, 2025", rating: 4.11, review: "Tried other cheats but this is bests and cheapest" }
].map((r, i) => ({ ...r, rating: shuffledRatings[i] }));

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
                <div className="mb-4 text-white/90 text-base font-medium">“{r.review}”</div>
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