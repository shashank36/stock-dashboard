export const DEFAULT_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', category: 'OIL_GAS' },
  { symbol: 'TCS', name: 'Tata Consultancy Services Ltd', category: 'IT' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', category: 'BANKING' },
  { symbol: 'INFY', name: 'Infosys Ltd', category: 'IT' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', category: 'BANKING' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', category: 'CONSUMER_GOODS' },
  { symbol: 'ITC', name: 'ITC Ltd', category: 'CONSUMER_GOODS' },
  { symbol: 'SBIN', name: 'State Bank of India', category: 'BANKING' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', category: 'TELECOM' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd', category: 'BANKING' },
  { symbol: 'AXISBANK', name: 'Axis Bank Ltd', category: 'BANKING' },
  { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', category: 'CONSUMER_GOODS' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', category: 'AUTOMOBILES' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Ltd', category: 'PHARMA' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', category: 'AUTOMOBILES' },
  { symbol: 'WIPRO', name: 'Wipro Ltd', category: 'IT' },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Ltd', category: 'CEMENT' },
  { symbol: 'TITAN', name: 'Titan Company Ltd', category: 'CONSUMER_GOODS' },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', category: 'BANKING' },
  { symbol: 'NESTLEIND', name: 'Nestle India Ltd', category: 'CONSUMER_GOODS' }
];

// API URL configuration for different environments
const getApiBaseUrl = () => {
  // Production: Use environment variable or fallback to Render URL
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || 'https://your-backend-app.onrender.com/api';
  }
  // Development: Use local backend
  return 'http://localhost:5000/api';
};

export const API_BASE_URL = getApiBaseUrl(); 