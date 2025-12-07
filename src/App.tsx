import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { CalculatorDetail } from './pages/CalculatorDetail';
import { IconDemo } from './pages/IconDemo';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { AllTools } from './pages/AllTools';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/all-tools" element={<AllTools />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/tools/:id" element={<CalculatorDetail />} />
            <Route path="/icon-demo" element={<IconDemo />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold">404 - Page Not Found</h1></div>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Analytics />
    </HelmetProvider>
  );
}

export default App;
