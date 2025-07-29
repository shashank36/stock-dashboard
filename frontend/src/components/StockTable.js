import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/stocks';

const StockTable = ({ watchlist, onRemoveStock, onRefreshData }) => {
  const [stockData, setStockData] = useState({});
  const [loading, setLoading] = useState({});
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    if (watchlist.length > 0) {
      fetchAllStockData();
      const interval = setInterval(fetchAllStockData, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [watchlist]);

  const fetchAllStockData = async () => {
    const promises = watchlist.map(async (stock) => {
      try {
        setLoading(prev => ({ ...prev, [stock.symbol]: true }));
        const response = await axios.get(`${API_BASE_URL}/stocks/${stock.symbol}`);
        if (response.data.success) {
          setStockData(prev => ({ ...prev, [stock.symbol]: response.data.data }));
        } else {
          console.error(`API returned error for ${stock.symbol}:`, response.data.error);
        }
      } catch (err) {
        console.error(`Error fetching data for ${stock.symbol}:`, err);
        // Set empty data to show N/A values
        setStockData(prev => ({ ...prev, [stock.symbol]: null }));
      } finally {
        setLoading(prev => ({ ...prev, [stock.symbol]: false }));
      }
    });

    await Promise.all(promises);
    setLastUpdate(new Date());
  };

  const getChangeColor = (change) => {
    if (change === 'N/A' || change === null || change === undefined || isNaN(change)) return '#888888';
    const numChange = parseFloat(change);
    if (numChange > 0) return '#00ff88';
    if (numChange < 0) return '#ff4444';
    return '#888888';
  };

  const formatNumber = (num) => {
    if (num === 'N/A' || num === null || num === undefined || isNaN(num)) return 'N/A';
    return parseFloat(num).toLocaleString('en-IN');
  };

  const formatCurrency = (num) => {
    if (num === 'N/A' || num === null || num === undefined || isNaN(num)) return 'N/A';
    return `₹${parseFloat(num).toLocaleString('en-IN')}`;
  };

  if (watchlist.length === 0) {
    return (
      <div className="stock-table">
        <div className="empty-state">
          <h3>No stocks in watchlist</h3>
          <p>Search and add stocks to start monitoring</p>
        </div>
      </div>
    );
  }

  return (
    <div className="stock-table">
      <div className="table-header">
        <h3>Watchlist ({watchlist.length})</h3>
        <div className="table-controls">
          <button 
            className="refresh-button"
            onClick={fetchAllStockData}
            disabled={Object.values(loading).some(Boolean)}
          >
            🔄 Refresh
          </button>
          {lastUpdate && (
            <span className="last-update">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Company</th>
              <th>Last Price</th>
              <th>Change</th>
              <th>% Change</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Volume</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((stock) => {
              const data = stockData[stock.symbol] || null;
              const isLoading = loading[stock.symbol];
              
              return (
                <tr key={stock.symbol} className={isLoading ? 'loading' : ''}>
                  <td className="symbol-cell">
                    <div className="symbol">{stock.symbol}</div>
                    <div className="category">{stock.category}</div>
                  </td>
                  <td className="company-cell">
                    {data ? data.info?.companyName || stock.name : stock.name}
                  </td>
                  <td className="price-cell">
                    {isLoading ? (
                      <div className="skeleton-line"></div>
                    ) : (
                      formatCurrency(data?.priceInfo?.lastPrice || data?.lastPrice || 'N/A')
                    )}
                  </td>
                  <td className="change-cell">
                    {isLoading ? (
                      <div className="skeleton-line"></div>
                    ) : (
                      <span style={{ color: getChangeColor(data?.priceInfo?.change || data?.change) }}>
                        {data?.priceInfo?.change > 0 || data?.change > 0 ? '+' : ''}{formatNumber(data?.priceInfo?.change || data?.change || 'N/A')}
                      </span>
                    )}
                  </td>
                  <td className="pchange-cell">
                    {isLoading ? (
                      <div className="skeleton-line"></div>
                    ) : (
                      <span style={{ color: getChangeColor(data?.priceInfo?.pChange || data?.pChange) }}>
                        {data?.priceInfo?.pChange > 0 || data?.pChange > 0 ? '+' : ''}{formatNumber(data?.priceInfo?.pChange || data?.pChange || 'N/A')}%
                      </span>
                    )}
                  </td>
                  <td>{isLoading ? <div className="skeleton-line"></div> : formatCurrency(data?.priceInfo?.open || data?.open || 'N/A')}</td>
                  <td>{isLoading ? <div className="skeleton-line"></div> : formatCurrency(data?.priceInfo?.intraDayHighLow?.max || data?.high || 'N/A')}</td>
                  <td>{isLoading ? <div className="skeleton-line"></div> : formatCurrency(data?.priceInfo?.intraDayHighLow?.min || data?.low || 'N/A')}</td>
                  <td>{isLoading ? <div className="skeleton-line"></div> : formatNumber(data?.priceInfo?.totalTradedVolume || data?.volume || 'N/A')}</td>
                  <td>
                    <button 
                      className="remove-button"
                      onClick={() => onRemoveStock(stock.symbol)}
                      disabled={isLoading}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable; 