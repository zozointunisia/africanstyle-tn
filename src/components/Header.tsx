import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from 'figma:asset/96a5f1864c8de6690df1cd15be406f934ade09c0.png';

type HeaderProps = {
  currentPage: string;
  navigateTo: (page: string) => void;
  cartItemCount: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

export function Header({
  currentPage,
  navigateTo,
  cartItemCount,
  mobileMenuOpen,
  setMobileMenuOpen,
}: HeaderProps) {
  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Catalog', page: 'catalog' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={logoImage}
              alt="AfricanStyle TN"
              className="h-12 w-12 rounded-full object-cover shadow-md"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <span className="text-[#2C2C2C] hidden sm:block">AfricanStyle TN</span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={`relative transition-colors ${
                  currentPage === item.page
                    ? 'text-[#FF8C00]'
                    : 'text-[#2C2C2C] hover:text-[#FF8C00]'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.label}
                {currentPage === item.page && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF8C00]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <motion.button
              className="text-[#2C2C2C] hover:text-[#FF8C00] transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => navigateTo('cart')}
              className="relative text-[#2C2C2C] hover:text-[#FF8C00] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-[#FF8C00] text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#2C2C2C]"
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.page}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigateTo(item.page)}
                  className={`block w-full text-left py-2 transition-colors ${
                    currentPage === item.page
                      ? 'text-[#FF8C00]'
                      : 'text-[#2C2C2C]'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}