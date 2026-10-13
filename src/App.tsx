import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { OrderPage } from './pages/OrderPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

// Scroll to top upon navigating to a new route
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <OrderProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              {/* Catch-all redirects to Home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <CartDrawer />
          <FloatingWhatsApp />
          <Footer />
        </div>
      </BrowserRouter>
    </OrderProvider>
  );
};

export default App;
