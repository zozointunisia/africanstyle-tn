import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Product Question',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const mailtoLink = `mailto:info@africanstyletn.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'Product Question',
        message: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#FF8C00]/10 to-[#009E60]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4 text-[#2C2C2C]">Contact Us</h1>
            <p className="text-gray-600 text-lg">We're Here to Listen</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="mb-6 text-[#2C2C2C]">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block mb-2 text-[#2C2C2C]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF8C00] focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-[#2C2C2C]">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF8C00] focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block mb-2 text-[#2C2C2C]">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF8C00] focus:outline-none transition-colors"
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block mb-2 text-[#2C2C2C]">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF8C00] focus:outline-none transition-colors"
                  >
                    <option value="Product Question">Product Question</option>
                    <option value="Custom Order">Custom Order</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block mb-2 text-[#2C2C2C]">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF8C00] focus:outline-none transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#FF8C00] text-white px-8 py-4 rounded-lg hover:bg-[#FF8C00]/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {submitted ? 'Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact Details */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="mb-6 text-[#2C2C2C]">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FF8C00]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#FF8C00]" />
                  </div>
                  <div>
                    <p className="text-[#2C2C2C] mb-1">Address</p>
                    <p className="text-gray-600">Tunis, Tunisia</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#009E60]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#009E60]" />
                  </div>
                  <div>
                    <p className="text-[#2C2C2C] mb-1">Phone</p>
                    <p className="text-gray-600">+216 XX XXX XXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FF8C00]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#FF8C00]" />
                  </div>
                  <div>
                    <p className="text-[#2C2C2C] mb-1">Email</p>
                    <p className="text-gray-600">info@africanstyletn.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#009E60]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#009E60]" />
                  </div>
                  <div>
                    <p className="text-[#2C2C2C] mb-1">Business Hours</p>
                    <p className="text-gray-600">Monday - Saturday</p>
                    <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="mb-4 text-[#2C2C2C]">Follow Us</h3>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-lg bg-[#FF8C00]/10 flex items-center justify-center hover:bg-[#FF8C00] hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="w-12 h-12 rounded-lg bg-[#009E60]/10 flex items-center justify-center hover:bg-[#009E60] hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </button>
                <button className="w-12 h-12 rounded-lg bg-[#FF8C00]/10 flex items-center justify-center hover:bg-[#FF8C00] hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Map Illustration */}
            <div className="bg-gradient-to-br from-[#FF8C00]/20 to-[#009E60]/20 p-8 rounded-xl text-center">
              <MapPin className="w-16 h-16 text-[#FF8C00] mx-auto mb-4" />
              <p className="text-[#2C2C2C] mb-2">Visit Us</p>
              <p className="text-gray-600">Tunis, Tunisia</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Additional Info */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="mb-3 text-[#2C2C2C]">Custom Orders</h3>
              <p className="text-gray-600">
                Looking for something special? We offer custom designs tailored to your preferences.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-[#2C2C2C]">Wholesale Inquiries</h3>
              <p className="text-gray-600">
                Interested in carrying our products? Contact us for wholesale opportunities.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-[#2C2C2C]">Collaborations</h3>
              <p className="text-gray-600">
                We love partnering with brands and artists who share our passion for African culture.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
