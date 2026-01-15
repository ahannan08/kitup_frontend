import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-screen">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-description">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundScreen;