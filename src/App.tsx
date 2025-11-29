import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { ProductPage } from './components/ProductPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { CartPage } from './components/CartPage';
// import { products } from './data/products'; // plus utile si tu utilises l'API

export type Product = {
  _id: string;              // vient de MongoDB
  // id?: number;           // optionnel si tu gardes encore des données locales
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

export type CartItem = {
  productId: string;
  quantity: number;
  size: string;
  product: Product;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
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

  const addToCart = (productId: string, quantity: number, size: string) => {
    fetch('https://africanstyle-tn-2.onrender.com/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity, size })
    })
      .then(res => res.json())
      .then(data => {
        // Tu peux ici mettre à jour le state cart si ton API renvoie le panier
      });
  };

  const updateCartItemQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    fetch('https://africanstyle-tn-2.onrender.com/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity, size })
    })
      .then(res => res.json())
      .then(data => {
        // Optionnel : mettre à jour le panier local
      });
  };

  const removeFromCart = (productId: string, size: string) => {
    fetch(`https://africanstyle-tn-2.onrender.com/api/cart/${productId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        // Optionnel : mettre à jour le panier local
      });
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navigateToProduct = (productId: string) => {
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
          selectedProductId && (
            <ProductPage
              productId={selectedProductId}
              addToCart={addToCart}
              navigateToProduct={navigateToProduct}
            />
          )
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
