import * as React from 'react';
import { useEffect, useState } from 'react';
import { Product } from '../App';
import { motion } from 'motion/react';
import { Minus, Plus, ShoppingCart, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type ProductPageProps = {
  productId: string;
  addToCart: (productId: string, quantity: number, size: string) => void;
  navigateToProduct: (productId: string) => void;
};

export function ProductPage({ productId, addToCart }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  console.log('🧩 ProductPage productId =', productId);

  useEffect(() => {
    if (!productId) return;

    fetch('https://africanstyle-tn-2.onrender.com/api/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        console.log('🧩 Products from API =', data);
        const found = data.find((p: any) => p._id === productId) || null;
        console.log('🧩 Found product =', found);
        setProduct(found);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setProduct(null);
      });
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  // 🔹 On choisit une image si dispo (sinon undefined → pas d’affichage)
  const mainImage =
    (product.images && product.images.length > 0 && product.images[0]) ||
    product.image ||
    '';

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product._id, quantity, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleOrderDirectly = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    const message = `Hello! I'm interested in ordering:\n\nProduct: ${product.name}\nSize: ${selectedSize}\nQuantity: ${quantity}\nPrice: $${(product.price * quantity).toFixed(2)}`;
    window.open(`https://wa.me/21600000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ✅ Colonne image (si disponible) */}
        <div>
  {mainImage ? (
    <div className="w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-6 max-h-[600px]">
      <ImageWithFallback
        src={mainImage}
        alt={product.name}
        className="w-full h-full object-contain block"
      />
    </div>
  ) : (
    <div className="w-full aspect-[3/4] bg-gray-100 rounded-xl mb-6 flex items-center justify-center text-gray-400 text-sm">
      No image available yet
    </div>
  )}
</div>

        {/* ✅ Colonne infos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex gap-2 mb-4">
            {product.isNew && (
              <span className="bg-[#FF8C00] text-white px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-[#009E60] text-white px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                Best Seller
              </span>
            )}
          </div>

          <h1 className="mb-4 text-[#2C2C2C] text-3xl font-semibold">
            {product.name}
          </h1>

          <p className="text-[#FF8C00] mb-4 text-2xl font-semibold">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <label className="block mb-3 text-[#2C2C2C] font-medium">
                Select Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg border-2 text-sm transition-all ${
                      selectedSize === size
                        ? 'border-[#FF8C00] bg-[#FF8C00] text-white'
                        : 'border-gray-300 text-[#2C2C2C] hover:border-[#FF8C00]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-8">
            <label className="block mb-3 text-[#2C2C2C] font-medium">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-[#FF8C00] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-[#FF8C00] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#FF8C00] text-white px-8 py-4 rounded-lg hover:bg-[#FF8C00]/90 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button
              onClick={handleOrderDirectly}
              className="w-full bg-[#009E60] text-white px-8 py-4 rounded-lg hover:bg-[#009E60]/90 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Order Directly via WhatsApp
            </button>
          </div>

          {/* Détails simples */}
          <div className="border-t border-gray-200 pt-6 space-y-2 text-gray-600 text-sm">
            <p>
              <span className="text-[#2C2C2C] font-medium">Category:</span>{' '}
              {product.category}
            </p>
            {product.fabric && (
              <p>
                <span className="text-[#2C2C2C] font-medium">Fabric:</span>{' '}
                {product.fabric}
              </p>
            )}
            {product.origin && (
              <p>
                <span className="text-[#2C2C2C] font-medium">Origin:</span>{' '}
                {product.origin}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
