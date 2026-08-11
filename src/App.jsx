import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import SpiceLevelGuide from './components/SpiceLevelGuide';
import RecipeSection from './components/RecipeSection';
import BrandStory from './components/BrandStory';
import ReviewsSection from './components/ReviewsSection';
import CartDrawer from './components/CartDrawer';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { PRODUCTS } from './data/products';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [heatFilter, setHeatFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { ...PRODUCTS[0], quantity: 2 },
    { ...PRODUCTS[1], quantity: 1 }
  ]);
  const [modalProduct, setModalProduct] = useState(null);
  const [addedId, setAddedId] = useState(null);

  // Cart Operations
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Heat level filter
      if (heatFilter !== null && product.heatLevel !== heatFilter) {
        return false;
      }
      // Search term filter
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesIng = product.ingredients.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesIng;
      }
      return true;
    });
  }, [activeCategory, heatFilter, searchTerm]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRecipes = () => {
    const el = document.getElementById('recipes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-gray-900 font-sans selection:bg-softpink-300 selection:text-gray-900 overflow-x-hidden">
      
      {/* Top Floating Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* 3D WebGL Futuristic Hero Section */}
      <Hero3D
        onExploreClick={scrollToRecipes}
        onShopClick={scrollToProducts}
      />

      {/* Main Product Catalog Section */}
      <section id="products" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-rosewood-500 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-softpink-500" />
              <span>Full Product Range</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 font-serif">
              Authentic Indian Cooking <br />
              <span className="gradient-text-pink">Sauces, Pastes & Chutneys</span>
            </h2>
            <p className="text-base text-gray-600">
              Hand-crafted with 100% natural herbs and secret roasted spices. Gluten-free & vegetarian.
            </p>
          </div>

          {/* Category Pills Filter */}
          <CategoryFilter
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setHeatFilter(null); // Reset heat filter when changing main category
            }}
          />

          {/* Heat Filter Active Pill Banner */}
          {heatFilter !== null && (
            <div className="flex items-center justify-center gap-3 my-4">
              <span className="text-xs font-semibold text-gray-600">
                Filtering by Heat Level {heatFilter}
              </span>
              <button
                onClick={() => setHeatFilter(null)}
                className="text-xs font-bold text-softpink-600 underline hover:text-rosewood-500"
              >
                Clear Heat Filter
              </button>
            </div>
          )}

          {/* Product Grid */}
          <div className="mt-8">
            <ProductGrid
              products={filteredProducts}
              onQuickView={(p) => setModalProduct(p)}
              onAddToCart={handleAddToCart}
              addedId={addedId}
            />
          </div>

        </div>
      </section>

      {/* Heat Scale Guide */}
      <SpiceLevelGuide
        onSelectHeatFilter={(level) => {
          setHeatFilter(level);
          scrollToProducts();
        }}
      />

      {/* Culinary Recipe Pairings */}
      <RecipeSection />

      {/* Heritage Brand Story */}
      <BrandStory />

      {/* Testimonials */}
      <ReviewsSection />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Quick View Modal */}
      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

    </div>
  );
}
