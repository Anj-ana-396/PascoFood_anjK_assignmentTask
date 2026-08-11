import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles } from 'lucide-react';

const HEAT_LEVELS = [
  {
    level: 1,
    title: 'Mild & Creamy',
    subtitle: 'Korma & Butter Chicken Range',
    description: 'Silky, aromatic, and comforting. Delicate coconut cream, butter, ground almonds, and subtle cardamom without heat.',
    color: 'from-pink-300 to-rose-300',
  },
  {
    level: 2,
    title: 'Medium Spiced',
    subtitle: 'Tikka Masala & Kashmiri Range',
    description: 'Perfect balanced warmth. Roasted coriander seeds, paprika, ginger, and garlic for authentic everyday dining.',
    color: 'from-rose-400 to-pink-500',
  },
  {
    level: 3,
    title: 'Hot & Zesty',
    subtitle: 'Jalfrezi & Balti Range',
    description: 'Bold North Indian kick with fresh bell peppers, green chilies, cracked mustard seeds, and rich onion gravy.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    level: 4,
    title: 'Fiery & Tangy',
    subtitle: 'Goan Vindaloo & Hot Pickles',
    description: 'Intense chili heat balanced with fermented cider vinegar, roasted red chilies, and potent garlicky spices.',
    color: 'from-rose-600 to-rose-800',
  },
];

export default function SpiceLevelGuide({ onSelectHeatFilter }) {
  const [selectedLevel, setSelectedLevel] = useState(2);

  const activeHeat = HEAT_LEVELS.find((h) => h.level === selectedLevel);

  return (
    <section id="spice-guide" className="py-20 bg-gradient-to-b from-[#FAF5EB] via-[#FCE7F0]/40 to-[#FAF5EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-rosewood-500 text-xs font-bold tracking-wider uppercase">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Interactive Heat Scale</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 font-serif">
            Find Your Ideal Spice Intensity
          </h2>
          <p className="text-base text-gray-600">
            From subtle aromatic kormas to fiery Goan vindaloos, explore Pasco’s heat spectrum crafted for every palate.
          </p>
        </div>

        {/* Level Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {HEAT_LEVELS.map((item) => {
            const isActive = item.level === selectedLevel;
            return (
              <button
                key={item.level}
                onClick={() => {
                  setSelectedLevel(item.level);
                  if (onSelectHeatFilter) onSelectHeatFilter(item.level);
                }}
                className={`p-5 rounded-3xl transition-all duration-300 text-left border ${
                  isActive
                    ? 'bg-white shadow-xl border-softpink-400 scale-105'
                    : 'glass-card border-softpink-200 hover:border-softpink-300 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Flame
                      key={i}
                      className={`w-5 h-5 ${
                        i < item.level ? 'text-rose-500 fill-rose-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-softpink-600 block">Level {item.level}</span>
                <h4 className="text-lg font-bold text-gray-900 font-serif">{item.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Selected Heat Level Detail Card */}
        {activeHeat && (
          <motion.div
            key={activeHeat.level}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 glass-panel p-8 rounded-3xl border border-softpink-300 shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-softpink-600">
                {activeHeat.subtitle}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 font-serif">
                {activeHeat.title} (Level {activeHeat.level})
              </h3>
              <p className="text-sm text-gray-600 max-w-xl leading-relaxed">
                {activeHeat.description}
              </p>
            </div>

            <button
              onClick={() => onSelectHeatFilter && onSelectHeatFilter(activeHeat.level)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-softpink-500 to-rosewood-500 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-all whitespace-nowrap"
            >
              Filter Level {activeHeat.level} Sauces
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
