import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-softpink-300 shadow-2xl relative overflow-hidden text-center space-y-6">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-softpink-200/40 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-rosewood-500 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-softpink-500" />
            <span>Pasco Spice Club</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 font-serif max-w-2xl mx-auto">
            Get Exclusive Recipes & Secret Product Drops
          </h2>

          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Subscribe to our Pasco Food newsletter and receive 10% off your first online order, plus seasonal Indian recipe pairings.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-100 text-emerald-700 rounded-2xl font-bold text-sm shadow">
              <CheckCircle2 className="w-5 h-5" />
              <span>Welcome to the Pasco Family! Check your inbox for your 10% discount code.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 rounded-2xl bg-white border border-softpink-300 text-sm focus:outline-none focus:border-softpink-500 shadow-sm"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-softpink-500 via-pink-600 to-rosewood-500 text-white font-bold text-sm shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
