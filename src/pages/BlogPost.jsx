import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts';
import { ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh' }}>
        <h2>Nie znaleziono artykułu.</h2>
        <button onClick={() => navigate('/blog')} className="btn-secondary" style={{ marginTop: '20px' }}>Wróć do bloga</button>
      </div>
    );
  }

  return (
    <article className="blog-page-wrapper" style={{ paddingTop: '120px', minHeight: '100vh', backgroundColor: 'var(--bg-color)', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-light)', marginBottom: '40px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
            <ArrowLeft size={16} /> Powrót do artykułów
          </Link>
          
          <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
            {post.category} • {post.date}
          </span>
          
          <h1 style={{ fontSize: '3.5rem', fontWeight: 400, marginBottom: '40px', lineHeight: 1.1 }}>
            {post.title}
          </h1>

          <div style={{ width: '100%', height: '400px', marginBottom: '60px', overflow: 'hidden' }}>
            <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '20px' }}>Chcesz umówić wizytę?</h3>
            <Link to="/#kontakt" style={{ textDecoration: 'none' }}>
              <button className="btn-primary">Skontaktuj się z nami</button>
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
