import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import rohan from '../../assets/rohan.jpg'; // Ensure this path is correct

const ProfilePage = () => {
  const navigation = useNavigation(); // Get navigation instance

  const redirectHome = () => {
    navigation.navigate('Home');
  };

  const recipes = [
    { id: 1, title: 'Fruity Breakfast', recipesCount: '9 recipes', image: rohan },
    { id: 2, title: 'Tasty Low-cal', recipesCount: '25 recipes', image: rohan },
    { id: 3, title: 'Healthy Desserts', recipesCount: '2 recipes', image: rohan },
    { id: 4, title: 'Add your food group', recipesCount: '', image: null, isPlaceholder: true },
  ];

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <Image source={rohan} style={styles.profilePic} />
          <Text style={styles.nameText}>Rohan Rai</Text>
          <Text style={styles.titleText}>Food Innovator</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>353</Text>
              <Text style={styles.statLabel}>Recipes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12K</Text>
              <Text style={styles.statLabel}>Views</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>14K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Cook Books</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.recipeGrid}>
            {recipes.map((recipe) => (
              <View key={recipe.id} style={styles.recipeCard}>
                {recipe.image ? (
                  <Image source={recipe.image} style={styles.recipeImage} />
                ) : recipe.isPlaceholder ? (
                  <TouchableOpacity style={styles.addRecipePlaceholder}>
                    <Text style={styles.addIcon}>+</Text>
                    <Text style={styles.addText}>{recipe.title}</Text>
                  </TouchableOpacity>
                ) : null}
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                {recipe.recipesCount ? <Text style={styles.recipeSubtitle}>{recipe.recipesCount}</Text> : null}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem} onPress={redirectHome}>
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
          <Image source={rohan} style={styles.profileIcon} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1 },
  container: { alignItems: 'center', paddingVertical: 20 },
  profileHeader: { alignItems: 'center', marginBottom: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginVertical: 10 },
  nameText: { fontSize: 30, fontWeight: 'bold', marginVertical: 5 },
  titleText: { color: '#666', marginVertical: 5 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '60%', marginVertical: 10 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#666' },
  buttonContainer: { backgroundColor: '#009688', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginVertical: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
  contentContainer: { width: '90%' },
  recipeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  recipeCard: { width: '48%', backgroundColor: '#fff', borderRadius: 8, marginBottom: 15, overflow: 'hidden', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 },
  recipeImage: { width: '100%', height: 100 },
  recipeTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 5 },
  recipeSubtitle: { color: '#666', marginBottom: 10 },
  addRecipePlaceholder: { width: '100%', height: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' },
  addIcon: { fontSize: 24, color: '#009688' },
  addText: { fontSize: 14, color: '#009688', marginTop: 5 },

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

export default ProfilePage;
