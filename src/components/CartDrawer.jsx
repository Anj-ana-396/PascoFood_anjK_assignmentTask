import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem, onClearCart }) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 25 || subtotal === 0 ? 0 : 3.50;
  const discountAmount = subtotal * discount;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'PASCO10') {
      setDiscount(0.10);
      setPromoApplied(true);
    } else {
      alert('Invalid Promo Code. Try "PASCO10" for 10% off!');
    }
  };

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setOrderComplete(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#EC4899', '#FAF5EB', '#D97706'],
      });

      setTimeout(() => {
        onClearCart();
        setOrderComplete(false);
        onClose();
      }, 3000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-screen max-w-md bg-[#FFFDF7] border-l border-softpink-300 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-softpink-100/80 to-[#FAF5EB] border-b border-softpink-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-softpink-600" />
                <h3 className="text-xl font-bold text-gray-900 font-serif">Your Spice Basket</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-white/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Order Complete Success State */}
            {orderComplete ? (
              <div className="p-8 text-center space-y-4 my-auto">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 font-serif">Thank You for Your Order!</h4>
                <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                  Your authentic Pasco spice package is being hand-packed at Pasco House, Wigan, Lancashire!
                </p>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-16 space-y-3">
                      <ShoppingBag className="w-12 h-12 text-softpink-300 mx-auto" />
                      <p className="text-gray-500 font-medium">Your basket is currently empty.</p>
                      <p className="text-xs text-gray-400">Explore our delicious cooking sauces & pastes!</p>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-3.5 bg-white rounded-2xl border border-softpink-200 shadow-sm"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl border border-gray-100"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 truncate font-serif">
                            {item.name}
                          </h4>
                          <span className="text-xs font-bold text-softpink-600">
                            £{item.price.toFixed(2)}
                          </span>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                              className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-gray-800">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                              className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Totals & Checkout */}
                {cartItems.length > 0 && (
                  <div className="p-6 bg-white border-t border-softpink-200 space-y-4">
                    {/* Promo Code Input */}
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          placeholder="Promo code (e.g. PASCO10)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full bg-softpink-50/70 border border-softpink-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:outline-none focus:border-softpink-400"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-softpink-200 hover:bg-softpink-300 text-rosewood-500 font-bold text-xs rounded-xl transition-colors"
                      >
                        Apply
                      </button>
                    </form>

                    {promoApplied && (
                      <p className="text-xs font-bold text-emerald-600">
                        ✓ 10% Discount Applied!
                      </p>
                    )}

                    {/* Breakdown */}
                    <div className="space-y-1.5 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-semibold text-gray-900">£{subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Discount (10%)</span>
                          <span>-£{discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Standard UK Delivery</span>
                        <span className="font-semibold text-gray-900">
                          {shipping === 0 ? 'FREE (Over £25)' : `£${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-base font-extrabold text-gray-900 font-serif pt-2 border-t border-gray-100">
                        <span>Total Payable</span>
                        <span className="text-softpink-600">£{total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={checkingOut}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-softpink-500 via-pink-600 to-rosewood-500 text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      {checkingOut ? (
                        <span>Processing Order...</span>
                      ) : (
                        <>
                          <span>Proceed to Secure Checkout</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
