import { useState, useEffect } from 'react';
import { Product } from '../App';
import * as React from 'react';
import { motion } from 'motion/react';
import { Minus, Plus, ShoppingCart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
// import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { ImageWithFallback } from './figma/ImageWithFallback';

type ProductPageProps = {
  productId: number;
  addToCart: (productId: number, quantity: number, size: string) => void;
  navigateToProduct: (productId: number) => void;
};

export function ProductPage({ productId, addToCart, navigateToProduct }: ProductPageProps) {
  const [product, setProduct] = React.useState<Product | null>(null);
  useEffect(() => {
      // ...existing code...
    fetch(`http://localhost:4000/api/products`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: Product) => p.id === productId);
        setProduct(found || null);
      });
  }, [productId]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product.id, quantity, selectedSize);
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

  const [similarProducts, setSimilarProducts] = React.useState([]);
  useEffect(() => {
    if (product) {
      fetch(`http://localhost:4000/api/products`)
        .then(res => res.json())
        .then(data => {
          setSimilarProducts(
            data.filter((p: Product) => p.category === product.category && p.id !== product.id).slice(0, 3)
          );
        });
    }
  }, [product]);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-4"
            >
              <ImageWithFallback
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#2C2C2C]" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-[#2C2C2C]" />
                  </button>
                </>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-[#FF8C00] scale-95'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex gap-2 mb-4">
              {product.isNew && (
                <span className="bg-[#FF8C00] text-white px-3 py-1 rounded-full">New</span>
              )}
              {product.isBestSeller && (
                <span className="bg-[#009E60] text-white px-3 py-1 rounded-full">
                  Best Seller
                </span>
              )}
            </div>

            <h1 className="mb-4 text-[#2C2C2C]">{product.name}</h1>
            <p className="text-[#FF8C00] mb-6">${product.price.toFixed(2)}</p>
            
            <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="block mb-3 text-[#2C2C2C]">
                Select Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
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

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block mb-3 text-[#2C2C2C]">
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

            {/* Action Buttons */}
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

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6 space-y-3 text-gray-600">
              <p>
                <span className="text-[#2C2C2C]">Fabric:</span> {product.fabric}
              </p>
              <p>
                <span className="text-[#2C2C2C]">Origin:</span> {product.origin}
              </p>
              <p>
                <span className="text-[#2C2C2C]">Category:</span> {product.category}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Additional Information Tabs */}
        <div className="mb-20">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-8">
              {['description', 'size-guide', 'care', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 border-b-2 transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-[#FF8C00] text-[#FF8C00]'
                      : 'border-transparent text-gray-600 hover:text-[#2C2C2C]'
                  }`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h3 className="text-[#2C2C2C]">Cultural Inspiration</h3>
                <p className="text-gray-600 leading-relaxed">{product.culturalInspiration}</p>
              </div>
            )}

            {activeTab === 'size-guide' && (
              <div className="space-y-4">
                <h3 className="text-[#2C2C2C]">Size Guide</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-[#F5F5F5]">
                      <tr>
                        <th className="px-4 py-3">Size</th>
                        <th className="px-4 py-3">Bust (cm)</th>
                        <th className="px-4 py-3">Waist (cm)</th>
                        <th className="px-4 py-3">Hips (cm)</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b">
                        <td className="px-4 py-3">S</td>
                        <td className="px-4 py-3">84-88</td>
                        <td className="px-4 py-3">64-68</td>
                        <td className="px-4 py-3">90-94</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3">M</td>
                        <td className="px-4 py-3">88-92</td>
                        <td className="px-4 py-3">68-72</td>
                        <td className="px-4 py-3">94-98</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3">L</td>
                        <td className="px-4 py-3">92-96</td>
                        <td className="px-4 py-3">72-76</td>
                        <td className="px-4 py-3">98-102</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3">XL</td>
                        <td className="px-4 py-3">96-100</td>
                        <td className="px-4 py-3">76-80</td>
                        <td className="px-4 py-3">102-106</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">XXL</td>
                        <td className="px-4 py-3">100-104</td>
                        <td className="px-4 py-3">80-84</td>
                        <td className="px-4 py-3">106-110</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4">
                <h3 className="text-[#2C2C2C]">Care Instructions</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Hand wash or machine wash on gentle cycle in cold water</li>
                  <li>• Use mild detergent suitable for delicate fabrics</li>
                  <li>• Do not bleach to preserve the vibrant colors</li>
                  <li>• Lay flat or hang to dry away from direct sunlight</li>
                  <li>• Iron on low to medium heat while slightly damp</li>
                  <li>• Store in a cool, dry place</li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <h3 className="text-[#2C2C2C]">Shipping Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Free shipping on orders over $150</li>
                  <li>• Standard delivery: 5-7 business days within Tunisia</li>
                  <li>• International shipping available (10-15 business days)</li>
                  <li>• Express shipping option available at checkout</li>
                  <li>• All items are carefully packaged to ensure safe delivery</li>
                  <li>• Track your order with the provided tracking number</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h2 className="mb-8 text-[#2C2C2C]">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProducts.map((similarProduct) => (
                <ProductCard
                  key={similarProduct.id}
                  product={similarProduct}
                  navigateToProduct={navigateToProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
