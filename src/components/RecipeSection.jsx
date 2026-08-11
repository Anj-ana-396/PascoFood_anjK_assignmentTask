import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, Utensils, ChefHat, X, CheckCircle2 } from 'lucide-react';
import { RECIPES } from '../data/products';

export default function RecipeSection() {
  const [activeRecipe, setActiveRecipe] = useState(null);

  return (
    <section id="recipes" className="py-20 relative bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-rosewood-500 text-xs font-bold tracking-wider uppercase mb-3">
              <ChefHat className="w-4 h-4 text-softpink-500" />
              <span>Pasco Kitchen Inspirations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 font-serif">
              Authentic Indian Recipes <br />
              <span className="gradient-text-pink">Made Simple at Home</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 max-w-md">
            Unlock restaurant-quality curries in under 30 minutes using Pasco’s secret sauce bases and marinades.
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RECIPES.map((recipe) => (
            <motion.div
              key={recipe.id}
              whileHover={{ y: -8 }}
              className="glass-card rounded-3xl overflow-hidden border border-softpink-200 shadow-md flex flex-col justify-between group cursor-pointer"
              onClick={() => setActiveRecipe(recipe)}
            >
              <div>
                {/* Recipe Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow">
                    {recipe.difficulty}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  {/* Pasco Product Tag */}
                  <span className="text-[11px] font-extrabold text-softpink-600 uppercase tracking-widest block">
                    Uses: {recipe.pascoProduct}
                  </span>

                  <h3 className="text-xl font-bold text-gray-900 font-serif group-hover:text-softpink-600 transition-colors">
                    {recipe.title}
                  </h3>

                  {/* Info Meta */}
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500 pt-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-softpink-500" />
                      <span>Prep: {recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-softpink-500" />
                      <span>Serves {recipe.servings}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button className="w-full py-3 rounded-2xl bg-softpink-100 hover:bg-softpink-200 text-rosewood-500 font-bold text-xs transition-colors flex items-center justify-center gap-2">
                  <Utensils className="w-4 h-4" />
                  <span>View Step-By-Step Recipe</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Recipe Detail Modal */}
      <AnimatePresence>
        {activeRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveRecipe(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[#FFFDF7] rounded-3xl border border-softpink-300 shadow-2xl overflow-hidden max-w-xl w-full z-10 p-6 sm:p-8 space-y-6 my-8"
            >
              <button
                onClick={() => setActiveRecipe(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 text-gray-500 rounded-full hover:text-gray-900 shadow"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-xs font-extrabold text-softpink-600 uppercase tracking-widest">
                  Featured Pasco Product: {activeRecipe.pascoProduct}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 font-serif mt-1">
                  {activeRecipe.title}
                </h3>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-softpink-200 pb-2">
                  Preparation Instructions
                </h4>
                <ol className="space-y-3">
                  {activeRecipe.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-softpink-500 flex-shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <button
                onClick={() => setActiveRecipe(null)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-softpink-500 to-rosewood-500 text-white font-bold text-sm shadow-md hover:scale-[1.02] transition-transform"
              >
                Close Recipe Guide
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
