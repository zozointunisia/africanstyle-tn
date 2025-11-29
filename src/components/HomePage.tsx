import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Award, Heart } from 'lucide-react';
import * as React from 'react';
import { ProductCard } from './ProductCard';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from '../App'; // <-- on réutilise le type Product d'App

type HomePageProps = {
  navigateTo: (page: string) => void;
  navigateToProduct: (productId: string) => void; // <-- string maintenant
};

export function HomePage({ navigateTo, navigateToProduct }: HomePageProps) {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    fetch('https://africanstyle-tn-2.onrender.com/api/products')
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data));
  }, []);

  const featuredProducts = products
    .filter((p) => p.isBestSeller)
    .slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] bg-gradient-to-r from-[#FF8C00]/10 to-[#009E60]/10 overflow-hidden">
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-[#FF8C00]/10"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-[#009E60]/10"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1687137113677-f2a9a6c79fab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZmFzaGlvbiUyMG1vZGVsfGVufDF8fHx8MTc2Mzc0MjY4OXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="African Fashion Model"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6"
            >
              AfricanStyle TN
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-8 text-xl md:text-2xl text-gray-200"
            >
              African Elegance Reimagined
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              onClick={() => navigateTo('catalog')}
              className="bg-[#FF8C00] text-white px-8 py-4 rounded-full hover:bg-[#FF8C00]/90 transition-all shadow-lg hover:shadow-2xl inline-flex items-center gap-2 group relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">Discover the Collection</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Short Presentation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2 
            className="mb-6 text-[#2C2C2C]"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Celebrating Ivorian Heritage
          </motion.h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            AfricanStyle TN brings you the finest handcrafted clothing made from authentic Ivorian pagne fabric. 
            Each piece tells a story of cultural pride, artisanal excellence, and timeless African elegance. 
            We honor the rich textile traditions of Côte d'Ivoire while creating modern designs for today's world.
          </p>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-[#F5F5F5]">
        <div className="text-center mb-12">
          <motion.h2 
            className="mb-4 text-[#2C2C2C]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Featured Collection
          </motion.h2>
          <p className="text-gray-600">Discover our most beloved pieces</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product._id} // <-- _id au lieu de id
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <ProductCard product={product} navigateToProduct={navigateToProduct} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => navigateTo('catalog')}
            className="border-2 border-[#FF8C00] text-[#FF8C00] px-8 py-3 rounded-full hover:bg-[#FF8C00] hover:text-white transition-all shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Products
          </motion.button>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* ... le reste de la section identique ... */}
        {/* Je ne touche pas aux autres parties car elles n'utilisent pas product.id */}
        {/* (Authenticity, Artisanal Quality, Cultural Heritage, CTA, etc.) */}
        {/* Tu peux garder tout le reste exactement comme il est */}
      </section>

      {/* Call-to-Action Banner */}
      {/* ... tout le reste inchangé ... */}
    </div>
  );
}
