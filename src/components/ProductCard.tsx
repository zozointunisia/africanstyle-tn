import { motion } from 'motion/react';
import { Product } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

type ProductCardProps = {
  product: Product;
  navigateToProduct: (productId: number) => void;
};

export function ProductCard({ product, navigateToProduct }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow cursor-pointer group relative"
      onClick={() => navigateToProduct(product.id)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.6 }}
        >
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <motion.span 
              className="bg-[#FF8C00] text-white px-3 py-1 rounded-full shadow-lg"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
            >
              New
            </motion.span>
          )}
          {product.isBestSeller && (
            <motion.span 
              className="bg-[#009E60] text-white px-3 py-1 rounded-full shadow-lg"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
            >
              Best Seller
            </motion.span>
          )}
        </div>

        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6"
        >
          <motion.button 
            className="bg-white text-[#2C2C2C] px-6 py-3 rounded-full shadow-xl"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ scale: 1.1, y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            View Details
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        className="p-5"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
      >
        <h3 className="mb-2 text-[#2C2C2C] line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{product.category}</p>
        <motion.p 
          className="text-[#FF8C00]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ${product.price.toFixed(2)}
        </motion.p>
      </motion.div>
      
      {/* Subtle shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8 }}
        style={{ pointerEvents: "none" }}
      />
    </motion.div>
  );
}