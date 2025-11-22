import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { CalculatorDetail } from './pages/CalculatorDetail';
import { IconDemo } from './pages/IconDemo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/all-tools" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/tools/:id" element={<CalculatorDetail />} />
          <Route path="/icon-demo" element={<IconDemo />} />
          <Route path="*" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold">404 - Page Not Found</h1></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
