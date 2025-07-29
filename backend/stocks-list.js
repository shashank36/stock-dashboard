// Comprehensive stock database with all available stocks
const STOCK_DATABASE = new Map([
  // NIFTY 50 Stocks
  ['RELIANCE', { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', category: 'OIL_GAS' }],
  ['TCS', { symbol: 'TCS', name: 'Tata Consultancy Services Ltd', category: 'IT' }],
  ['HDFCBANK', { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', category: 'BANKING' }],
  ['INFY', { symbol: 'INFY', name: 'Infosys Ltd', category: 'IT' }],
  ['ICICIBANK', { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', category: 'BANKING' }],
  ['HINDUNILVR', { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', category: 'CONSUMER_GOODS' }],
  ['ITC', { symbol: 'ITC', name: 'ITC Ltd', category: 'CONSUMER_GOODS' }],
  ['SBIN', { symbol: 'SBIN', name: 'State Bank of India', category: 'BANKING' }],
  ['BHARTIARTL', { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', category: 'TELECOM' }],
  ['KOTAKBANK', { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd', category: 'BANKING' }],
  ['AXISBANK', { symbol: 'AXISBANK', name: 'Axis Bank Ltd', category: 'BANKING' }],
  ['ASIANPAINT', { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', category: 'CONSUMER_GOODS' }],
  ['MARUTI', { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', category: 'AUTOMOBILES' }],
  ['SUNPHARMA', { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Ltd', category: 'PHARMA' }],
  ['TATAMOTORS', { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', category: 'AUTOMOBILES' }],
  ['WIPRO', { symbol: 'WIPRO', name: 'Wipro Ltd', category: 'IT' }],
  ['ULTRACEMCO', { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Ltd', category: 'CEMENT' }],
  ['TITAN', { symbol: 'TITAN', name: 'Titan Company Ltd', category: 'CONSUMER_GOODS' }],
  ['BAJFINANCE', { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', category: 'BANKING' }],
  ['NESTLEIND', { symbol: 'NESTLEIND', name: 'Nestle India Ltd', category: 'CONSUMER_GOODS' }],
  
  // Additional Popular Stocks
  ['HCLTECH', { symbol: 'HCLTECH', name: 'HCL Technologies Ltd', category: 'IT' }],
  ['POWERGRID', { symbol: 'POWERGRID', name: 'Power Grid Corporation of India Ltd', category: 'POWER' }],
  ['NTPC', { symbol: 'NTPC', name: 'NTPC Ltd', category: 'POWER' }],
  ['ONGC', { symbol: 'ONGC', name: 'Oil & Natural Gas Corporation Ltd', category: 'OIL_GAS' }],
  ['COALINDIA', { symbol: 'COALINDIA', name: 'Coal India Ltd', category: 'MINING' }],
  ['TECHM', { symbol: 'TECHM', name: 'Tech Mahindra Ltd', category: 'IT' }],
  ['ADANIENT', { symbol: 'ADANIENT', name: 'Adani Enterprises Ltd', category: 'CONGLOMERATE' }],
  ['JSWSTEEL', { symbol: 'JSWSTEEL', name: 'JSW Steel Ltd', category: 'STEEL' }],
  ['TATASTEEL', { symbol: 'TATASTEEL', name: 'Tata Steel Ltd', category: 'STEEL' }],
  ['HINDALCO', { symbol: 'HINDALCO', name: 'Hindalco Industries Ltd', category: 'METALS' }],
  ['DRREDDY', { symbol: 'DRREDDY', name: 'Dr. Reddy\'s Laboratories Ltd', category: 'PHARMA' }],
  ['CIPLA', { symbol: 'CIPLA', name: 'Cipla Ltd', category: 'PHARMA' }],
  ['DIVISLAB', { symbol: 'DIVISLAB', name: 'Divi\'s Laboratories Ltd', category: 'PHARMA' }],
  ['EICHERMOT', { symbol: 'EICHERMOT', name: 'Eicher Motors Ltd', category: 'AUTOMOBILES' }],
  ['BAJAJFINSV', { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv Ltd', category: 'FINANCIAL' }],
  ['HDFC', { symbol: 'HDFC', name: 'Housing Development Finance Corporation Ltd', category: 'FINANCIAL' }],
  ['BRITANNIA', { symbol: 'BRITANNIA', name: 'Britannia Industries Ltd', category: 'CONSUMER_GOODS' }],
  ['SHREECEM', { symbol: 'SHREECEM', name: 'Shree Cement Ltd', category: 'CEMENT' }],
  ['APOLLOHOSP', { symbol: 'APOLLOHOSP', name: 'Apollo Hospitals Enterprise Ltd', category: 'HEALTHCARE' }],
  ['HEROMOTOCO', { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp Ltd', category: 'AUTOMOBILES' }],
  ['UPL', { symbol: 'UPL', name: 'UPL Ltd', category: 'CHEMICALS' }],
  ['BPCL', { symbol: 'BPCL', name: 'Bharat Petroleum Corporation Ltd', category: 'OIL_GAS' }],
  ['IOC', { symbol: 'IOC', name: 'Indian Oil Corporation Ltd', category: 'OIL_GAS' }],
  ['VEDL', { symbol: 'VEDL', name: 'Vedanta Ltd', category: 'METALS' }],
  ['GRASIM', { symbol: 'GRASIM', name: 'Grasim Industries Ltd', category: 'CEMENT' }],
  ['LT', { symbol: 'LT', name: 'Larsen & Toubro Ltd', category: 'CONSTRUCTION' }],
  ['ADANIPORTS', { symbol: 'ADANIPORTS', name: 'Adani Ports and Special Economic Zone Ltd', category: 'LOGISTICS' }],
  ['INDUSINDBK', { symbol: 'INDUSINDBK', name: 'IndusInd Bank Ltd', category: 'BANKING' }],
  ['MM', { symbol: 'MM', name: 'Mahindra & Mahindra Ltd', category: 'AUTOMOBILES' }],
  
  // Additional stocks for default list
  ['ABB', { symbol: 'ABB', name: 'ABB India Ltd', category: 'ENGINEERING' }],
  ['ABCAPITAL', { symbol: 'ABCAPITAL', name: 'Aditya Birla Capital Ltd', category: 'FINANCIAL' }],
  ['ADANIGREEN', { symbol: 'ADANIGREEN', name: 'Adani Green Energy Ltd', category: 'RENEWABLE_ENERGY' }],
  ['BSE', { symbol: 'BSE', name: 'BSE Ltd', category: 'FINANCIAL' }],
  ['DIXON', { symbol: 'DIXON', name: 'Dixon Technologies (India) Ltd', category: 'ELECTRONICS' }],
  ['JUBLFOOD', { symbol: 'JUBLFOOD', name: 'Jubilant FoodWorks Ltd', category: 'FOOD_BEVERAGES' }],
  ['LAURUSLABS', { symbol: 'LAURUSLABS', name: 'Laurus Labs Ltd', category: 'PHARMA' }],
  ['PERSISTENT', { symbol: 'PERSISTENT', name: 'Persistent Systems Ltd', category: 'IT' }],
  ['TRENT', { symbol: 'TRENT', name: 'Trent Ltd', category: 'RETAIL' }]
]);

// Default stocks symbols (subset of database)
const DEFAULT_STOCK_SYMBOLS = [
  'ABB', 'ABCAPITAL', 'ADANIGREEN', 'BSE', 'DIXON', 'DRREDDY', 'JUBLFOOD', 
  'LAURUSLABS', 'MARUTI', 'PERSISTENT', 'TECHM', 'TRENT'
];

// Get default stocks from database
const getDefaultStocks = () => {
  return DEFAULT_STOCK_SYMBOLS.map(symbol => STOCK_DATABASE.get(symbol));
};

// Search function
const searchStocks = (query) => {
  const results = [];
  const searchTerm = query.toLowerCase();
  
  for (const [symbol, stock] of STOCK_DATABASE) {
    if (symbol.toLowerCase().includes(searchTerm) || 
        stock.name.toLowerCase().includes(searchTerm)) {
      results.push(stock);
    }
  }
  
  return results.slice(0, 20); // Limit to 20 results
};

// Get all stocks
const getAllStocks = () => {
  return Array.from(STOCK_DATABASE.values());
};

module.exports = {
  STOCK_DATABASE,
  getDefaultStocks,
  searchStocks,
  getAllStocks
}; 