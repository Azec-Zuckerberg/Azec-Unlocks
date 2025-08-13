import React from 'react';
import { Star, Quote, Trophy, Shield } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  content: string;
  avatar: string;
  verified: boolean;
  badge?: string;
}

const PsychologicalTestimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Alex "ProGamer" Chen',
      role: 'Professional Esports Player',
      location: 'Los Angeles, CA',
      rating: 5,
      content: 'This is absolutely game-changing! I\'ve been using Azec for 6 months and my K/D ratio went from 1.2 to 3.8. The undetected features are incredible.',
      avatar: '/lovable-uploads/AzecLogo.png',
      verified: true,
      badge: 'Verified Pro'
    },
    {
      id: '2',
      name: 'Sarah "SniperQueen" Johnson',
      role: 'Twitch Streamer',
      location: 'Austin, TX',
      rating: 5,
      content: 'My viewers can\'t believe how good I\'ve become! Azec Unlocks gave me the edge I needed to compete with the best. 100% recommend!',
      avatar: '/lovable-uploads/AzecLogo.png',
      verified: true,
      badge: 'Top Streamer'
    },
    {
      id: '3',
      name: 'Mike "Tactical" Rodriguez',
      role: 'Tournament Winner',
      location: 'Miami, FL',
      rating: 5,
      content: 'Won my first major tournament thanks to Azec! The unlock all feature saved me months of grinding. Best investment ever!',
      avatar: '/lovable-uploads/AzecLogo.png',
      verified: true,
      badge: 'Champion'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          What Professional Gamers Say
        </h2>
        <p className="text-white/60 text-lg">
          Join thousands of satisfied customers who trust Azec Unlocks
        </p>
        
        {/* Social Proof Stats */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>2,000+ Professional Users</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>4.9/5 Average Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span>100% Undetected Guarantee</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="relative p-6 rounded-2xl border border-white/20 backdrop-blur-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group hover:scale-105"
          >
            {/* Quote Icon */}
            <Quote className="absolute top-4 right-4 w-8 h-8 text-white/20" />
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {renderStars(testimonial.rating)}
            </div>

            {/* Content */}
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              "{testimonial.content}"
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </h4>
                  {testimonial.verified && (
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  )}
                </div>
                <p className="text-white/60 text-xs">{testimonial.role}</p>
                <p className="text-white/40 text-xs">{testimonial.location}</p>
              </div>
              {testimonial.badge && (
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  {testimonial.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Join the Elite?
          </h3>
          <p className="text-white/70 mb-6">
            Don't let others have the advantage. Get Azec Unlocks today and dominate the competition.
          </p>
          <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            ⚡ Get Started Now - 85% OFF
          </button>
        </div>
      </div>
    </section>
  );
};

export default PsychologicalTestimonials;



