const yahooFinance = require('yahoo-finance2').default; // Adjust if necessary based on your yahoo-finance2 version

const fetchStockData = async (ticker) => {
  try {
    const stockData = await yahooFinance.quote(ticker);
    return stockData;
  } catch (error) {
    console.error(`Error fetching stock data for ${ticker}:`, error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};

const analyzeStock = (stockData) => {
  const analysis = {};

  // Company Name
  const companyName = stockData.shortName || 'N/A';

  // P/E Ratio
  const peRatio = stockData.forwardPE;
  analysis.peRatio = peRatio || 'N/A';

  // P/B Ratio
  const pbRatio = stockData.priceToBook;
  analysis.pbRatio = pbRatio || 'N/A';

  // ROE
  const roe = stockData.returnOnEquity;
  analysis.roe = roe !== null && roe !== undefined ? roe * 100 : 'N/A'; // Convert to percentage

  // EPS Growth
  const epsGrowth = stockData.earningsQuarterlyGrowth;
  analysis.epsGrowth =
    epsGrowth !== null && epsGrowth !== undefined ? epsGrowth * 100 : 'N/A'; // Convert to percentage

  // D/E Ratio
  const deRatio = stockData.debtToEquity;
  analysis.deRatio = deRatio || 'N/A';

  return [analysis, companyName];
};

const gradeStock = (analysis) => {
  const grades = {};
  const scores = [];

  // Grading criteria and scoring system
  const criteria = {
    peRatio: {
      A: [0, 15],
      B: [15, 20],
      C: [20, 25],
      D: [25, Infinity],
    },
    pbRatio: {
      A: [0, 1],
      B: [1, 2],
      C: [2, 3],
      D: [3, Infinity],
    },
    roe: {
      A: [20, Infinity],
      B: [15, 20],
      C: [10, 15],
      D: [0, 10],
    },
    epsGrowth: {
      A: [20, Infinity],
      B: [10, 20],
      C: [5, 10],
      D: [0, 5],
    },
    deRatio: {
      A: [0, 0.5],
      B: [0.5, 1],
      C: [1, 1.5],
      D: [1.5, Infinity],
    },
  };

  for (const key in analysis) {
    const value = analysis[key];
    if (value !== 'N/A') {
      for (const grade in criteria[key]) {
        const [low, high] = criteria[key][grade];
        if (low <= value && value < high) {
          grades[key] = grade;
          scores.push({ A: 4, B: 3, C: 2, D: 1 }[grade]);
          break;
        }
      }
    } else {
      grades[key] = 'N/A';
    }
  }

  let averageScore = 0,
    finalGrade = 'N/A',
    recommendation = 'N/A';

  if (scores.length > 0) {
    averageScore =
      scores.reduce((sum, score) => sum + score, 0) / scores.length;

    if (averageScore >= 3.5) {
      finalGrade = 'A';
      recommendation = 'Buy';
    } else if (averageScore >= 2.5) {
      finalGrade = 'B';
      recommendation = 'Buy';
    } else if (averageScore >= 1.5) {
      finalGrade = 'C';
      recommendation = 'Hold';
    } else {
      finalGrade = 'D';
      recommendation = 'Sell';
    }
  }

  return [grades, finalGrade, recommendation, averageScore];
};

const fetchHistoricalData = async (ticker, startDate, endDate) => {
  const period1 = Math.floor(startDate.getTime() / 1000); 
  const period2 = Math.floor(endDate.getTime() / 1000);

  try {
    const historicalData = await yahooFinance.historical(ticker, {
      period1, // Convert Date objects to Unix timestamps (in seconds)
      period2,
    });

    if (historicalData.length === 0) {
      console.warn(
        `No data found for ${ticker} between ${startDate} and ${endDate}`
      );
      return null;
    }

    // Convert the data to a format similar to pandas DataFrame
    const formattedData = {
      open: historicalData.map((item) => item.open),
      high: historicalData.map((item) => item.high),
      low: historicalData.map((item) => item.low),
      close: historicalData.map((item) => item.close),
      volume: historicalData.map((item) => item.volume),
      timestamp: historicalData.map((item) => item.date), // Assuming 'date' property contains the timestamp
    };

    return formattedData;
  } catch (error) {
    console.error(`Error fetching historical data for ${ticker}:`, error);
    throw error;
  }
};

const calculateVolatility = (data) => {
  // Calculate daily returns
  const returns = data.close.map((price, index, prices) => {
    if (index === 0) return 0; // Handle the first element
    return (price - prices[index - 1]) / prices[index - 1];
  });

  // Calculate the standard deviation of returns
  const meanReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const squaredDeviations = returns.map((r) => Math.pow(r - meanReturn, 2));
  const variance =
    squaredDeviations.reduce((sum, dev) => sum + dev, 0) / (returns.length - 1);
  const stdDev = Math.sqrt(variance);

  // Calculate annualized volatility (assuming 252 trading days in a year)
  const volatility = stdDev * Math.sqrt(252);

  // Convert to percentage
  const volatilityPercentage = volatility * 100;

  // Determine rating
  let rating;
  if (volatilityPercentage < 20) {
    rating = 'Calm';
  } else if (volatilityPercentage < 40) {
    rating = 'Volatile';
  } else {
    rating = 'Very Volatile';
  }

  return [volatilityPercentage.toFixed(2), rating];
};

module.exports = {
  fetchStockData,
  analyzeStock,
  gradeStock,
  fetchHistoricalData,
  calculateVolatility,
};
