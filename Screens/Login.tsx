import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import burger from '../assets/burger2.jpg'
import fryrice from '../assets/fryrice.jpg'
import pasta from '../assets/pas2.jpg'
import pasta2 from '../assets/pasta.webp'
import pizza from '../assets/pizza.png'
import rohan from '..//assets/rohan.jpg'
import salad from '../assets/salad.png'
import shusi from '../assets/shusi.jpg'
import spa from '../assets/spa.jpg'
import tor from '../assets/tor.jpg'

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>Hello Greshma,</Text>
            <Text style={styles.headerTextRecipes}>Let’s Sizzle!</Text>
          </View>
          <View style={styles.headerIcons}>
            <Ionicons name="notifications-outline" size={24} color="#333" style={styles.notificationIcon} />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search here..."
            placeholderTextColor="#999"
          />
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        </View>

        {/* Just For You Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Just For You</Text>
          <View style={styles.recipeCard}>
            <Image
              source={ pasta2}
              style={styles.recipeImage}
            />
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>15 best pasta recipes from chef John</Text>
            </View>
          </View>
        </View>

        {/* Trending Recipes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Recipes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trendingList}>
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
            {/* Add three more items */}
            <View style={styles.recipeItem}>
              <Image
                source={spa}
                style={styles.trendingImage}
              />
              <Text style={styles.recipeInfo}>Chicken Curry Recipe</Text>
              <Text style={styles.rating}>⭐ 4.7</Text>
            </View>
            <View style={styles.recipeItem}>
              <Image
                source={rohan}
                style={styles.trendingImage}
              />
              <Text style={styles.recipeInfo}>Vegetable Stir Fry</Text>
              <Text style={styles.rating}>⭐ 4.6</Text>
            </View>
            <View style={styles.recipeItem}>
              <Image
                source={rohan}
                style={styles.trendingImage}
              />
              <Text style={styles.recipeInfo}>Beef Tacos</Text>
              <Text style={styles.rating}>⭐ 4.9</Text>
            </View>
          </ScrollView>
        </View>

        {/* Category Footer with Circular Images */}
        <Text style={styles.categoriesTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryFooter}>
          <View style={styles.categoryItem}>
            <Image
              source={pizza}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryIcon}>🍕 Pizza</Text>
          </View>
          <View style={styles.categoryItem}>
            <Image
              source={salad}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryIcon}>🥗 Salad</Text>
          </View>
          <View style={styles.categoryItem}>
            <Image
              source={burger}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryIcon}>🍔 Burgers</Text>
          </View>
          <View style={styles.categoryItem}>
            <Image
              source={pasta}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryIcon}>🍝 Pasta</Text>
          </View>
          {/* Additional Category Items */}
          <View style={styles.categoryItem}>
            <Image
              source={shusi}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryIcon}>🍣 Sushi</Text>
          </View>
          <View style={styles.categoryItem}>
            <Image
              source={{ uri: 'rohan' }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryIcon}>🥩 Steak</Text>
          </View>
          <View style={styles.categoryItem}>
            <Image
              source={{ uri: 'rohan' }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryIcon}>🍰 Desserts</Text>
          </View>
          <View style={styles.categoryItem}>
            <Image
              source={{ uri: 'rohan' }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryIcon}>🌮 Tacos</Text>
          </View>
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#333" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="compass-outline" size={24} color="#333" />
          <Text style={styles.navText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={24} color="#333" />
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#333" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={{ uri: 'rohan' }}
            style={styles.profileIcon}
          />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fb',
  },
  container: {
    flexGrow: 1,
    paddingTop: 50,
    padding: 16,
    backgroundColor: '#f8f9fb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 15,
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  headerTextRecipes: {
    fontSize: 25,
    color: '#2e7d32',
    fontWeight: 'bold',
    marginTop: -6,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    marginLeft: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchBar: {
    flex: 1,
    padding: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeCard: {
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  recipeImage: {
    width: '100%',
    height: 180,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
  },
  overlayText: {
    color: '#fff',
    fontSize: 16,
  },
  trendingList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10, 
  },
  recipeItem: {
    width: 140,
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 16, // Added margin to the right for spacing
  },
  trendingImage: {
    width: 140,
    height: 140,
  },
  recipeInfo: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  rating: {
    color: '#ff9800',
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
  categoriesTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginTop:20,
  },
  categoryFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10, // Reduced margin to push it higher
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16, // Added margin to the right for spacing
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 4,
  },
  categoryIcon: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
  profileIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});