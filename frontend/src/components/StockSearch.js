import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/stocks';

const StockSearch = ({ onAddStock, watchlist }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      const timeoutId = setTimeout(() => {
        searchStocks();
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  const searchStocks = async () => {
    if (query.length < 2) return;

    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/search/${query}`);
      if (response.data.success) {
        setResults(response.data.data);
        setShowResults(true);
      }
    } catch (err) {
      console.error('Error searching stocks:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStock = (stock) => {
    if (!watchlist.some(s => s.symbol === stock.symbol)) {
      onAddStock(stock);
      setQuery('');
      setShowResults(false);
    }
  };

  const isInWatchlist = (symbol) => {
    return watchlist.some(stock => stock.symbol === symbol);
  };

  return (
    <div className="stock-search" ref={searchRef}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search stocks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        {loading && <div className="search-spinner"></div>}
      </div>
      
      {showResults && results.length > 0 && (
        <div className="search-results">
          {results.map((stock) => (
            <div
              key={stock.symbol}
              className={`search-result ${isInWatchlist(stock.symbol) ? 'in-watchlist' : ''}`}
              onClick={() => !isInWatchlist(stock.symbol) && handleAddStock(stock)}
            >
              <div className="stock-info">
                <div className="stock-symbol">{stock.symbol}</div>
                <div className="stock-name">{stock.name}</div>
              </div>
              {isInWatchlist(stock.symbol) ? (
                <div className="added-indicator">✓ Added</div>
              ) : (
                <button className="add-button">+ Add</button>
              )}
            </div>
          ))}
        </div>
      )}
      
      {showResults && results.length === 0 && !loading && (
        <div className="search-results">
          <div className="no-results">No stocks found</div>
        </div>
      )}
    </div>
  );
};

export default StockSearch; 