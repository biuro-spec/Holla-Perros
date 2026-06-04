import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Regulamin from './pages/Regulamin';
import Metamorfozy from './pages/Metamorfozy';
import './index.css';

function App() {
  return (
    <HashRouter>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/metamorfozy" element={<Metamorfozy />} />
            <Route path="/regulamin" element={<Regulamin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </HashRouter>
  );
}

export default App;
