import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { ProductPage } from './components/ProductPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { CartPage } from './components/CartPage';
import { products } from './data/products';

export type CartItem = {
  productId: number;
  quantity: number;
  size: string;
  product: Product;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[];
  description: string;
  sizes: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  fabric: string;
  origin: string;
  culturalInspiration: string;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('africanstyle-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('africanstyle-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId: number, quantity: number, size: string) => {
    fetch('https://africanstyle-tn-2.onrender.com/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    })
      .then(res => res.json())
      .then(data => {
        // Optionally update local cart state if needed
      });
  };

  const updateCartItemQuantity = (productId: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    fetch('https://africanstyle-tn-2.onrender.com/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    })
      .then(res => res.json())
      .then(data => {
        // Optionally update local cart state if needed
      });
  };

  const removeFromCart = (productId: number, size: string) => {
    fetch(`https://africanstyle-tn-2.onrender.com/api/cart/${productId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        // Optionally update local cart state if needed
      });
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navigateToProduct = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
    window.scrollTo(0, 0);
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} navigateToProduct={navigateToProduct} />;
      case 'catalog':
        return <CatalogPage navigateToProduct={navigateToProduct} />;
      case 'product':
        return (
          <ProductPage
            productId={selectedProductId!}
            addToCart={addToCart}
            navigateToProduct={navigateToProduct}
          />
        );
      case 'about':
        return <AboutPage navigateTo={navigateTo} />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return (
          <CartPage
            cart={cart}
            updateCartItemQuantity={updateCartItemQuantity}
            removeFromCart={removeFromCart}
            navigateToProduct={navigateToProduct}
          />
        );
      default:
        return <HomePage navigateTo={navigateTo} navigateToProduct={navigateToProduct} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        currentPage={currentPage}
        navigateTo={navigateTo}
        cartItemCount={cartItemCount}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer navigateTo={navigateTo} />
    </div>
  );
}
