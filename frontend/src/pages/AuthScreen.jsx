import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthScreen.css';

const AuthScreen = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <div className="auth-screen">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to KitUp</h1>
          <p className="hero-subtitle">
            Discover the world's finest football club jerseys
          </p>
          <p className="hero-description">
            Own authentic jerseys from your favorite clubs and players. 
            Browse our exclusive collection of premium quality kits.
          </p>

          <div className="hero-buttons">
            {isAuthenticated ? (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/clubs')}
                >
                  Browse Clubs
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate('/jerseys')}
                >
                  View All Jerseys
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate('/register')}
                >
                  Create Account
                </button>
              </>
            )}
          </div>
        </div>

        <div className="hero-image">
          <div className="image-placeholder">⚽</div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose KitUp?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✓</div>
            <h3>Authentic Jerseys</h3>
            <p>100% official and authentic club jerseys</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Shipping</h3>
            <p>Quick and reliable worldwide delivery</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Competitive pricing on all products</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Secure Checkout</h3>
            <p>Safe and secure payment processing</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthScreen;