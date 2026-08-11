import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Eye, Plus, Star, Check } from 'lucide-react';

export default function ProductGrid({ products, onQuickView, onAddToCart, addedId }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white/50 rounded-3xl border border-softpink-200 p-8 max-w-md mx-auto">
        <p className="text-gray-500 font-medium text-lg">No products match your search or filter.</p>
        <p className="text-sm text-gray-400 mt-2">Try clearing your search query or switching categories.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product, idx) => {
        const isAdded = addedId === product.id;

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card rounded-3xl overflow-hidden border border-softpink-200/80 hover:border-softpink-400 hover:shadow-xl transition-all duration-300 flex flex-col group relative"
          >
            {/* Image Container with Accent Hover Overlay */}
            <div className="relative h-52 w-full overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Heat Scale Badge on Top Left */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-md border border-softpink-200">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Flame
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < product.heatLevel
                        ? 'text-rose-500 fill-rose-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-[10px] font-bold text-gray-700 ml-1">
                  {product.heatName}
                </span>
              </div>

              {/* Quick View Button on Top Right */}
              <button
                onClick={() => onQuickView(product)}
                className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-gray-700 hover:text-softpink-600 rounded-full shadow-md backdrop-blur-md transition-all hover:scale-110"
                title="Quick View Details"
              >
                <Eye className="w-4 h-4" />
              </button>

              {/* Weight Size Tag */}
              <div className="absolute bottom-3 left-3 text-xs font-bold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                {product.size}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                {/* Rating & Reviews */}
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mb-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-softpink-600 transition-colors line-clamp-1 font-serif">
                  {product.name}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-gray-600 line-clamp-2 mt-1 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Dietary Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.dietary.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold text-rosewood-500 bg-softpink-100/70 border border-softpink-200 px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price & Add to Cart Button */}
              <div className="flex items-center justify-between pt-3 border-t border-softpink-100">
                <div>
                  <span className="text-xs text-gray-400 block font-medium">RRP</span>
                  <span className="text-xl font-extrabold text-gray-900 font-serif">
                    £{product.price.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-softpink-500 to-rosewood-500 text-white hover:shadow-softpink-300/50 hover:scale-105 active:scale-95'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
