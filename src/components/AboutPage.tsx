import { motion } from 'motion/react';
import { ArrowRight, Target, Users, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type AboutPageProps = {
  navigateTo: (page: string) => void;
};

export function AboutPage({ navigateTo }: AboutPageProps) {
  const milestones = [
    { year: '2020', event: 'AfricanStyle TN was founded with a vision to celebrate Ivorian heritage' },
    { year: '2021', event: 'Launched our first collection featuring authentic pagne designs' },
    { year: '2022', event: 'Partnered with artisans in Côte d\'Ivoire for direct fabric sourcing' },
    { year: '2023', event: 'Expanded internationally and opened our first workshop' },
    { year: '2024', event: 'Reached 10,000+ satisfied customers worldwide' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-[#FF8C00]/20 to-[#009E60]/20 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759960034333-298883b34d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwd29ya3Nob3AlMjBzZXdpbmd8ZW58MXx8fHwxNzYzNzQyNjkxfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Artisan Workshop"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="mb-6 text-white">Our Story</h1>
            <p className="text-xl text-gray-100">
              Weaving tradition and modernity to celebrate African elegance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-[#2C2C2C]">Born from Passion, Crafted with Love</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                AfricanStyle TN was born from a deep love for African culture and a desire to share 
                the beauty of Ivorian pagne fabric with the world. Our founder, raised between Tunisia 
                and Côte d'Ivoire, witnessed firsthand the incredible artistry and tradition embedded 
                in every piece of pagne cloth.
              </p>
              <p>
                What started as a small collection has grown into a movement celebrating African heritage 
                through fashion. We work directly with master artisans in Côte d'Ivoire, ensuring that 
                every piece we create honors traditional techniques while embracing contemporary design.
              </p>
              <p>
                Each garment tells a story—of skilled hands that wove the fabric, of patterns passed down 
                through generations, and of a culture rich in color, meaning, and beauty. When you wear 
                AfricanStyle TN, you're not just wearing clothing; you're carrying forward a legacy.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] rounded-xl overflow-hidden"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1566819089778-333539a94029?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcGFnbmUlMjBmYWJyaWN8ZW58MXx8fHwxNzYzNzQyNjkwfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="African Pagne Fabric"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#F5F5F5] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-[#2C2C2C]">Our Core Values</h2>
            <p className="text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#FF8C00]/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#FF8C00]" />
              </div>
              <h3 className="mb-3 text-[#2C2C2C]">Authenticity</h3>
              <p className="text-gray-600">
                We source only genuine Ivorian pagne fabric and honor traditional techniques 
                in every piece we create.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white p-8 rounded-xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#009E60]/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#009E60]" />
              </div>
              <h3 className="mb-3 text-[#2C2C2C]">Community</h3>
              <p className="text-gray-600">
                We build lasting relationships with artisans, ensuring fair practices and 
                supporting local communities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white p-8 rounded-xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#FF8C00]/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-[#FF8C00]" />
              </div>
              <h3 className="mb-3 text-[#2C2C2C]">Excellence</h3>
              <p className="text-gray-600">
                From fabric selection to final stitching, we maintain the highest standards 
                of quality and craftsmanship.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#009E60]/10 to-[#009E60]/5 p-12 rounded-xl"
        >
          <h2 className="mb-6 text-[#2C2C2C] text-center">Our Mission</h2>
          <p className="text-center text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            To celebrate and preserve African cultural heritage through fashion, creating beautiful, 
            authentic pieces that connect people to the rich traditions of Côte d'Ivoire. We strive 
            to empower artisans, educate customers about the significance of pagne fabric, and make 
            African elegance accessible to the world—one garment at a time.
          </p>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="bg-[#F5F5F5] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-[#2C2C2C]">Our Journey</h2>
            <p className="text-gray-600">Milestones in our story</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex gap-8 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-20">
                  <div className="bg-[#FF8C00] text-white px-4 py-2 rounded-lg text-center">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl">
                  <p className="text-gray-600">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Photos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-[#2C2C2C]">Behind the Scenes</h2>
          <p className="text-gray-600">Where the magic happens</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-square rounded-xl overflow-hidden"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759960034333-298883b34d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwd29ya3Nob3AlMjBzZXdpbmd8ZW58MXx8fHwxNzYzNzQyNjkxfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Workshop"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="aspect-square rounded-xl overflow-hidden"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758633854855-3059c5b48674?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdGV4dGlsZSUyMHBhdHRlcm58ZW58MXx8fHwxNjM2OTYxMDEwfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Fabric Patterns"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="aspect-square rounded-xl overflow-hidden"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1605302596032-15e67c3cf66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBkcmVzc3xlbnwxfHx8fDE3NjM3NDI2ODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Traditional Dress"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-[#FF8C00] to-[#FF8C00]/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-white">Experience Our Creations</h2>
            <p className="text-white/90 mb-8 text-lg">
              Discover the beauty of authentic African elegance
            </p>
            <button
              onClick={() => navigateTo('catalog')}
              className="bg-white text-[#FF8C00] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              Explore Our Catalog
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
