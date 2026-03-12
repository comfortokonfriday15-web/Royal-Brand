import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const location = useLocation();

  const handleWhatsApp = () => {
    window.open(`https://wa.me/2348000000000?text=${encodeURIComponent("Hello, I'm interested in your real estate services.")}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-bg-light font-sans text-text-dark selection:bg-primary-teal selection:text-white">
      <Navbar />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <button 
        onClick={handleWhatsApp}
        className="fixed bottom-28 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle size={28} fill="currentColor" />
      </button>
    </div>
  );
}

export default App;
