import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartService from '../../api/CartService';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await CartService.getCarts();
      const data = await response.json();

      if (response.ok) {
        setCartItems(data.items || data);
      } else {
        setError(data.message || 'Failed to load cart');
      }
    } catch (err) {
      setError('An error occurred while fetching cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (jerseyId) => {
    try {
      const response = await CartService.deleteFromCart(jerseyId);
      const data = await response.json();

      if (response.ok) {
        setCartItems(prev => prev.filter(item => item.id !== jerseyId));
        setSuccessMessage('Item removed from cart');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.message || 'Failed to remove item');
      }
    } catch (err) {
      setError('An error occurred while removing item');
      console.error(err);
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0).toFixed(2);
  };

  const calculateTax = () => {
    return (calculateSubtotal() * 0.1).toFixed(2);
  };

  const calculateTotal = () => {
    return (parseFloat(calculateSubtotal()) + parseFloat(calculateTax())).toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError('')}>×</button>
        </div>
      )}

      {successMessage && (
        <div className="success-banner">
          {successMessage}
        </div>
      )}

      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{cartItems.length} items in cart</p>
      </div>

      <div className="cart-main">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading cart...</p>
          </div>
        ) : cartItems.length > 0 ? (
          <>
            {/* Cart Items */}
            <div className="cart-items">
              <div className="cart-items-header">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
                <span>Action</span>
              </div>

              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-product">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="item-image"
                      />
                    )}
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-club">{item.club}</p>
                      {item.season && (
                        <p className="item-season">{item.season}</p>
                      )}
                    </div>
                  </div>

                  <div className="item-price">
                    ${item.price}
                  </div>

                  <div className="item-quantity">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      className="quantity-input"
                      min="1"
                    />
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>${calculateSubtotal()}</span>
              </div>

              <div className="summary-row">
                <span>Tax (10%)</span>
                <span>${calculateTax()}</span>
              </div>

              <div className="summary-row shipping">
                <span>Shipping</span>
                <span>FREE</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>

              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>

              <button
                className="continue-shopping-btn"
                onClick={() => navigate('/jerseys')}
              >
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Start adding some amazing jerseys to your cart!</p>
            <button
              className="browse-btn"
              onClick={() => navigate('/jerseys')}
            >
              Browse Jerseys
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;