import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

type FooterProps = {
  navigateTo: (page: string) => void;
};

export function Footer({ navigateTo }: FooterProps) {
  return (
    <footer className="bg-[#2C2C2C] text-white mt-20 relative overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-10 right-20 w-32 h-32 rounded-full bg-[#FF8C00]/5"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-32 w-24 h-24 rounded-full bg-[#009E60]/5"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div 
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF8C00] via-[#009E60] to-[#FF8C00] flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-white">AS</span>
              </motion.div>
              <span>AfricanStyle TN</span>
            </div>
            <p className="text-gray-400">
              Authentic African elegance crafted from Ivorian pagne fabric.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <motion.button
                  onClick={() => navigateTo('home')}
                  className="text-gray-400 hover:text-[#FF8C00] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Home
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => navigateTo('catalog')}
                  className="text-gray-400 hover:text-[#FF8C00] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Catalog
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => navigateTo('about')}
                  className="text-gray-400 hover:text-[#FF8C00] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  About Us
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => navigateTo('contact')}
                  className="text-gray-400 hover:text-[#FF8C00] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Contact
                </motion.button>
              </li>
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-400">
              <motion.li whileHover={{ x: 5 }} className="cursor-pointer hover:text-white transition-colors">Size Guide</motion.li>
              <motion.li whileHover={{ x: 5 }} className="cursor-pointer hover:text-white transition-colors">Shipping Information</motion.li>
              <motion.li whileHover={{ x: 5 }} className="cursor-pointer hover:text-white transition-colors">Returns & Exchanges</motion.li>
              <motion.li whileHover={{ x: 5 }} className="cursor-pointer hover:text-white transition-colors">Care Instructions</motion.li>
              <motion.li whileHover={{ x: 5 }} className="cursor-pointer hover:text-white transition-colors">FAQ</motion.li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Tunis, Tunisia</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+216 XX XXX XXX</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>info@africanstyletn.com</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <motion.button 
                className="text-gray-400 hover:text-[#FF8C00] transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.button>
              <motion.button 
                className="text-gray-400 hover:text-[#FF8C00] transition-colors"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.button>
              <motion.button 
                className="text-gray-400 hover:text-[#FF8C00] transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>&copy; 2025 AfricanStyle TN. All rights reserved. Crafted with love and tradition.</p>
        </motion.div>
      </div>
    </footer>
  );
}