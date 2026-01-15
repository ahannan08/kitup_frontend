import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import AuthScreen from './pages/AuthScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ClubScreen from './pages/ClubScreen';
import JerseyScreen from './pages/JerseyScreen';
import CartScreen from './pages/CartScreen';
import NotFoundScreen from './pages/NotFoundScreen';
import './App.css';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <Router>
      <div className="app">
        <main className="app-main">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<AuthScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            {/* Protected Routes */}
            <Route
              path="/clubs"
              element={isAuthenticated ? <ClubScreen /> : <Navigate to="/login" />}
            />
            <Route
              path="/jerseys"
              element={isAuthenticated ? <JerseyScreen /> : <Navigate to="/login" />}
            />
            <Route
              path="/cart"
              element={isAuthenticated ? <CartScreen /> : <Navigate to="/login" />}
            />
           

            {/* 404 Not Found */}
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

