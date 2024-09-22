import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import Icon from '@expo/vector-icons/FontAwesome5'; // Import FontAwesome icons

const DashboardScreen = () => {
  useEffect(() => {
    if(Platform.OS === 'web'){
        document.title = "Dashboard - AlphaOrbit";
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
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
          <View style={styles.insightsItem}>
            <Icon name="envelope" size={20} color="#4A5568" style={styles.insightsIcon} />
            <Text style={styles.insightsText}>Messages</Text>
            <View style={styles.badgeRed}>
              <Text style={styles.badgeText}>12</Text>
            </View>
          </View>
          <View style={styles.insightsItem}>
            <Icon name="bell" size={20} color="#4A5568" style={styles.insightsIcon} />
            <Text style={styles.insightsText}>Notifications</Text>
            <View style={styles.badgeGray}>
              <Text style={styles.badgeText}>6</Text>
            </View>
          </View>
          <View style={styles.insightsItem}>
            <Icon name="comments" size={20} color="#4A5568" style={styles.insightsIcon} />
            <Text style={styles.insightsText}>Chat</Text>
            <View style={styles.badgeRed}>
              <Text style={styles.badgeText}>6</Text>
            </View>
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
                  color: (opacity = 1) => `rgba(90, 103, 216, ${opacity})`, // Color for the first line
                  strokeWidth: 2, // Stroke width for the first line
                },
                {
                  data: [1200, 1300, 1800, 2500, 2000, 3200, 3600, 4200, 3300, 4600],
                  color: (opacity = 1) => `rgba(204, 204, 204, ${opacity})`, // Color for the second line
                  strokeWidth: 2, // Stroke width for the second line
                },
              ],
            }}
            width={Dimensions.get('window').width - 40} // Width of the chart
            height={220}
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
                stroke: '#ffa726',
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
            <TextInput style={styles.searchBar} placeholder="Search Company or Ticker(s)" />
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
          <View style={styles.stockRow}>
            <View style={styles.stockInfo}>
              {/* <Image source={require('../../assets/images/apple.png')} style={styles.stockIcon} /> */}
              <View style={styles.stockDetails}>
                <Text style={styles.stockText}>Apple Computer Corp.</Text>
                <Text style={styles.stockSubText}>AAPL</Text>
              </View>
            </View>
            <Text style={styles.gainTextPositive}>+16.24%</Text>
            <Text style={styles.ratingBadge}>A</Text>
            <Text style={styles.signalBadgeBuy}>BUY</Text>
            <Text style={styles.volatilityTextHigh}>High</Text>
            <Text style={styles.priceText}>$68.67</Text>
          </View>

          <View style={styles.stockRow}>
            <View style={styles.stockInfo}>
              {/* <Image source={require('../../assets/images/starbucks.png')} style={styles.stockIcon} /> */}
              <View style={styles.stockDetails}>
                <Text style={styles.stockText}>Starbucks Corp.</Text>
                <Text style={styles.stockSubText}>SBUX</Text>
              </View>
            </View>
            <Text style={styles.gainTextNegative}>-2.07%</Text>
            <Text style={styles.ratingBadge}>D</Text>
            <Text style={styles.signalBadgeSell}>SELL</Text>
            <Text style={styles.volatilityTextLow}>Low</Text>
            <Text style={styles.priceText}>$45.67</Text>
          </View>

          <View style={styles.stockRow}>
            <View style={styles.stockInfo}>
              {/* <Image source={require('../../assets/images/acme.png')} style={styles.stockIcon} /> */}
              <View style={styles.stockDetails}>
                <Text style={styles.stockText}>Acme Inc.</Text>
                <Text style={styles.stockSubText}>ACME</Text>
              </View>
            </View>
            <Text style={styles.gainTextNeutral}>0.00%</Text>
            <Text style={styles.ratingBadge}>C</Text>
            <Text style={styles.signalBadgeHold}>HOLD</Text>
            <Text style={styles.volatilityTextModerate}>Moderate</Text>
            <Text style={styles.priceText}>$187.10</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
  },
  sidebar: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  navItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginRight: 15,
  },
  navText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 5,
  },
  navItemActive: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginRight: 15,
    backgroundColor: '#6B46C1',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  navTextActive: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  navIcon: {
    marginRight: 5,
  },
  insightsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  insightsTitle: {
    fontSize: 14,
    color: '#A0AEC0',
    marginBottom: 10,
  },
  insightsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  insightsIcon: {
    marginRight: 10,
  },
  insightsText: {
    fontSize: 14,
    color: '#4A5568',
    flex: 1,
  },
  badgeRed: {
    backgroundColor: '#FC8181',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeGray: {
    backgroundColor: '#CBD5E0',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  mainContent: {
    width: '100%',
    paddingHorizontal: 20,
  },
  topSection: {
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#48bb78',
    marginBottom: 10,
  },
  stockTable: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  tableActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  filterText: {
    fontSize: 12,
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
    fontSize: 10,
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
    width: 25,
    height: 25,
    marginRight: 10,
  },
  stockDetails: {
    flexDirection: 'column',
  },
  stockText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  stockSubText: {
    fontSize: 10,
    color: '#888',
  },
  gainTextPositive: {
    fontSize: 12,
    color: '#48bb78',
    flex: 1,
    textAlign: 'center',
  },
  gainTextNegative: {
    fontSize: 12,
    color: '#f56565',
    flex: 1,
    textAlign: 'center',
  },
  gainTextNeutral: {
    fontSize: 12,
    color: '#888',
    flex: 1,
    textAlign: 'center',
  },
  ratingBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#48bb78',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    flex: 1,
    textAlign: 'center',
  },
  signalBadgeBuy: {
    backgroundColor: '#48bb78',
    color: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 10,
    flex: 1,
    textAlign: 'center',
  },
  signalBadgeSell: {
    backgroundColor: '#f56565',
    color: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 10,
    flex: 1,
    textAlign: 'center',
  },
  signalBadgeHold: {
    backgroundColor: '#CBD5E0',
    color: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 10,
    flex: 1,
    textAlign: 'center',
  },
  volatilityTextHigh: {
    fontSize: 10,
    color: '#f56565',
    flex: 1,
    textAlign: 'center',
  },
  volatilityTextLow: {
    fontSize: 10,
    color: '#48bb78',
    flex: 1,
    textAlign: 'center',
  },
  volatilityTextModerate: {
    fontSize: 10,
    color: '#ED8936',
    flex: 1,
    textAlign: 'center',
  },
  priceText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
});

export default DashboardScreen;
