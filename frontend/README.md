# Stock Dashboard Frontend

A modern React frontend for the Indian Stock Market Dashboard with a dark theme TradingView-like interface.

## Features

- **Dark Theme**: Professional TradingView-like dark interface
- **Real-time Data**: Live stock prices and market indices
- **Market Status**: Real-time market open/closed status
- **Stock Search**: Search and add stocks to watchlist
- **Responsive Design**: Works on desktop and mobile
- **Auto-refresh**: Data updates every 30 seconds
- **Smooth Animations**: No page blanking during refresh

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm start
```

3. **Open Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000 (must be running)

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Project Structure

```
src/
├── components/          # React components
│   ├── MarketIndices.js
│   ├── MarketStatus.js
│   ├── StockSearch.js
│   └── StockTable.js
├── config/
│   └── stocks.js       # Stock configuration
├── App.js              # Main component
├── App.css             # Styles
├── index.js            # Entry point
└── index.css           # Global styles
```

## Configuration

### Adding Default Stocks
Edit `src/config/stocks.js`:
```javascript
export const DEFAULT_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', category: 'OIL_GAS' },
  // Add more stocks here
];
```

### API Configuration
Set the API base URL in `src/config/stocks.js`:
```javascript
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

## Features Explained

### 1. Market Indices
- Displays Nifty 50, Sensex, Bank Nifty, IT indices
- Real-time price updates
- Color-coded change indicators

### 2. Market Status
- Shows if market is open or closed
- Real-time status updates
- Visual indicators with animations

### 3. Stock Search
- Search by symbol or company name
- Auto-complete suggestions
- Add stocks to watchlist
- Prevents duplicate additions

### 4. Stock Table
- Comprehensive stock data display
- Real-time price updates
- Remove stocks from watchlist
- Manual refresh capability

## Styling

The app uses CSS custom properties for consistent theming:
- Dark color scheme
- Professional TradingView-like design
- Smooth animations and transitions
- Responsive design for all screen sizes

## API Integration

The frontend integrates with the backend API endpoints:
- `/api/indices` - Market indices data
- `/api/stocks` - Default stocks list
- `/api/stocks/:symbol` - Individual stock data
- `/api/market-status` - Market status
- `/api/search/:query` - Stock search

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

### Adding New Components
1. Create component in `src/components/`
2. Import and use in `App.js`
3. Add styles to `App.css`

### Styling Guidelines
- Use CSS custom properties for colors
- Follow the dark theme design system
- Ensure responsive design
- Add smooth animations for interactions

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Create `.env` file:
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## Troubleshooting

### Common Issues
1. **API Connection Error**: Ensure backend is running on port 5000
2. **CORS Issues**: Check backend CORS configuration
3. **Data Not Loading**: Verify API endpoints are working

### Debug Mode
Open browser developer tools to see console logs and network requests.

## Contributing

1. Follow the existing code style
2. Test on multiple screen sizes
3. Ensure dark theme consistency
4. Add proper error handling

---

**Happy Trading! 📈** 