import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/stocks';

const MarketStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketStatus();
    const interval = setInterval(fetchMarketStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const fetchMarketStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/market-status`);
      if (response.data.success) {
        setStatus(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching market status:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="market-status">
        <div className="status-indicator skeleton">
          <div className="skeleton-circle"></div>
          <div className="skeleton-line"></div>
        </div>
      </div>
    );
  }

  if (!status) return null;

  return (
    <div className="market-status">
      <div className={`status-indicator ${status.isOpen ? 'open' : 'closed'}`}>
        <div className={`status-dot ${status.isOpen ? 'open' : 'closed'}`}></div>
        <div className="status-text">
          <div className="status-label">
            {status.isOpen ? 'Market Open' : 'Market Closed'}
          </div>
          <div className="status-time">
            {status.isOpen ? 'Closes at 3:30 PM' : `Opens ${status.nextOpen}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketStatus; 