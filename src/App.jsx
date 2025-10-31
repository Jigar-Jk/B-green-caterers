import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import About from '@/pages/About';
import Order from '@/pages/Order';
import Contact from '@/pages/Contact';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/CartContext';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Helmet>
        <title>caterers - Bold Flavours, Naturally Crafted</title>
        <meta name="description" content="Premium non-veg food brand offering bold flavors with naturally crafted dishes. Explore our menu of tandoori, biryani, grilled seafood and more." />
      </Helmet>
      <div className={`min-h-screen flex flex-col ${isAdminRoute ? 'bg-gray-50' : 'bg-cream'}`}>
        {!isAdminRoute && <Navbar />}
        <ScrollToTop />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/order" element={<Order />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
        <Toaster />
      </div>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;