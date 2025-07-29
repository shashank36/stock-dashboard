# 📊 Indian Stock Dashboard

A modern, real-time stock market dashboard for Indian stocks (NSE) with a TradingView-like interface.

## ✨ Features

### 🎯 Core Features
- **Real-time Stock Data** - Live prices from NSE APIs
- **Market Indices** - Nifty 50, Sensex, Bank Nifty, IT indices
- **Stock Search** - Search and add stocks to watchlist
- **Watchlist Management** - Add/remove stocks from your watchlist
- **Auto-refresh** - Data updates every 30 seconds
- **Market Status** - Real-time market open/closed status

### 🎨 UI/UX Features
- **Dark Theme** - Professional TradingView-like interface
- **Responsive Design** - Works on desktop and mobile
- **Smooth Animations** - No page blanking during refresh
- **Loading States** - Skeleton screens and progress indicators
- **Real-time Updates** - Data changes without page refresh

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
```bash
git clone <your-github-repo-url>
cd stock-dashboard
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Start Backend Server**
```bash
cd ../backend
npm run dev
```

5. **Start Frontend Development Server**
```bash
cd ../frontend
npm start
```

6. **Open Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🌐 Deployment

### Backend Deployment (Render.com)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Render**
- Go to [Render.com](https://render.com)
- Create new account or sign in
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Configure:
  - **Name**: `stock-dashboard-backend`
  - **Root Directory**: `backend`
  - **Environment**: `Node`
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
  - **Plan**: Free

3. **Environment Variables** (in Render dashboard)
```env
NODE_ENV=production
PORT=10000
CORS_ORIGIN=https://your-frontend-app.netlify.app
```

### Frontend Deployment (Netlify)

1. **Update API URL**
Edit `frontend/src/config/stocks.js`:
```javascript
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-backend-app.onrender.com/api';
```

2. **Deploy on Netlify**
- Go to [Netlify.com](https://netlify.com)
- Create new account or sign in
- Click "New site from Git"
- Connect your GitHub repository
- Configure:
  - **Base directory**: `frontend`
  - **Build command**: `npm run build`
  - **Publish directory**: `build`
  - **Branch**: `main`

3. **Environment Variables** (in Netlify dashboard)
```env
REACT_APP_API_URL=https://your-backend-app.onrender.com/api
```

## 📝 Configuration

### Modifying Stock List

The stock list is configurable in two places:

#### Frontend Configuration
Edit `frontend/src/config/stocks.js`:
```javascript
export const DEFAULT_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd' },
  { symbol: 'TCS', name: 'Tata Consultancy Services Ltd' },
  // Add your stocks here
];
```

#### Backend Configuration
Edit `backend/server.js`:
```javascript
const DEFAULT_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd' },
  { symbol: 'TCS', name: 'Tata Consultancy Services Ltd' },
  // Add your stocks here
];
```

## 🏗️ Project Structure

```
stock-dashboard/
├── backend/
│   ├── server.js          # Express API server
│   ├── stocks-list.js     # Stock database
│   ├── package.json       # Backend dependencies
│   └── README.md          # Backend documentation
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── MarketIndices.js
│   │   │   ├── StockTable.js
│   │   │   ├── StockSearch.js
│   │   │   └── MarketStatus.js
│   │   ├── config/
│   │   │   └── stocks.js  # Configurable stock list
│   │   ├── App.js         # Main React component
│   │   └── App.css        # Styles
│   ├── package.json       # Frontend dependencies
│   └── README.md          # Frontend documentation
└── README.md              # This file
```

## 🔧 API Endpoints

### Backend API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | API health check |
| `/api/indices` | GET | Market indices data |
| `/api/stocks` | GET | Default stocks list |
| `/api/stocks/:symbol` | GET | Individual stock data |
| `/api/market-status` | GET | Market open/closed status |
| `/api/search/:query` | GET | Search stocks |

## 🎯 Key Features Explained

### 1. Smart Refresh System
- **No Page Blanking**: Data updates without UI flickering
- **Change Detection**: Only updates when data actually changes
- **Auto-refresh**: Every 30 seconds
- **Manual Refresh**: Click refresh button anytime

### 2. Stock Management
- **Search & Add**: Search for any stock and add to watchlist
- **Remove Stocks**: Remove stocks from watchlist
- **Configurable List**: Easy to modify default stocks

### 3. Real-time Data
- **Live Prices**: Real-time stock prices from NSE
- **Market Indices**: Live Nifty, Sensex data
- **Fallback Data**: Mock data when APIs are rate-limited

## 🚀 Deployment URLs

After deployment, your app will be available at:
- **Frontend**: https://your-app-name.netlify.app
- **Backend API**: https://your-app-name.onrender.com

## 🔮 Future Enhancements

- [ ] **Charts & Technical Analysis**
- [ ] **Portfolio Management**
- [ ] **Price Alerts**
- [ ] **News Integration**
- [ ] **Advanced Filters**
- [ ] **Mobile App**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Happy Trading! 📈** 