import React from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'sauces', label: 'Cooking Sauces' },
  { id: 'pastes', label: 'Cooking Pastes' },
  { id: 'pickles', label: 'Pickles & Chutneys' },
  { id: 'foodservice', label: 'Foodservice / Catering' },
];

export default function CategoryFilter({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-6">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
              isActive
                ? 'text-white shadow-md shadow-softpink-300/50 scale-105'
                : 'text-gray-700 bg-white/70 hover:bg-softpink-100/60 border border-softpink-200/80 hover:border-softpink-300'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategoryPill"
                className="absolute inset-0 bg-gradient-to-r from-softpink-500 via-pink-600 to-rosewood-500 rounded-full -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
