import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';
import About from '@/pages/About';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminLogin from '@/pages/AdminLogin';
import Contact from '@/pages/Contact';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import { Helmet } from 'react-helmet';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

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
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;