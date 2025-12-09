import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './contexts/LanguageContext';
import { MainLayout } from './layouts/MainLayout';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Category = lazy(() => import('./pages/Category').then(module => ({ default: module.Category })));
const CalculatorDetail = lazy(() => import('./pages/CalculatorDetail').then(module => ({ default: module.CalculatorDetail })));
const IconDemo = lazy(() => import('./pages/IconDemo').then(module => ({ default: module.IconDemo })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Privacy = lazy(() => import('./pages/Privacy').then(module => ({ default: module.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(module => ({ default: module.Terms })));
const AllTools = lazy(() => import('./pages/AllTools').then(module => ({ default: module.AllTools })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
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
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Analytics />
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
