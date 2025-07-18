import React, { useEffect, useState } from "react";

// Set a universal offer end date (e.g., 3 days from now, hardcoded)
// Change this date as needed for future offers
const OFFER_END = new Date("2024-06-17T23:59:59Z"); // Example: June 17, 2024, 23:59 UTC

function getTimeLeft() {
  const now = new Date();
  const diff = OFFER_END.getTime() - now.getTime();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { hours, minutes, seconds };
}

const CountdownOffer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return null;
  }

  return (
    <span className="ml-2 inline-flex items-center rounded-full bg-green-600/80 px-3 py-1 text-xs font-mono font-semibold text-white shadow border border-green-400/60">
      <svg className="w-3 h-3 mr-1 text-green-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {timeLeft.hours.toString().padStart(2, '0')}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')} left
    </span>
  );
};

export default CountdownOffer; 