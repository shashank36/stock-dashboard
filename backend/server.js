const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Import stocks database and functions
const { STOCK_DATABASE, getDefaultStocks, searchStocks, getAllStocks } = require('./stocks-list');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.CORS_ORIGIN || 'https://your-frontend-app.netlify.app', 'http://localhost:3000']
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Stock Dashboard API is running' });
});

// Get market indices (Nifty, Sensex)
app.get('/api/indices', async (req, res) => {
  try {
    // Using NSE API directly for indices
    const response = await axios.get('https://iislliveblob.niftyindices.com/jsonfiles/LiveIndicesWatch.json');
    const indices = response.data.data || [];
    
    // Filter for major indices
    const majorIndices = indices.filter(index => 
      ['NIFTY 50', 'NIFTY BANK', 'NIFTY IT', 'SENSEX'].includes(index.indexName)
    );
    
    res.json({ success: true, data: majorIndices });
  } catch (error) {
    console.error('Error fetching indices:', error);
    
    // Return mock indices data
    const mockIndices = [
      {
        indexName: 'NIFTY 50',
        last: '24,680.90',
        pChange: '0.85'
      },
      {
        indexName: 'SENSEX',
        last: '81,000.50',
        pChange: '0.92'
      },
      {
        indexName: 'NIFTY BANK',
        last: '56,084.90',
        pChange: '1.25'
      },
      {
        indexName: 'NIFTY IT',
        last: '35,370.05',
        pChange: '0.45'
      }
    ];
    
    res.json({ success: true, data: mockIndices, note: 'Mock data - NSE API unavailable' });
  }
});

// Get stock details
app.get('/api/stocks/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    
    // Check if stock exists in our database
    if (!STOCK_DATABASE.has(symbol.toUpperCase())) {
      return res.status(404).json({ 
        success: false, 
        error: `Stock ${symbol} not found in database` 
      });
    }
    
    // Using NSE API for stock data
    const response = await axios.get(`https://www.nseindia.com/api/quote-equity?symbol=${symbol.toUpperCase()}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
      }
    });
    
    const stockData = response.data;
    res.json({ success: true, data: stockData });
  } catch (error) {
    console.error(`Error fetching stock ${req.params.symbol}:`, error);
    
    // Return mock data in the correct format that frontend expects
    const mockData = {
      info: {
        symbol: req.params.symbol.toUpperCase(),
        companyName: STOCK_DATABASE.get(req.params.symbol.toUpperCase())?.name || 'Unknown Company'
      },
      priceInfo: {
        lastPrice: (Math.random() * 1000 + 100).toFixed(2),
        change: (Math.random() - 0.5) * 50,
        pChange: (Math.random() - 0.5) * 10,
        open: (Math.random() * 1000 + 100).toFixed(2),
        intraDayHighLow: {
          max: (Math.random() * 1000 + 150).toFixed(2),
          min: (Math.random() * 500 + 50).toFixed(2)
        },
        previousClose: (Math.random() * 1000 + 100).toFixed(2),
        totalTradedVolume: Math.floor(Math.random() * 1000000),
        vwap: (Math.random() * 1000 + 100).toFixed(2)
      }
    };
    
    res.json({ success: true, data: mockData, note: 'Mock data - NSE API unavailable' });
  }
});

// Get market status
app.get('/api/market-status', async (req, res) => {
  try {
    const now = new Date();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Market hours: 9:15 AM to 3:30 PM (Monday to Friday)
    const isMarketOpen = !isWeekend && 
      ((currentHour === 9 && currentMinute >= 15) || 
       (currentHour > 9 && currentHour < 15) || 
       (currentHour === 15 && currentMinute <= 30));
    
    res.json({ 
      success: true, 
      data: {
        isOpen: isMarketOpen,
        currentTime: now.toISOString(),
        nextOpen: isWeekend ? 'Monday 9:15 AM' : 'Tomorrow 9:15 AM',
        nextClose: '3:30 PM'
      }
    });
  } catch (error) {
    console.error('Error fetching market status:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch market status' });
  }
});

// Get default stocks list
app.get('/api/stocks', async (req, res) => {
  try {
    res.json({ success: true, data: getDefaultStocks() });
  } catch (error) {
    console.error('Error fetching stocks list:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch stocks list' });
  }
});

// Search stocks with fast database lookup
app.get('/api/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const results = searchStocks(query);
    
    res.json({ success: true, data: results });
  } catch (error) {
    console.error('Error searching stocks:', error);
    res.status(500).json({ success: false, error: 'Failed to search stocks' });
  }
});

// Get all available stocks (for admin purposes)
app.get('/api/stocks-database', async (req, res) => {
  try {
    res.json({ success: true, data: getAllStocks() });
  } catch (error) {
    console.error('Error fetching stock database:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch stock database' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Stock Dashboard API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📈 Stock database loaded: ${getAllStocks().length} stocks available`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 