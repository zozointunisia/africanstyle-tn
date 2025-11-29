import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X } from 'lucide-react';
// import { products } from '../data/products';
import * as React from 'react';
import { ProductCard } from './ProductCard';

type CatalogPageProps = {
  navigateToProduct: (productId: number) => void;
};

export function CatalogPage({ navigateToProduct }: CatalogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = ['All', 'Dresses', 'Shirts', 'Sets', 'Accessories'];
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: 'Over $200', min: 200, max: Infinity },
  ];

    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
      fetch('https://africanstyle-tn.onrender.com/api/products')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);

    const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const priceRangeMatch =
      selectedPriceRange === 'All' ||
      (() => {
        const range = priceRanges.find((r) => r.label === selectedPriceRange);
        return range && product.price >= range.min && product.price < range.max;
      })();
    return categoryMatch && priceRangeMatch;
  });

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-4 text-[#2C2C2C]">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-[#FF8C00] text-white'
                  : 'bg-gray-100 text-[#2C2C2C] hover:bg-gray-200'
              }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-4 text-[#2C2C2C]">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <motion.button
              key={range.label}
              onClick={() => setSelectedPriceRange(range.label)}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedPriceRange === range.label
                  ? 'bg-[#009E60] text-white'
                  : 'bg-gray-100 text-[#2C2C2C] hover:bg-gray-200'
              }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              {range.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <motion.button
        onClick={() => {
          setSelectedCategory('All');
          setSelectedPriceRange('All');
        }}
        className="w-full border-2 border-[#2C2C2C] text-[#2C2C2C] px-4 py-2 rounded-lg hover:bg-[#2C2C2C] hover:text-white transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Reset Filters
      </motion.button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#FF8C00]/10 to-[#009E60]/10 py-16 relative overflow-hidden">
        <motion.div
          className="absolute top-5 right-10 w-20 h-20 rounded-full bg-[#FF8C00]/10"
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4 text-[#2C2C2C]">Our Collection</h1>
            <p className="text-gray-600 text-lg">
              Discover authentic African elegance in every piece
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <motion.div 
              className="sticky top-24 bg-white p-6 rounded-xl shadow-sm"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FilterSection />
            </motion.div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
              <motion.button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2 bg-[#2C2C2C] text-white px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                Filters
              </motion.button>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <ProductCard product={product} navigateToProduct={navigateToProduct} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedPriceRange('All');
                  }}
                  className="mt-4 text-[#FF8C00] hover:underline"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto z-50 lg:hidden shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[#2C2C2C]">Filters</h2>
                <motion.button 
                  onClick={() => setShowMobileFilters(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              <FilterSection />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Fixed Floating CTA Button */}
      <motion.a
        href="https://wa.me/21600000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#FF8C00] text-white px-6 py-4 rounded-full shadow-2xl hover:bg-[#FF8C00]/90 transition-colors z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        style={{
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        Need help? Contact us
      </motion.a>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
