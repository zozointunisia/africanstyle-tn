import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { ProductPage } from './components/ProductPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { CartPage } from './components/CartPage';

// 🔹 Type produit (API Mongo)
export type Product = {
  _id?: string;           // id Mongo (backend)
  id?: number;            // ancien id numérique (si jamais)
  name: string;
  price: number;
  category: string;
  description: string;
  sizes: string[];
  images?: string[];
  image?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  fabric?: string;
  origin?: string;
  culturalInspiration?: string;
};

// 🔹 Type item de panier
export type CartItem = {
  productId: string;   // _id du produit
  quantity: number;
  size: string;
  product?: Product;   // optionnel, on ne l’utilise pas partout
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 🔹 Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('africanstyle-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }
  }, []);

  // 🔹 Sauvegarder le panier à chaque changement
  useEffect(() => {
    localStorage.setItem('africanstyle-cart', JSON.stringify(cart));
  }, [cart]);

  // 🔹 Ajouter au panier (frontend + backend)
  const addToCart = (productId: string, quantity: number, size: string) => {
    // 1) Mettre à jour le panier en local (pour le badge + état vide/pas vide)
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

      // on ne connaît pas le détail du product ici, donc on laisse product?: undefined
      return [...prev, { productId, quantity, size }];
    });

    // 2) Envoyer aussi au backend
    fetch('https://africanstyle-tn-2.onrender.com/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity, size }),
    }).catch(err => {
      console.error('Error saving cart to backend:', err);
      // optionnel : afficher un toast / alert si tu veux
    });
  };

  // 🔹 Modifier la quantité d’un article dans le panier
  const updateCartItemQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );

    // Optionnel : tu peux appeler un endpoint PUT/PATCH côté backend
    fetch('https://africanstyle-tn-2.onrender.com/api/cart', {
      method: 'POST', // à adapter si tu as un endpoint spécifique
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity, size }),
    }).catch(err => console.error('Error updating cart:', err));
  };

  // 🔹 Retirer un article du panier
  const removeFromCart = (productId: string, size: string) => {
    setCart(prev =>
      prev.filter(item => !(item.productId === productId && item.size === size))
    );

    // Optionnel : backend DELETE
    fetch(`https://africanstyle-tn-2.onrender.com/api/cart/${productId}`, {
      method: 'DELETE',
    }).catch(err => console.error('Error deleting from cart:', err));
  };

  // 🔹 Nombre total d’articles (pour le header)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // 🔹 Navigation vers une page produit
  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
    window.scrollTo(0, 0);
  };

  // 🔹 Changer de page simple
  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            navigateTo={navigateTo}
            navigateToProduct={navigateToProduct}
          />
        );
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
        return (
          <HomePage
            navigateTo={navigateTo}
            navigateToProduct={navigateToProduct}
          />
        );
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
      <main className="flex-1">{renderPage()}</main>
      <Footer navigateTo={navigateTo} />
    </div>
  );
}
