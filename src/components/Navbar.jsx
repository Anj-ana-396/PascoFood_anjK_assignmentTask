import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Flame, Sparkles } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onSearchChange, searchTerm }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF5EB]/85 backdrop-blur-md shadow-md border-b border-softpink-200/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-softpink-400 via-pink-500 to-rosewood-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              P
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 font-serif leading-none">
                PASCO
              </span>
              <span className="text-[10px] font-bold tracking-widest text-softpink-600 uppercase">
                Foods Limited
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#products"
              className="text-sm font-semibold text-gray-700 hover:text-softpink-600 transition-colors"
            >
              Curry Sauces & Pastes
            </a>
            <a
              href="#spice-guide"
              className="text-sm font-semibold text-gray-700 hover:text-softpink-600 transition-colors flex items-center gap-1"
            >
              <Flame className="w-4 h-4 text-rose-500" />
              <span>Heat Meter</span>
            </a>
            <a
              href="#recipes"
              className="text-sm font-semibold text-gray-700 hover:text-softpink-600 transition-colors"
            >
              Recipes
            </a>
            <a
              href="#story"
              className="text-sm font-semibold text-gray-700 hover:text-softpink-600 transition-colors"
            >
              Our Story (1992)
            </a>
            <a
              href="#foodservice"
              className="text-sm font-semibold text-gray-700 hover:text-softpink-600 transition-colors"
            >
              Foodservice
            </a>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4">
            
            {/* Quick Search */}
            <div className="relative">
              {showSearch ? (
                <div className="flex items-center bg-white/90 rounded-full border border-softpink-300 px-3 py-1.5 shadow-sm">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search sauces, pickles..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-36 sm:w-48 bg-transparent text-xs font-medium text-gray-800 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setShowSearch(false);
                      onSearchChange('');
                    }}
                    className="text-gray-400 hover:text-gray-600 ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2.5 rounded-full text-gray-700 hover:text-softpink-600 hover:bg-softpink-100/70 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Slide-over Cart Trigger Button */}
            <button
              onClick={onOpenCart}
              className="relative px-4 py-2.5 rounded-full bg-gradient-to-r from-softpink-500 to-rosewood-500 text-white font-bold text-sm shadow-md hover:shadow-softpink-300/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-white text-softpink-700 font-extrabold text-xs rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-softpink-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF7] border-b border-softpink-200 px-6 py-6 space-y-4 shadow-xl">
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-gray-800 hover:text-softpink-600"
          >
            Curry Sauces & Pastes
          </a>
          <a
            href="#spice-guide"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-gray-800 hover:text-softpink-600"
          >
            Heat Scale Guide
          </a>
          <a
            href="#recipes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-gray-800 hover:text-softpink-600"
          >
            Authentic Recipes
          </a>
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-gray-800 hover:text-softpink-600"
          >
            Our Heritage (Wigan, 1992)
          </a>
          <a
            href="#foodservice"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-gray-800 hover:text-softpink-600"
          >
            Foodservice & Catering
          </a>
        </div>
      )}
    </header>
  );
}
