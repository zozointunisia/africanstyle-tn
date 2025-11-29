import React from "react";
import { motion } from "motion/react";
import { Minus, Plus, Trash2, ShoppingBag, Package, MapPin } from "lucide-react";
import { CartItem } from "../App";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type CartPageProps = {
  cart: CartItem[];
  updateCartItemQuantity: (productId: string, size: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  navigateToProduct: (productId: string) => void;
};

export function CartPage({
  cart,
  updateCartItemQuantity,
  removeFromCart,
  navigateToProduct,
}: CartPageProps) {

  const subtotal = cart.reduce(
    (total, item) =>
      item.product ? total + item.product.price * item.quantity : total,
    0
  );
  const shippingFee = subtotal >= 150 ? 0 : 10;
  const total = subtotal + shippingFee;

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
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) =>
                item.product ? (
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
                          src={
                            (item.product.images && item.product.images[0]) ||
                            (item.product.image as string) ||
                            ""
                          }
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
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
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
                            onClick={() =>
                              removeFromCart(item.productId, item.size)
                            }
                            className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>

            {/* Résumé */}
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
                    <span>
                      {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#2C2C2C] pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-[#FF8C00]">
                      ${total.toFixed(2)}
                    </span>
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
