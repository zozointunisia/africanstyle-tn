import React from "react";
import { useState, useEffect } from 'react';
// ...existing code...
import { motion } from 'motion/react';
import { Minus, Plus, Trash2, ShoppingBag, Package, MapPin } from 'lucide-react';
import { CartItem, Product } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

type CartPageProps = {
  cart: CartItem[];
  updateCartItemQuantity: (productId: number, size: string, quantity: number) => void;
  removeFromCart: (productId: number, size: string) => void;
  navigateToProduct: (productId: number) => void;
};

export function CartPage({
  cart,
  updateCartItemQuantity,
  removeFromCart,
  navigateToProduct,
}: CartPageProps) {
  const [orderStep, setOrderStep] = React.useState('cart');
  const [orderNumber, setOrderNumber] = useState('');
  const [orderData, setOrderData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'home',
    notes: '',
  });

  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  useEffect(() => {
    fetch('https://africanstyle-tn-2.onrender.com/api/cart')
      .then(res => res.json())
      .then(data => {
        // Merge product details into each cart item
        import('../data/products').then(module => {
          const products = module.products;
          const merged = data.map((item: any) => ({
            ...item,
            product: products.find((p: any) => p.id === item.productId)
          }));
          setCartItems(merged);
        });
      });
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const shippingFee = subtotal >= 150 ? 0 : 10;
  const total = subtotal + shippingFee;

  const handleOrderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate order number
    const orderId = `AS${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderId);

    // Create order summary
    const orderSummary = `
ORDER CONFIRMATION - AfricanStyle TN
Order Number: ${orderId}

CUSTOMER INFORMATION:
Name: ${orderData.firstName} ${orderData.lastName}
Email: ${orderData.email}
Phone: ${orderData.phone}

DELIVERY ADDRESS:
${orderData.address}
${orderData.city}, ${orderData.postalCode}
Delivery Method: ${orderData.deliveryMethod === 'home' ? 'Home Delivery' : 'Pickup Point'}

${orderData.notes ? `Special Notes: ${orderData.notes}\n` : ''}
ORDER ITEMS:
${cartItems
  .map(
    (item) =>
      `- ${item.product.name} (Size: ${item.size}) x${item.quantity} - $${(
        item.product.price * item.quantity
      ).toFixed(2)}`
  )
  .join('\n')}

SUMMARY:
Subtotal: $${subtotal.toFixed(2)}
Shipping: ${shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
Total: $${total.toFixed(2)}

Thank you for your order!
    `;

    // Prepare order data for backend
    const orderPayload = {
      customer: {
        name: `${orderData.firstName} ${orderData.lastName}`,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        city: orderData.city,
        postalCode: orderData.postalCode,
        deliveryMethod: orderData.deliveryMethod,
        notes: orderData.notes
      },
      items: cartItems.map(item => ({
        productId: item.productId,
        name: item.product.name,
        size: item.size,
        quantity: item.quantity,
        price: item.product.price
      })),
      total
    };
    fetch('https://africanstyle-tn-2.onrender.com/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || 'Order creation failed');
        }
        return res.json();
      })
      .then(order => {
        setOrderNumber(`AS${order._id || order.id}`);
        setOrderStep('confirmation');
      })
      .catch(err => {
        alert('Order failed: ' + err.message);
      });

    // ...existing code... (removed WhatsApp redirect)
  };

  if (orderStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto px-4"
        >
          <div className="bg-white p-12 rounded-xl shadow-sm text-center">
            <div className="w-20 h-20 rounded-full bg-[#009E60]/10 flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-[#009E60]" />
            </div>
            <h1 className="mb-4 text-[#2C2C2C]">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6 text-lg">
              Thank you for your order. Your order has been received and is being processed.
            </p>
            <div className="bg-[#F5F5F5] p-6 rounded-lg mb-8">
              <p className="text-gray-600 mb-2">Your Order Number</p>
              <p className="text-[#FF8C00]">{orderNumber}</p>
            </div>
            <p className="text-gray-600 mb-8">
              We'll contact you shortly to confirm your order and arrange delivery.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#FF8C00] text-white px-8 py-4 rounded-lg hover:bg-[#FF8C00]/90 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <ShoppingBag className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h2 className="mb-4 text-[#2C2C2C]">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Start adding some beautiful African pieces!</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#FF8C00] text-white px-8 py-4 rounded-lg hover:bg-[#FF8C00]/90 transition-colors"
          >
            Browse Catalog
          </button>
        </motion.div>
      </div>
    );
  }

  if (orderStep === 'checkout') {
    return (
      <div className="min-h-screen bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => setOrderStep('cart')}
              className="text-[#FF8C00] mb-8 hover:underline"
            >
              ← Back to Cart
            </button>

            <h1 className="mb-8 text-[#2C2C2C]">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleCheckout} className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="mb-6 text-[#2C2C2C]">Delivery Information</h2>

                  {/* Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block mb-2 text-[#2C2C2C]">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={orderData.firstName}
                        onChange={handleOrderChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF8C00] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block mb-2 text-[#2C2C2C]">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={orderData.lastName}
                        onChange={handleOrderChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF8C00] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="email" className="block mb-2 text-[#2C2C2C]">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={orderData.email}
                        onChange={handleOrderChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF8C00] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-[#2C2C2C]">Phone *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={orderData.phone}
                        onChange={handleOrderChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF8C00] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-6">
                    <label htmlFor="address" className="block mb-2 text-[#2C2C2C]">Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={orderData.address}
                      onChange={handleOrderChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF8C00] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="city" className="block mb-2 text-[#2C2C2C]">City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={orderData.city}
                        onChange={handleOrderChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF8C00] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block mb-2 text-[#2C2C2C]">Postal Code *</label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={orderData.postalCode}
                        onChange={handleOrderChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF8C00] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Delivery Method */}
                  <div className="mb-6">
                    <label className="block mb-3 text-[#2C2C2C]">Delivery Method *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setOrderData({ ...orderData, deliveryMethod: 'home' })}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${orderData.deliveryMethod === 'home' ? 'border-[#FF8C00] bg-[#FF8C00]/5' : 'border-gray-300 hover:border-[#FF8C00]'}`}
                      >
                        Home Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderData({ ...orderData, deliveryMethod: 'pickup' })}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${orderData.deliveryMethod === 'pickup' ? 'border-[#FF8C00] bg-[#FF8C00]/5' : 'border-gray-300 hover:border-[#FF8C00]'}`}
                      >
                        Pickup Point
                      </button>
                    </div>
                  </div>

                  {/* Special Notes */}
                  <div className="mb-6">
                    <label htmlFor="notes" className="block mb-2 text-[#2C2C2C]">Special Notes (Optional)</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={orderData.notes}
                      onChange={handleOrderChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF8C00] focus:outline-none resize-none"
                      placeholder="Any special requests or delivery instructions..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#009E60] text-white px-8 py-4 rounded-lg hover:bg-[#009E60]/90 transition-colors"
                  >
                    Finalize Order
                  </button>
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                  <h3 className="mb-4 text-[#2C2C2C]">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                      <div key={`${item.productId}-${item.size}`} className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <ImageWithFallback
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#2C2C2C] line-clamp-1">{item.product.name}</p>
                          <p className="text-gray-600">
                            Size: {item.size} × {item.quantity}
                          </p>
                          <p className="text-[#FF8C00]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-[#2C2C2C] pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span className="text-[#FF8C00]">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {subtotal < 150 && (
                    <div className="mt-4 p-3 bg-[#009E60]/10 rounded-lg">
                      <p className="text-[#009E60]">
                        Add ${(150 - subtotal).toFixed(2)} more for free shipping!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-8 text-[#2C2C2C]">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="flex gap-6">
                    <button
                      onClick={() => navigateToProduct(item.productId)}
                      className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
                    >
                      <ImageWithFallback
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </button>

                    <div className="flex-1 min-w-0">
                      <button
                        onClick={() => navigateToProduct(item.productId)}
                        className="text-[#2C2C2C] mb-2 hover:text-[#FF8C00] transition-colors text-left"
                      >
                        {item.product.name}
                      </button>
                      <p className="text-gray-600 mb-4">Size: {item.size}</p>
                      <p className="text-[#FF8C00] mb-4">
                        ${item.product.price.toFixed(2)}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateCartItemQuantity(
                                item.productId,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="w-8 h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-[#FF8C00] transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateCartItemQuantity(
                                item.productId,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="w-8 h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-[#FF8C00] transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId, item.size)}
                          className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                <h3 className="mb-6 text-[#2C2C2C]">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-[#2C2C2C] pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-[#FF8C00]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {subtotal < 150 && (
                  <div className="mb-6 p-3 bg-[#009E60]/10 rounded-lg">
                    <p className="text-[#009E60]">
                      Add ${(150 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setOrderStep('checkout')}
                  className="w-full bg-[#FF8C00] text-white px-8 py-4 rounded-lg hover:bg-[#FF8C00]/90 transition-colors mb-3"
                >
                  Proceed to Checkout
                </button>

                <div className="text-gray-600 space-y-2 pt-4 border-t border-gray-200">
                  <p className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Free shipping over $150
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Delivery in 5-7 days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
