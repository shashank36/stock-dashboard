import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MarketIndices from './components/MarketIndices';
import MarketStatus from './components/MarketStatus';
import StockSearch from './components/StockSearch';
import StockTable from './components/StockTable';
import { DEFAULT_STOCKS, API_BASE_URL } from './config/stocks';
import './App.css';

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDefaultStocks();
  }, []);

  const loadDefaultStocks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/stocks`);
      if (response.data.success) {
        setWatchlist(response.data.data);
      }
    } catch (err) {
      console.error('Error loading default stocks:', err);
      // Fallback to local default stocks
      setWatchlist(DEFAULT_STOCKS);
    } finally {
      setLoading(false);
    }
  };

  const addStock = (stock) => {
    if (!watchlist.some(s => s.symbol === stock.symbol)) {
      setWatchlist(prev => [...prev, stock]);
    }
  };

  const removeStock = (symbol) => {
    setWatchlist(prev => prev.filter(stock => stock.symbol !== symbol));
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <h2>Loading Stock Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>📊 Indian Stock Dashboard</h1>
          <MarketStatus />
        </div>
      </header>

      <main className="app-main">
        <div className="dashboard-grid">
          {/* Market Indices Section */}
          <section className="indices-section">
            <MarketIndices />
          </section>

          {/* Stock Search Section */}
          <section className="search-section">
            <div className="search-header">
              <h3>Add Stocks to Watchlist</h3>
              <p>Search and add stocks to monitor real-time prices</p>
            </div>
            <StockSearch onAddStock={addStock} watchlist={watchlist} />
          </section>

          {/* Stock Table Section */}
          <section className="table-section">
            <StockTable 
              watchlist={watchlist} 
              onRemoveStock={removeStock}
            />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2024 Indian Stock Dashboard - Real-time market data from NSE</p>
        <p>Data refreshes automatically every 30 seconds</p>
      </footer>
    </div>
  );
}

export default App; 