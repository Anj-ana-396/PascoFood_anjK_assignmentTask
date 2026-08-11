import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, ShieldCheck, ShoppingBag, Plus, Minus, Check, Star } from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-[#FFFDF7] rounded-3xl border border-softpink-300 shadow-2xl overflow-hidden max-w-2xl w-full z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-gray-500 hover:text-gray-900 rounded-full shadow transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Image */}
            <div className="relative h-64 md:h-full bg-gray-100 min-h-[260px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />
              
              {/* Heat level badge overlay */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                <div className="flex">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Flame
                      key={i}
                      className={`w-4 h-4 ${
                        i < product.heatLevel ? 'text-rose-500 fill-rose-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-800">{product.heatName}</span>
              </div>
            </div>

            {/* Modal Body Details */}
            <div className="p-6 md:p-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-softpink-600">
                    Pasco Authentic Line
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 font-serif leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-gray-900 font-serif">
                    £{product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">({product.size})</span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

                {/* Ingredients section */}
                <div className="space-y-1.5 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Master Ingredients
                  </h4>
                  <p className="text-xs text-gray-500 bg-softpink-50/70 p-3 rounded-xl border border-softpink-200/60 leading-normal">
                    {product.ingredients}
                  </p>
                </div>

                {/* Dietary Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.dietary.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold text-rosewood-500 bg-softpink-100/80 px-2.5 py-1 rounded-lg border border-softpink-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity Counter & Add button */}
              <div className="space-y-3 pt-4 border-t border-softpink-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Quantity</span>
                  <div className="flex items-center gap-3 bg-white border border-softpink-200 rounded-xl px-3 py-1.5 shadow-sm">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="p-1 text-gray-500 hover:text-gray-900"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-gray-900 min-w-[20px] text-center">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="p-1 text-gray-500 hover:text-gray-900"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAdd}
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-softpink-500 via-pink-600 to-rosewood-500 text-white hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Basket • £{(product.price * qty).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
