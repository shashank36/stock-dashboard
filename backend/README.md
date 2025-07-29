# Stock Dashboard Backend API

A Node.js/Express backend API for fetching real-time Indian stock market data.

## Features

- 📊 Real-time NSE & BSE stock data
- 📈 Market indices (Nifty, Sensex, etc.)
- 🔍 Stock search functionality
- 📋 Top gainers and losers
- 🕐 Market status and timings
- 🌐 CORS enabled for frontend integration

## API Endpoints

### Health Check
- `GET /api/health` - API health status

### Stocks
- `GET /api/stocks/nse` - Get all NSE stocks
- `GET /api/stocks/bse` - Get all BSE stocks
- `GET /api/stocks/:symbol` - Get specific stock details

### Market Data
- `GET /api/indices` - Get market indices
- `GET /api/market-status` - Get market status
- `GET /api/market-movers` - Get top gainers/losers

### Search
- `GET /api/search/:query` - Search stocks

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

## Environment Variables

Copy `config.env` to `.env` and configure:

```env
PORT=5000
NODE_ENV=development
API_BASE_URL=http://localhost:5000/api
CORS_ORIGIN=http://localhost:3000
```

## Deployment

This backend is configured for free tier deployment on:
- **Render.com** - Easy deployment with automatic scaling
- **Railway** - Simple deployment with good performance
- **Heroku** - Classic choice with free tier

## Technologies Used

- **Express.js** - Web framework
- **@zero65tech/indian-stock-market** - Indian stock data
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration 