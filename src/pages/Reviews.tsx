import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundNeo from "@/components/BackgroundNeo";
import { useTranslation } from "react-i18next";

const ratings = [5,5,5,5,5,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3];
const shuffledRatings = ratings.sort(() => Math.random() - 0.5);
const reviews = [
  { name: "Ethan M.", city: "Cork, Ireland", date: "September 3, 2024", rating: 4.94, review: "Aura formed the whole lobby 32 kills lets go Azec on top" },
  { name: "Giovanni R.", city: "Modena, Italy", date: "September 19, 2024", rating: 4.00, review: "It works good just make sure to run as admin or it wont start sometimes" },
  { name: "Lucas T.", city: "Sherbrooke, Canada", date: "October 6, 2024", rating: 3.64, review: "i only use aimbot no ban safe for main" },
  { name: "Samuel J.", city: "Aalborg, Denmark", date: "October 24, 2024", rating: 3.65, review: "Dope just rember to close background apps made it faster for me" },
  { name: "Sebastian M.", city: "Heidelberg, Germany", date: "November 12, 2024", rating: 4.77, review: "No lie this one is actually legit word" },
  { name: "Liam O.", city: "Galway, Ireland", date: "November 29, 2024", rating: 4.41, review: "Was scared it was sketchy but nah runs smooth and no weird popups" },
  { name: "Nikolai P.", city: "Plovdiv, Bulgaria", date: "December 11, 2024", rating: 4.71, review: "Good stuff just dont forget to save settings lost mine once lol" },
  { name: "Hugo D.", city: "Dijon, France", date: "December 28, 2024", rating: 4.59, review: "It do what it say not much to say but its good" },
  { name: "Marek N.", city: "Brno, Czech Republic", date: "January 13, 2025", rating: 4.30, review: "solid chair got couple errors at first but restart fixed it" },
  { name: "Alex T.", city: "Duluth, Minnesota, USA", date: "January 28, 2025", rating: 4.96, review: "W bro actually got me some crazy wins nice shiit" },
  { name: "Marcus L.", city: "Västerås, Sweden", date: "February 5, 2025", rating: 4.07, review: "Works but needs a bit more feature imo still worth it tho" },
  { name: "Pavel M.", city: "Yaroslavl, Russia", date: "February 20, 2025", rating: 4.33, review: "Got confused on first run but found guide on discord and then was easy" },
  { name: "Tomás G.", city: "Santander, Spain", date: "March 2, 2025", rating: 4.74, review: "Not bad for price just backup your configs just in case" },
  { name: "David N.", city: "Lublin, Poland", date: "March 18, 2025", rating: 4.43, review: "Clean fast word to anyone looking for a decent chair" },
  { name: "Henrik N.", city: "Odense, Denmark", date: "March 28, 2025", rating: 4.79, review: "No bugs for me just make sure you update before using good stuff" },
  { name: "Gabriel L.", city: "Rennes, France", date: "April 6, 2025", rating: 4.37, review: "Azec on top" },
  { name: "Ivan P.", city: "Varna, Bulgaria", date: "April 15, 2025", rating: 4.56, review: "W toool" },
  { name: "János K.", city: "Szeged, Hungary", date: "April 29, 2025", rating: 3.57, review: "Basic" },
  { name: "Dominic R.", city: "Parma, Italy", date: "May 7, 2025", rating: 3.84, review: "Functional" },
  { name: "Blake C.", city: "Boise, Idaho, USA", date: "May 18, 2025", rating: 3.93, review: "Works" },
  { name: "Antoine M.", city: "Tours, France", date: "May 25, 2025", rating: 3.62, review: "Nice just dont spam buttons or it might freeze happened once to me" },
  { name: "Tomislav H.", city: "Osijek, Croatia", date: "June 1, 2025", rating: 3.85, review: "Easy to use but needs better icons otherwise good" },
  { name: "Erik S.", city: "Tromsø, Norway", date: "June 10, 2025", rating: 3.65, review: "Good chair hit diamond2 in 2days" },
  { name: "Benjamin F.", city: "Kassel, Germany", date: "June 21, 2025", rating: 3.92, review: "Confused me at start but it's fine now runs nice" },
  { name: "Michael O.", city: "Cork, Ireland", date: "June 28, 2025", rating: 4.11, review: "It's aight not perfect but def helped good chair for price" },
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
                    <span>{r.city}</span>
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