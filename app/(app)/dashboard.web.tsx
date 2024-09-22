import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, Platform, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit'; // Import LineChart from react-native-chart-kit
import Icon from '@expo/vector-icons/FontAwesome5'; // Import FontAwesome icons
import axios from 'axios';

const DashboardScreen = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [stocks, setStocks] = useState([
    // Default stocks
    {
      ticker: 'AAPL',
      companyName: 'Apple Computer Corp.',
      percentageChange: 16.24,
      finalGrade: 'A',
      recommendation: 'BUY',
      volatilityRating: 'High',
      currentPrice: 68.67,
    },
    {
      ticker: 'SBUX',
      companyName: 'Starbucks Corp.',
      percentageChange: -2.07,
      finalGrade: 'D',
      recommendation: 'SELL',
      volatilityRating: 'Low',
      currentPrice: 45.67,
    },
    {
      ticker: 'ACME',
      companyName: 'Acme Inc.',
      percentageChange: 0.00,
      finalGrade: 'C',
      recommendation: 'HOLD',
      volatilityRating: 'Moderate',
      currentPrice: 187.10,
    },
  ]);

  const API_KEY = 'SVG1I5VSRGQF5I2Z';

  const getSuggestions = async (text) => {
    if (text.length > 0) {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=${API_KEY}`);
        const matches = response.data.bestMatches || [];
        setSuggestions(matches.map(match => ({
          ticker: match['1. symbol'],
          name: match['2. name']
        })));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchChange = (text) => {
    setSearch(text);
    getSuggestions(text);
  };

  const selectSuggestion = (item) => {
    setSearch(item.ticker);
    setSuggestions([]);
    searchStocks(item.ticker);
  };

  // Set the webpage title when the component mounts
  useEffect(() => {
    if(Platform.OS === 'web'){
        document.title = "Dashboard - AlphaOrbit";
    }

    
  }, []);

  const searchStocks = async () => {
    if (search.trim() === '') {
      // Reset to default stocks if search is empty
      setStocks([
        // ... default stocks ...
      ]);
      return;
    }

    try {
      const response = await axios.get(`https://us-central1-alphaorbit-2cf88.cloudfunctions.net/analyzeStockByTicker?ticker=${search.toUpperCase()}`);
      const stockData = response.data;
      
      setStocks([{
        ticker: stockData.ticker,
        companyName: stockData.companyName,
        percentageChange: stockData.percentageChange,
        finalGrade: stockData.finalGrade,
        recommendation: stockData.recommendation,
        volatilityRating: stockData.volatilityRating,
        currentPrice: stockData.currentPrice,
      }]);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  return (
    <View style={styles.container}>
      {/* Sidebar Navigation */}
      <View style={styles.sidebar}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/AlphaOrbit.png')} style={styles.icon} />
          <Text style={styles.logoText}>AlphaOrbit</Text>
        </View>

        <View style={styles.navItems}>
          <TouchableOpacity style={styles.navItemActive}>
            <Icon name="th-large" size={20} color="#ffffff" style={styles.navIcon} />
            <Text style={styles.navTextActive}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Icon name="search" size={20} color="#888" style={styles.navIcon} />
            <Text style={styles.navText}>Research</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Icon name="newspaper" size={20} color="#888" style={styles.navIcon} />
            <Text style={styles.navText}>News</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Icon name="lightbulb" size={20} color="#888" style={styles.navIcon} />
            <Text style={styles.navText}>Strategy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Icon name="chart-line" size={20} color="#888" style={styles.navIcon} />
            <Text style={styles.navText}>Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Icon name="wallet" size={20} color="#888" style={styles.navIcon} />
            <Text style={styles.navText}>Wallet</Text>
          </TouchableOpacity>
        </View>

        {/* Insights Section */}
        <View style={styles.insightsContainer}>
          <Text style={styles.insightsTitle}>Insights</Text>
          <TouchableOpacity style={styles.insightsItem}>
            <Icon name="envelope" size={20} color="#4A5568" style={styles.insightsIcon} />
            <Text style={styles.insightsText}>Messages</Text>
            <View style={styles.badgeRed}>
              <Text style={styles.badgeText}>12</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.insightsItem}>
            <Icon name="bell" size={20} color="#4A5568" style={styles.insightsIcon} />
            <Text style={styles.insightsText}>Notifications</Text>
            <View style={styles.badgeGray}>
              <Text style={styles.badgeText}>6</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.insightsItem}>
            <Icon name="comments" size={20} color="#4A5568" style={styles.insightsIcon} />
            <Text style={styles.insightsText}>Chat</Text>
            <View style={styles.badgeRed}>
              <Text style={styles.badgeText}>6</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.portfolioActivityContainer}>
          <Text style={styles.activityTitle}>All Portfolio Activity</Text>
          <View style={styles.activityContent}>
            <View style={styles.activityDetails}>
              <Text style={styles.totalStocks}>Total Stocks</Text>
              <Text style={styles.stockNumber}>350</Text>
              <Text style={styles.lastTrade}>Last Trade: 8/20/24</Text>
              <View style={styles.performanceBadge}>
                <Text style={styles.performanceText}>+7% this Week</Text>
              </View>
            </View>
            <View style={styles.activityDetails}>
              <View>
                <Text style={styles.amountInvested}>$2,300</Text>
                <Text style={styles.amountInvestedLabel}>Amount Invested</Text>
              </View>
              <View style={styles.performanceBadgePositive}>
                <Text style={styles.performanceTextPositive}>+32%</Text>
                <Text style={styles.performanceSubText}>All Time</Text>
              </View>
            </View>
          </View>
        </View>
        

        {/* User Profile Section */}
        <View style={styles.userProfileContainer}>
          <Image source={require('../../assets/images/Richie_3.png')} style={styles.userAvatar} />
          <View style={styles.userActions}>
            <Icon name="cog" size={20} color="#888" style={styles.userActionIcon} />
            <Icon name="sign-out-alt" size={20} color="#888" style={styles.userActionIcon} />
          </View>
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Watchlist Section with Line Chart */}
        <View style={styles.topSection}>
          <Text style={styles.sectionTitle}>Watchlist</Text>
          <Text style={styles.sectionSubtitle}>+48% Today</Text>
          {/* Line Chart Component with Two Lines */}
          <LineChart
            data={{
              labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
              datasets: [
                {
                  data: [1000, 1500, 2000, 3000, 2500, 3500, 4000, 4500, 3500, 4700],
                  color: (opacity = 1) => `#6149CD`, // Color for the first line
                  strokeWidth: 2, // Stroke width for the first line
                },
                {
                  data: [1200, 1300, 1800, 2500, 2000, 3200, 3600, 4200, 3300, 4600],
                  color: (opacity = 1) => `rgba(204, 204, 204, ${opacity})`, // Color for the second line
                  strokeWidth: 2, // Stroke width for the second line
                },
              ],
            }}
            width={Dimensions.get('window').width * 0.55 - 80} // Width of the chart
            height={Dimensions.get('window').height * 0.35 - 10}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#6149CD',
              },
            }}
            bezier // Optional: Use a bezier curve for the line
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* Stock Performance Table */}
        <View style={styles.stockTable}>
          {/* Table Header with Search Bar and Actions */}
          <View style={styles.tableHeader}>
            <View style={styles.searchContainer}>
              <TextInput 
                style={styles.searchBar} 
                placeholder="Search Company or Ticker(s)" 
                onChangeText={handleSearchChange}
                value={search}
              />
              {suggestions.length > 0 && (
                <FlatList
                  data={suggestions}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => selectSuggestion(item)}>
                      <Text style={styles.suggestionItem}>{item.ticker} - {item.name}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.ticker}
                  style={styles.suggestionList}
                />
              )}
              <TouchableOpacity style={styles.searchButton} onPress={() => searchStocks(search)}>
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tableActions}>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Filter</Text>
                <Icon name="chevron-down" size={14} color="#888" />
              </TouchableOpacity>
              <Icon name="trash-alt" size={18} color="#888" style={styles.actionIcon} />
              <Icon name="comment-dots" size={18} color="#888" style={styles.actionIcon} />
            </View>
          </View>

          {/* Table Columns Header */}
          <View style={styles.tableColumns}>
            <Text style={styles.columnText}>Company Name / Ticker</Text>
            <Text style={styles.columnText}>+/- Gain</Text>
            <Text style={styles.columnText}>Rating</Text>
            <Text style={styles.columnText}>Signal</Text>
            <Text style={styles.columnText}>Volatility</Text>
            <Text style={styles.columnText}>Current Price</Text>
          </View>

          {/* Stock Rows */}
          {stocks.map((stock, index) => (
            <View key={index} style={styles.stockRow}>
              <View style={styles.stockInfo}>
                <View style={styles.stockDetails}>
                  <Text style={styles.stockText}>{stock.companyName}</Text>
                  <Text style={styles.stockSubText}>{stock.ticker}</Text>
                </View>
              </View>
              <Text style={stock.percentageChange > 0 ? styles.gainTextPositive : stock.percentageChange < 0 ? styles.gainTextNegative : styles.gainTextNeutral}>
                {stock.percentageChange > 0 ? '+' : ''}{stock.percentageChange.toFixed(2)}%
              </Text>
              <Text style={styles.ratingBadge}>{stock.finalGrade}</Text>
              <Text style={
                stock.recommendation === 'BUY' ? styles.signalBadgeBuy :
                stock.recommendation === 'SELL' ? styles.signalBadgeSell :
                styles.signalBadgeHold
              }>{stock.recommendation}</Text>
              <Text style={
                stock.volatilityRating === 'High' ? styles.volatilityTextHigh :
                stock.volatilityRating === 'Low' ? styles.volatilityTextLow :
                styles.volatilityTextModerate
              }>{stock.volatilityRating}</Text>
              <Text style={styles.priceText}>${stock.currentPrice.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Featured Section on the Right */}
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Featured Portfolios</Text>
        {/* Portfolio items */}
        <View style={styles.portfolioItem}>
          <Text style={styles.portfolioTitle}>Battery Tech</Text>
          <Text style={styles.portfolioSubtitle}>By Stock Guys Inc.</Text>
          <Text style={styles.portfolioRisk}>Moderate</Text>
        </View>
        {/* Add more portfolios as needed */}
        <TouchableOpacity style={styles.featuredButton}>
          <LinearGradient colors={['#42e695', '#3bb2b8']} style={styles.gradientButton}>
            <Text style={styles.buttonText}>Shop Portfolios</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: '20%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRightColor: '#eee',
    borderRightWidth: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  navItems: {
    marginTop: 20,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  navText: {
    fontSize: 18,
    color: '#888',
    marginLeft: 10,
  },
  navItemActive: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#6B46C1',
    borderRadius: 10,
  },
  navTextActive: {
    fontSize: 18,
    color: '#ffffff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  navIcon: {
    marginRight: 10,
  },
  insightsContainer: {
    marginTop: 20,
  },
  insightsTitle: {
    fontSize: 16,
    color: '#A0AEC0',
    marginBottom: 20,
  },
  insightsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  insightsIcon: {
    marginRight: 15,
  },
  insightsText: {
    fontSize: 16,
    color: '#4A5568',
    flex: 1,
  },
  portfolioActivityContainer: {
    backgroundColor: '#FFD5E5',
    borderRadius: 36,
    padding: 20,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  activityContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  activityDetails: {
    alignItems: 'center',
    marginBottom: 10,
    width: '40%',
    justifyContent: 'center'
  },
  totalStocks: {
    fontSize: 12,
    color: '#888',
  },
  stockNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  amountInvested: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  amountInvestedLabel: {
    fontSize: 10,
    color: '#888',
  },
  lastTrade: {
    fontSize: 10,
    color: '#888',
    marginBottom: 10,
  },
  performanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  performanceBadge: {
    backgroundColor: '#FF69B4',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  performanceText: {
    fontSize: 12,
    color: '#fff',
  },
  performanceBadgePositive: {
    backgroundColor: '#48bb78',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  performanceTextPositive: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  performanceSubText: {
    fontSize: 10,
    color: '#fff',
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userActions: {
    flexDirection: 'row',
  },
  userActionIcon: {
    marginLeft: 15,
  },
  badgeRed: {
    backgroundColor: '#FC8181',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeGray: {
    backgroundColor: '#CBD5E0',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  mainContent: {
    width: '55%',
    padding: 20,
    justifyContent: 'center'
  },
  topSection: {
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 10,
    flex: 1
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#48bb78',
    marginBottom: 10,
  },
  stockList: {
    marginTop: 10,
  },
  stockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  stockChangePositive: {
    color: '#48bb78',
    fontWeight: 'bold',
  },
  stockChangeNegative: {
    color: '#f56565',
    fontWeight: 'bold',
  },
  stockChangeNeutral: {
    color: '#888',
    fontWeight: 'bold',
  },
  stockPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuredSection: {
    width: '25%',
    padding: 20,
    backgroundColor: '#f9fafb',
    borderLeftColor: '#eee',
    borderLeftWidth: 1,
  },
  portfolioItem: {
    marginBottom: 20,
  },
  portfolioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  portfolioSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  portfolioRisk: {
    fontSize: 12,
    color: '#f56565',
  },
  featuredButton: {
    marginTop: 20,
  },
  gradientButton: {
    paddingVertical: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  stockTable: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 25,
    marginTop: 20,
    flex: 1
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    flex: 1,
    position: 'relative',
    marginRight: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  suggestionList: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    maxHeight: 200,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#ffffff',
  },
  searchButton: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: '#6B46C1',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  tableActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  filterText: {
    fontSize: 14,
    color: '#888',
    marginRight: 5,
  },
  actionIcon: {
    marginLeft: 10,
  },
  tableColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  columnText: {
    fontSize: 12,
    color: '#888',
    flex: 1,
    textAlign: 'center',
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  stockIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  stockDetails: {
    flexDirection: 'column',
  },
  stockText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  stockSubText: {
    fontSize: 12,
    color: '#888',
  },
  gainTextPositive: {
    fontSize: 14,
    color: '#48bb78',
    flex: 1,
    textAlign: 'center',
  },
  gainTextNegative: {
    fontSize: 14,
    color: '#f56565',
    flex: 1,
    textAlign: 'center',
  },
  gainTextNeutral: {
    fontSize: 14,
    color: '#888',
    flex: 1,
    textAlign: 'center',
  },
  ratingBadge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#48bb78',
    paddingVertical: 2,
    borderRadius: 5,
    flex: 1,
    textAlign: 'center',
  },
  signalBadgeBuy: {
    backgroundColor: '#48bb78',
    color: '#fff',
    paddingVertical: 5,
    marginHorizontal: 25,
    borderRadius: 5,
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  signalBadgeSell: {
    backgroundColor: '#f56565',
    color: '#fff',
    marginHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  signalBadgeHold: {
    backgroundColor: '#CBD5E0',
    color: '#fff',
    marginHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  volatilityTextHigh: {
    fontSize: 12,
    color: '#f56565',
    flex: 1,
    textAlign: 'center',
  },
  volatilityTextLow: {
    fontSize: 12,
    color: '#48bb78',
    flex: 1,
    textAlign: 'center',
  },
  volatilityTextModerate: {
    fontSize: 12,
    color: '#ED8936',
    flex: 1,
    textAlign: 'center',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
});

export default DashboardScreen;
