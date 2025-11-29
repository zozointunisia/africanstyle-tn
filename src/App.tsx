import { useState } from 'react';
import './index.css';

import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { ProductPage } from './components/ProductPage';
import { CartPage } from './components/CartPage';

// ----------------------
// TYPES
// ----------------------
export type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  sizes: string[];
  fabric?: string;
  origin?: string;
  culturalInspiration?: string;
  image?: string;
  images?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
};

export type CartItem = {
  productId: string;
  size: string;
  quantity: number;
};

// ----------------------
// APP
// ----------------------
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);

  // ----------------------
  //   NAVIGATION
  // ----------------------
  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
  };

  // ----------------------
  //   CART FUNCTIONS
  // ----------------------
  const addToCart = (productId: string, quantity: number, size: string) => {
    if (!size) return;

    setCart(prev => {
      const existing = prev.find(
        item => item.productId === productId && item.size === size
      );

      if (existing) {
        return prev.map(item =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { productId, size, quantity }];
    });
  };

  const updateCartItemQuantity = (
    productId: string,
    size: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      return removeFromCart(productId, size);
    }

    setCart(prev =>
      prev.map(item =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev =>
      prev.filter(item => !(item.productId === productId && item.size === size))
    );
  };

  // ----------------------
  //   RENDER PAGES
  // ----------------------
  return (
    <div>
      {currentPage === 'home' && (
        <HomePage navigateTo={navigateTo} navigateToProduct={navigateToProduct} />
      )}

      {currentPage === 'catalog' && (
        <CatalogPage navigateToProduct={navigateToProduct} />
      )}

      {currentPage === 'product' && selectedProductId && (
        <ProductPage
          productId={selectedProductId}
          addToCart={addToCart}
          navigateToProduct={navigateToProduct}
        />
      )}

      {currentPage === 'cart' && (
        <CartPage
          cart={cart}
          updateCartItemQuantity={updateCartItemQuantity}
          removeFromCart={removeFromCart}
          navigateToProduct={navigateToProduct}
        />
      )}

      {/* HEADER */}
      <header className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white shadow-xl rounded-full px-6 py-3 flex gap-6 items-center">
          <button onClick={() => navigateTo('home')}>Home</button>
          <button onClick={() => navigateTo('catalog')}>Catalog</button>
          <button onClick={() => navigateTo('cart')}>
            Cart ({cart.length})
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
