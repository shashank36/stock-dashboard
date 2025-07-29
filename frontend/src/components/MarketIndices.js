import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/stocks';

const MarketIndices = () => {
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIndices();
    const interval = setInterval(fetchIndices, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchIndices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/indices`);
      if (response.data.success) {
        setIndices(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching indices:', err);
      setError('Failed to fetch market indices');
    } finally {
      setLoading(false);
    }
  };

  const getChangeColor = (change) => {
    if (change === 'N/A' || change === null || change === undefined || isNaN(change)) return '#888888';
    const numChange = parseFloat(change);
    if (numChange > 0) return '#00ff88';
    if (numChange < 0) return '#ff4444';
    return '#888888';
  };

  if (loading && indices.length === 0) {
    return (
      <div className="market-indices">
        <h3>Market Indices</h3>
        <div className="indices-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="index-card skeleton">
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="market-indices">
      <h3>Market Indices</h3>
      <div className="indices-grid">
        {indices.map((index) => (
          <div key={index.indexName} className="index-card">
            <div className="index-name">{index.indexName}</div>
            <div className="index-value">{index.last || 'N/A'}</div>
            <div 
              className="index-change"
              style={{ color: getChangeColor(index.pChange) }}
            >
              {index.pChange > 0 ? '+' : ''}{index.pChange || 'N/A'}%
            </div>
          </div>
        ))}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default MarketIndices; 