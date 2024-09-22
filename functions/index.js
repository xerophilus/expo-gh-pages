const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {
  fetchStockData,
  analyzeStock,
  gradeStock,
  fetchHistoricalData,
  calculateVolatility,
} = require('./stockAnalysis');

admin.initializeApp();

exports.analyzeStockByTicker = functions.https.onRequest(async (req, res) => {
  if (req.query.ticker) {
    const ticker = req.query.ticker.toUpperCase();

    try {
      // Fetch stock data and perform analysis
      const stock = await fetchStockData(ticker);
      const [analysis, companyName] = analyzeStock(stock);
      const [grades, finalGrade, recommendation] = gradeStock(analysis);

      // Fetch historical data
      const historicalDate = new Date();
      historicalDate.setDate(historicalDate.getDate() - 180); // 6 months ago
      const currentDate = new Date();

      const historicalData = 
        await fetchHistoricalData(
          ticker, new Date(historicalDate.getTime() - 30 * 24 * 60 * 60 * 1000), historicalDate
        );
      const currentData = await fetchHistoricalData(ticker, historicalDate, currentDate);

      if (historicalData && currentData) {
        const historicalPrice = historicalData.close[historicalData.close.length - 1];
        const currentPrice = currentData.close[currentData.close.length - 1];
        const percentageChange = ((currentPrice - historicalPrice) / historicalPrice) * 100;

        const stockData = currentData.close.map((price, index, prices) => {
          if (index === 0) return 0; // Handle first element
          return ((price - prices[0]) / prices[0]) * 100;
        });

        const dates = currentData.timestamp.map(timestamp =>
          new Date(timestamp * 1000).toISOString().slice(0, 10) // Convert to YYYY-MM-DD
        );

        const [volatilityPercentage, volatilityRating] = calculateVolatility(currentData);

        // Prepare the response
        const result = {
          ticker,
          companyName,
          analysis,
          grades,
          finalGrade,
          recommendation,
          currentPrice,
          volatilityPercentage,
          volatilityRating,
          percentageChange,
          stockData,
          dates
        };

        res.status(200).send(result); 

      } else {
        res.status(404).send(`No data found for ${ticker}`); 
      }

    } catch (e) {
      console.error('Error analyzing stock:', e); // Log the error for debugging
      res.status(500).send('An error occurred while processing your request.');
    }

  } else {
    res.status(400).send('Invalid request. Please provide a \'ticker\' query parameter.');
  }
});