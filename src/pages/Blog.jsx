import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="blog-page-wrapper" style={{ paddingTop: '120px', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <div className="container" style={{ paddingBottom: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--gold)', marginBottom: '16px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '2px' }}>Edukacja i Wiedza</p>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 400, marginBottom: '24px' }}>Magazyn <i className="text-italic text-pink">hOla Perros</i></h1>
          <div style={{ width: '120px', height: '3px', backgroundColor: 'var(--gold)', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px' }}>
          {blogPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="editorial-card"
              style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}
            >
              <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ height: '240px', overflow: 'hidden' }}>
                  <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="blog-img-hover" />
                </div>
                <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>{post.category} • {post.date}</span>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 500, marginBottom: '16px', lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ color: 'var(--text-light)', lineHeight: 1.6, marginBottom: '24px', flexGrow: 1 }}>{post.excerpt}</p>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid var(--text-dark)', alignSelf: 'flex-start', paddingBottom: '4px' }}>Czytaj więcej</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .blog-img-hover:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
