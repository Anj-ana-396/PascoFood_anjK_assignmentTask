import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { REVIEWS } from '../data/products';

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? REVIEWS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === REVIEWS.length - 1 ? 0 : prevIdx + 1));
  };

  const review = REVIEWS[currentIndex];

  return (
    <section className="py-20 bg-[#FFFDF7] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-softpink-600">
            Trusted by Chefs & Families
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-serif">
            What People Say About Pasco
          </h2>
        </div>

        {/* Carousel Window */}
        <div className="relative glass-panel p-8 sm:p-12 rounded-3xl border border-softpink-300 shadow-xl max-w-3xl mx-auto">
          <Quote className="w-12 h-12 text-softpink-300 absolute top-6 right-8 opacity-60" />

          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 relative z-10"
            >
              {/* Stars */}
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-lg sm:text-xl font-medium text-gray-800 italic leading-relaxed font-serif">
                "{review.text}"
              </p>

              {/* Author info */}
              <div>
                <h4 className="text-base font-bold text-gray-900">{review.author}</h4>
                <p className="text-xs text-softpink-600 font-semibold">{review.role} • {review.location}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={prev}
              className="p-2.5 rounded-full bg-white text-gray-700 hover:text-softpink-600 border border-softpink-200 shadow hover:scale-105 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-2.5 rounded-full bg-white text-gray-700 hover:text-softpink-600 border border-softpink-200 shadow hover:scale-105 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex gap-1.5 ml-auto">
              {REVIEWS.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    idx === currentIndex ? 'bg-softpink-500' : 'bg-softpink-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
