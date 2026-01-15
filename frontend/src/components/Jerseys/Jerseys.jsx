import { useState, useEffect } from 'react';
import JerseysService from '../../api/JerseysService';
import CartService from '../../api/CartService';
import './Jerseys.css';

const Jerseys = () => {
  const [jerseys, setJerseys] = useState([]);
  const [filteredJerseys, setFilteredJerseys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    season: '',
    priceRange: 'all'
  });
  const [sortBy, setSortBy] = useState('newest');
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    fetchAllJerseys();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [jerseys, filters, sortBy]);

  const fetchAllJerseys = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await JerseysService.getAllJerseys();
      const data = await response.json();

      if (response.ok) {
        setJerseys(data.jerseys || data);
        setFilteredJerseys(data.jerseys || data);
      } else {
        setError(data.message || 'Failed to load jerseys');
      }
    } catch (err) {
      setError('An error occurred while fetching jerseys');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...jerseys];

    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter(j => j.type === filters.type);
    }

    // Apply season filter
    if (filters.season) {
      filtered = filtered.filter(j => j.season === filters.season);
    }

    // Apply price range filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(j => {
        const price = j.price || 0;
        switch (filters.priceRange) {
          case 'under50':
            return price < 50;
          case '50-100':
            return price >= 50 && price <= 100;
          case '100-150':
            return price >= 100 && price <= 150;
          case 'over150':
            return price > 150;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    setFilteredJerseys(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAddToCart = async (jersey) => {
    try {
      const response = await CartService.addToCart(jersey.id);
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(`${jersey.name} added to cart!`);
        setCartItems(prev => prev + 1);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.message || 'Failed to add to cart');
      }
    } catch (err) {
      setError('An error occurred while adding to cart');
      console.error(err);
    }
  };

  const getUniqueTypes = () => {
    return [...new Set(jerseys.map(j => j.type))].filter(Boolean);
  };

  const getUniqueSeasons = () => {
    return [...new Set(jerseys.map(j => j.season))].filter(Boolean);
  };

  return (
    <div className="jerseys-container">
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

      <div className="jerseys-header">
        <h1>Football Jerseys Collection</h1>
        <p>Browse our exclusive collection of authentic club jerseys</p>
      </div>

      <div className="jerseys-main">
        {/* Sidebar Filters */}
        <aside className="jerseys-sidebar">
          <div className="filter-section">
            <h3 className="filter-title">Filters</h3>

            {/* Type Filter */}
            <div className="filter-group">
              <label htmlFor="type-filter">Jersey Type</label>
              <select
                id="type-filter"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="filter-select"
              >
                <option value="">All Types</option>
                {getUniqueTypes().map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Season Filter */}
            <div className="filter-group">
              <label htmlFor="season-filter">Season</label>
              <select
                id="season-filter"
                value={filters.season}
                onChange={(e) => handleFilterChange('season', e.target.value)}
                className="filter-select"
              >
                <option value="">All Seasons</option>
                {getUniqueSeasons().map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <label htmlFor="price-filter">Price Range</label>
              <select
                id="price-filter"
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Prices</option>
                <option value="under50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-150">$100 - $150</option>
                <option value="over150">Over $150</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="filter-group">
              <label htmlFor="sort-filter">Sort By</label>
              <select
                id="sort-filter"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            <button
              className="reset-filters-btn"
              onClick={() => {
                setFilters({ type: '', season: '', priceRange: 'all' });
                setSortBy('newest');
              }}
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="jerseys-content">
          <div className="jerseys-info">
            <p className="results-count">
              Showing {filteredJerseys.length} of {jerseys.length} jerseys
            </p>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading jerseys...</p>
            </div>
          ) : filteredJerseys.length > 0 ? (
            <div className="jerseys-grid">
              {filteredJerseys.map((jersey) => (
                <div key={jersey.id} className="jersey-card">
                  <div className="jersey-image-container">
                    {jersey.image && (
                      <img
                        src={jersey.image}
                        alt={jersey.name}
                        className="jersey-image"
                      />
                    )}
                    {jersey.discount && (
                      <div className="discount-badge">-{jersey.discount}%</div>
                    )}
                  </div>

                  <div className="jersey-card-content">
                    <h3 className="jersey-name">{jersey.name}</h3>

                    <div className="jersey-meta">
                      {jersey.club && (
                        <span className="jersey-club">{jersey.club}</span>
                      )}
                      {jersey.type && (
                        <span className="jersey-type">{jersey.type}</span>
                      )}
                    </div>

                    {jersey.season && (
                      <p className="jersey-season">{jersey.season}</p>
                    )}

                    <div className="jersey-rating">
                      <span className="stars">★★★★★</span>
                      <span className="rating-count">(24 reviews)</span>
                    </div>

                    <div className="jersey-price-section">
                      {jersey.originalPrice && (
                        <span className="original-price">${jersey.originalPrice}</span>
                      )}
                      <span className="jersey-price">${jersey.price}</span>
                    </div>

                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(jersey)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No jerseys found matching your filters</p>
              <button
                className="reset-filters-btn"
                onClick={() => {
                  setFilters({ type: '', season: '', priceRange: 'all' });
                  setSortBy('newest');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jerseys;