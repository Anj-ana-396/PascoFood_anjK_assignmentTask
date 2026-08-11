import React from 'react';
import { motion } from 'framer-motion';
import { History, HeartHandshake, Sparkles, Building2, MapPin } from 'lucide-react';

const MILESTONES = [
  {
    year: '1992',
    title: 'Wigan Family Kitchen Origins',
    description: 'Maggan and Seema Khade created authentic spice pastes in their home kitchen in Wigan, Lancashire, supplying local takeaways.',
    icon: History,
  },
  {
    year: '2000s',
    title: 'Secret Recipe Expansion',
    description: 'Expanded range to include ready-to-cook sauces, hot mango pickles, and catering tubs for professional chefs across the UK.',
    icon: Sparkles,
  },
  {
    year: '2012',
    title: 'Pioneering Digital Web Era',
    description: 'Launched initial Pasco online catalog platform bringing authentic Lancashire-made Indian food products directly to households.',
    icon: HeartHandshake,
  },
  {
    year: 'Present',
    title: 'Modern Culinary Evolution',
    description: 'Operating from Pasco House, Wigan, delivering 100% natural, gluten-free, authentic spice solutions nationwide.',
    icon: Building2,
  },
];

export default function BrandStory() {
  return (
    <section id="story" className="py-24 bg-gradient-to-b from-[#FAF5EB] via-[#FCE7F0]/30 to-[#FAF5EB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-rosewood-500 text-xs font-bold tracking-wider uppercase">
            <MapPin className="w-4 h-4 text-softpink-500" />
            <span>Made in Wigan, Lancashire</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 font-serif">
            Our Heritage Story <br />
            <span className="gradient-text-pink">From Kitchen to Nationwide</span>
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Founded in 1992 with a passion for authentic spice crafting. Every jar of Pasco sauce carries three decades of family dedication and uncompromising quality.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MILESTONES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card p-6 rounded-3xl border border-softpink-200 shadow-lg flex flex-col justify-between space-y-4 relative"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-softpink-400 to-rosewood-500 flex items-center justify-center text-white shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-rosewood-500 font-serif block">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 font-serif">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-softpink-100 flex items-center gap-1.5 text-[11px] font-semibold text-softpink-600">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>100% Authentic Quality</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
