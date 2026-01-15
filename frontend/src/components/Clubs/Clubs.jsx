import { useState, useEffect } from 'react';
import ClubService from '../../api/ClubService';
import JerseysService from '../../api/JerseysService';
import './Clubs.css';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [jerseys, setJerseys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [jerseyLoading, setJerseyLoading] = useState(false);

  // Fetch all clubs on component mount
  useEffect(() => {
    fetchAllClubs();
  }, []);

  const fetchAllClubs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await ClubService.getClubs();
      const data = await response.json();

      if (response.ok) {
        setClubs(data.clubs || data);
      } else {
        setError(data.message || 'Failed to load clubs');
      }
    } catch (err) {
      setError('An error occurred while fetching clubs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClubClick = async (club) => {
    setSelectedClub(club);
    setJerseyLoading(true);
    setError('');
    try {
      const response = await JerseysService.getJersey(club.id);
      const data = await response.json();

      if (response.ok) {
        setJerseys(data.jerseys || data);
      } else {
        setError(data.message || 'Failed to load jerseys');
        setJerseys([]);
      }
    } catch (err) {
      setError('An error occurred while fetching jerseys');
      console.error(err);
      setJerseys([]);
    } finally {
      setJerseyLoading(false);
    }
  };

  const handleBackClick = () => {
    setSelectedClub(null);
    setJerseys([]);
  };

  return (
    <div className="clubs-container">
      {error && <div className="error-banner">{error}</div>}

      {!selectedClub ? (
        <div className="clubs-view">
          <div className="clubs-header">
            <h1>All Clubs</h1>
            <p>Select a club to view its jerseys</p>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading clubs...</p>
            </div>
          ) : clubs.length > 0 ? (
            <div className="clubs-grid">
              {clubs.map((club) => (
                <div
                  key={club.id}
                  className="club-card"
                  onClick={() => handleClubClick(club)}
                >
                  {club.logo && (
                    <img
                      src={club.logo}
                      alt={club.name}
                      className="club-logo"
                    />
                  )}
                  <div className="club-info">
                    <h2 className="club-name">{club.name}</h2>
                    {club.league && (
                      <p className="club-league">{club.league}</p>
                    )}
                    {club.country && (
                      <p className="club-country">{club.country}</p>
                    )}
                  </div>
                  <div className="club-footer">
                    <span className="view-jerseys">View Jerseys →</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No clubs found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="jerseys-view">
          <div className="jerseys-header">
            <button className="back-button" onClick={handleBackClick}>
              ← Back to Clubs
            </button>
            <h1>{selectedClub.name} Jerseys</h1>
            {selectedClub.logo && (
              <img
                src={selectedClub.logo}
                alt={selectedClub.name}
                className="selected-club-logo"
              />
            )}
          </div>

          {jerseyLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading jerseys...</p>
            </div>
          ) : jerseys.length > 0 ? (
            <div className="jerseys-grid">
              {jerseys.map((jersey) => (
                <div key={jersey.id} className="jersey-card">
                  {jersey.image && (
                    <img
                      src={jersey.image}
                      alt={jersey.name}
                      className="jersey-image"
                    />
                  )}
                  <div className="jersey-details">
                    <h3 className="jersey-name">{jersey.name}</h3>
                    {jersey.type && (
                      <p className="jersey-type">{jersey.type}</p>
                    )}
                    {jersey.season && (
                      <p className="jersey-season">{jersey.season}</p>
                    )}
                    {jersey.price && (
                      <p className="jersey-price">${jersey.price}</p>
                    )}
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No jerseys found for this club</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Clubs;