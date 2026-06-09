import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import Home from './pages/Home';
import './index.css';

// Podstrony ładowane na żądanie (mniejszy bundle główny → szybszy start)
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Regulamin = lazy(() => import('./pages/Regulamin'));
const Metamorfozy = lazy(() => import('./pages/Metamorfozy'));

function App() {
  return (
    <HashRouter>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/metamorfozy" element={<Metamorfozy />} />
              <Route path="/regulamin" element={<Regulamin />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </HashRouter>
  );
}

export default App;
