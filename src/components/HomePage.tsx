import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Award, Heart } from 'lucide-react';
// import { products } from '../data/products';
import * as React from 'react';
import { ProductCard } from './ProductCard';
import { ImageWithFallback } from './figma/ImageWithFallback';

type HomePageProps = {
  navigateTo: (page: string) => void;
  navigateToProduct: (productId: number) => void;
};

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[];
  isBestSeller?: boolean;
  description: string;
  sizes: string[];
  fabric: string;
  origin: string;
  culturalInspiration: string;
  [key: string]: any;
};

export function HomePage({ navigateTo, navigateToProduct }: HomePageProps) {
  const [products, setProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const featuredProducts = products.filter((p) => p.isBestSeller).slice(0, 6);

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
              key={product.id}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center p-8 rounded-xl bg-white shadow-sm hover:shadow-2xl transition-all"
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <motion.div 
              className="w-16 h-16 rounded-full bg-[#FF8C00]/10 flex items-center justify-center mx-auto mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-8 h-8 text-[#FF8C00]" />
            </motion.div>
            <h3 className="mb-3 text-[#2C2C2C]">Authenticity</h3>
            <p className="text-gray-600">
              Every piece is crafted from genuine Ivorian pagne fabric, preserving centuries-old traditions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center p-8 rounded-xl bg-white shadow-sm hover:shadow-2xl transition-all"
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <motion.div 
              className="w-16 h-16 rounded-full bg-[#009E60]/10 flex items-center justify-center mx-auto mb-4"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Award className="w-8 h-8 text-[#009E60]" />
            </motion.div>
            <h3 className="mb-3 text-[#2C2C2C]">Artisanal Quality</h3>
            <p className="text-gray-600">
              Handcrafted by skilled artisans who bring decades of expertise to every stitch.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center p-8 rounded-xl bg-white shadow-sm hover:shadow-2xl transition-all"
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <motion.div 
              className="w-16 h-16 rounded-full bg-[#FF8C00]/10 flex items-center justify-center mx-auto mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Heart className="w-8 h-8 text-[#FF8C00]" />
            </motion.div>
            <h3 className="mb-3 text-[#2C2C2C]">Cultural Heritage</h3>
            <p className="text-gray-600">
              We celebrate and promote African culture through every design, honoring our roots.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="bg-gradient-to-r from-[#009E60] to-[#009E60]/80 py-16 mt-20 relative overflow-hidden">
        {/* Floating decorative circles */}
        <motion.div
          className="absolute top-10 left-20 w-24 h-24 rounded-full bg-white/10"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-32 w-16 h-16 rounded-full bg-white/10"
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="mb-4 text-white"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Ready to Embrace African Elegance?
            </motion.h2>
            <p className="text-white/90 mb-8 text-lg">
              Explore our full collection of handcrafted pagne clothing
            </p>
            <motion.button
              onClick={() => navigateTo('catalog')}
              className="bg-white text-[#009E60] px-8 py-4 rounded-full hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl inline-flex items-center gap-2"
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              Visit Our Catalog
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}