import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import burger from '../../assets/burger2.jpg'
import pasta from '../../assets/pas2.jpg'
import pasta2 from '../../assets/pasta.webp'
import pizza from '../../assets/pizza.png'
import rohan from '../../assets/rohan.jpg'
import salad from '../../assets/salad.png'
import shusi from '../../assets/shusi.jpg'
import tor from '../../assets/tor.jpg'
import curry from '../../assets/curry.webp'
import beef from '../../assets/beef.jpg'
import vege from '../../assets/vege.jpg'
import steak from '../../assets/steak.webp'
import dessert from '../../assets/dessert.webp'

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  // Add other screen names as needed
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeProps {
  navigation: HomeScreenNavigationProp;
}

export default function App({ navigation }: HomeProps) {
  const handleprofile = () => {
    navigation.navigate('Profile');
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Hello Greshma,</Text>
            <Text style={styles.headerTextRecipes}>What would you like to cook?</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeNumber}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search recipes, ingredients..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Featured Recipe */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Recipe</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.featuredCard}>
            <Image
              source={pasta2}
              style={styles.featuredImage}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.featuredOverlay}
            >
              <View style={styles.featuredContent}>
                <View style={styles.featuredBadge}>
                  <Text style={styles.badgeText}>Premium</Text>
                </View>
                <Text style={styles.featuredTitle}>Italian Pasta Masterclass</Text>
                <View style={styles.featuredMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={16} color="#fff" />
                    <Text style={styles.metaText}>30 min</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.metaText}>4.8</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.categoriesContainer}
          >
            <View style={styles.categoryItem}>
              <Image
                source={curry}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryIcon}>Indian</Text>
            </View>
            <View style={styles.categoryItem}>
              <Image
                source={pasta2}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryIcon}>Italian</Text>
            </View>
            <View style={styles.categoryItem}>
              <Image
                source={curry}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryIcon}>Nepalese</Text>
            </View>
            <View style={styles.categoryItem}>
              <Image
                source={shusi}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryIcon}>Japanese</Text>
            </View>
            <View style={styles.categoryItem}>
              <Image
                source={beef}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryIcon}>American</Text>
            </View>
            <View style={styles.categoryItem}>
              <Image
                source={vege}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryIcon}>Chinese</Text>
            </View>
            <View style={styles.categoryItem}>
              <Image
                source={dessert}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryIcon}>Desserts</Text>
            </View>
          </ScrollView>
        </View>

        {/* Trending Recipes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.trendingList}
          >
            <View style={styles.recipeItem}>
              <Image
                source={tor}
                style={styles.trendingImage}
              />
              <Text style={styles.recipeInfo}>Tortilla Pizza Recipe</Text>
              <Text style={styles.rating}>⭐ 4.8</Text>
            </View>
            <View style={styles.recipeItem}>
              <Image
                source={shusi}
                style={styles.trendingImage}
              />
              <Text style={styles.recipeInfo}>Salmon Sushi Recipe</Text>
              <Text style={styles.rating}>⭐ 4.8</Text>
            </View>
            <View style={styles.recipeItem}>
              <Image
                source={curry}
                style={styles.trendingImage}
              />
              <Text style={styles.recipeInfo}>Chicken Curry Recipe</Text>
              <Text style={styles.rating}>⭐ 4.7</Text>
            </View>
            <View style={styles.recipeItem}>
              <Image
                source={vege}
                style={styles.trendingImage}
              />
              <Text style={styles.recipeInfo}>Vegetable Stir Fry</Text>
              <Text style={styles.rating}>⭐ 4.6</Text>
            </View>
            <View style={styles.recipeItem}>
              <Image
                source={beef}
                style={styles.trendingImage}
              />
              <Text style={styles.recipeInfo}>Beef Tacos</Text>
              <Text style={styles.rating}>⭐ 4.9</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navItem}>
          <View style={styles.activeIconBackground}>
            <Ionicons name="home" size={24} color="#007AFF" />
          </View>
          <Text style={styles.navTextActive}>Home</Text>
        </View>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="compass-outline" size={24} color="#666" />
          <Text style={styles.navText}>Discover</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={24} color="#666" />
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#666" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={handleprofile}>
          <Image source={rohan} style={styles.profileIcon} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    marginBottom: 8,
  },
  headerTextContainer: {
    flex: 1,
    paddingRight: 60,
  },
  headerText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  headerTextRecipes: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    letterSpacing: 0.2,
    lineHeight: 34,
  },
  headerIcons: {
    position: 'absolute',
    right: 20,
    top: 16,
  },
  iconButton: {
    padding: 10,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationBadge: {
    position: 'absolute',
    right: -2,
    top: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeNumber: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchBar: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  searchIcon: {
    marginRight: 8,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  featuredCard: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    padding: 16,
    justifyContent: 'flex-end',
  },
  featuredContent: {
    gap: 8,
  },
  featuredBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  featuredMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: '#FFF',
    fontSize: 14,
  },
  trendingList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10, 
  },
  recipeItem: {
    width: 160,
    alignItems: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    marginRight: 16,
    marginBottom: 4,
  },
  trendingImage: {
    width: 160,
    height: 160,
  },
  recipeInfo: {
    marginTop: 8,
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  rating: {
    color: '#FFA000',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryImage: {
    width: 75,
    height: 75,
    borderRadius: 38,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#424242',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
  },
  activeIconBackground: {
    backgroundColor: '#E8F2FF',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  navTextActive: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    marginTop: 4,
  },
  profileIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: 4,
  },
});