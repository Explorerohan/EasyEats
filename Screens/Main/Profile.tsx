import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
  ImageBackground,
  Modal,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import rohan from '../../assets/rohan.jpg';
import pasta2 from '../../assets/pasta.webp';
import curry from '../../assets/curry.webp';
import beef from '../../assets/beef.jpg';

type RootStackParamList = {
  Profile: undefined;
  Home: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface ProfileProps {
  navigation: ProfileScreenNavigationProp;
}

type IconName = keyof typeof Ionicons.glyphMap;

interface StatItem {
  label: string;
  value: string;
  icon: IconName;
}

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

export default function Profile({ navigation }: ProfileProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const settingsOptions = [
    { icon: 'create-outline', label: 'Edit Profile', color: '#007AFF' },
    { icon: 'add-circle-outline', label: 'New Recipe', color: '#4CAF50' },
    { icon: 'bookmark-outline', label: 'Saved Recipes', color: '#FF9800' },
    { icon: 'heart-outline', label: 'Favorites', color: '#F44336' },
    { icon: 'notifications-outline', label: 'Notifications', color: '#9C27B0' },
    { icon: 'share-social-outline', label: 'Share Profile', color: '#00BCD4' },
    { icon: 'help-circle-outline', label: 'Help & Support', color: '#795548' },
    { icon: 'log-out-outline', label: 'Logout', color: '#FF3B30' },
  ] as const;

  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideAnim = useRef(new Animated.Value(-height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const animate = (show: boolean): Promise<void> => {
    return new Promise((resolve) => {
      setIsAnimating(true);
      if (show) {
        setIsSettingsVisible(true);
      }
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: show ? 1 : 0,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(slideAnim, {
          toValue: show ? 0 : -height,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start(({ finished }) => {
        if (!show && finished) {
          setTimeout(() => {
            setIsSettingsVisible(false);
            setIsAnimating(false);
          }, 50);
        } else {
          setIsAnimating(false);
        }
        resolve();
      });
    });
  };

  const showSettings = async () => {
    try {
      await animate(true);
    } catch (error) {
      console.warn('Animation error:', error);
      setIsSettingsVisible(false);
    }
  };

  const hideSettings = async () => {
    try {
      await animate(false);
    } catch (error) {
      console.warn('Animation error:', error);
      setIsSettingsVisible(false);
    }
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handleSettingsAction = async (label: string) => {
    try {
      await hideSettings();
      // Handle different settings actions
      switch (label) {
        case 'Logout':
          // Handle logout
          break;
        case 'Edit Profile':
          // Navigate to edit profile
          break;
        // Add other cases as needed
      }
    } catch (error) {
      console.warn('Settings action error:', error);
    }
  };

  const stats: StatItem[] = [
    { label: 'Recipes', value: '24', icon: 'restaurant' as IconName },
    { label: 'Followers', value: '1.2K', icon: 'people' as IconName },
    { label: 'Following', value: '86', icon: 'person-add' as IconName },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={styles.scrollView}
        scrollEnabled={!isSettingsVisible}
        onScroll={(event) => {
          setScrollPosition(event.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}
      >
        {/* Header with Background */}
        <ImageBackground
          source={pasta2}
          style={styles.headerBackground}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
            style={styles.headerGradient}
          >
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#FFF" />
              </TouchableOpacity>
              <View>
                <TouchableOpacity 
                  style={styles.settingsButton}
                  onPress={isSettingsVisible ? hideSettings : showSettings}
                >
                  <Ionicons name="settings-outline" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        {/* Settings Menu */}
        {(isSettingsVisible || isAnimating) && (
          <View style={[styles.menuContainer, { top: scrollPosition }]}>
            <Animated.View 
              style={[
                styles.overlay,
                {
                  opacity: fadeAnim,
                  top: -scrollPosition,
                }
              ]}
            >
              <TouchableOpacity 
                style={styles.fullSize}
                onPress={hideSettings}
                activeOpacity={1}
              />
            </Animated.View>
            <Animated.View 
              style={[
                styles.settingsMenu,
                {
                  transform: [{ translateY: slideAnim }],
                  opacity: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ]}
            >
              <View style={styles.settingsContent}>
                <View style={styles.settingsHeader}>
                  <Text style={styles.settingsHeaderText}>Settings</Text>
                  <TouchableOpacity 
                    style={styles.closeButton} 
                    onPress={hideSettings}
                  >
                    <Ionicons name="close" size={24} color="#1A1A1A" />
                  </TouchableOpacity>
                </View>
                <View style={styles.settingsItems}>
                  {settingsOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.settingsItem,
                        index === settingsOptions.length - 1 && { borderBottomWidth: 0 }
                      ]}
                      onPress={() => handleSettingsAction(option.label)}
                    >
                      <View style={[styles.settingsIconContainer, { backgroundColor: `${option.color}10` }]}>
                        <Ionicons name={option.icon as IconName} size={22} color={option.color} />
                      </View>
                      <Text style={styles.settingsItemText}>{option.label}</Text>
                      <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Animated.View>
          </View>
        )}

        {/* Profile Info - Elevated Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileSection}>
            <Image source={rohan} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Rohan</Text>
              <Text style={styles.bio}>Passionate food creator</Text>
              
              <View style={styles.statsContainer}>
                {stats.map((stat, index) => (
                  <TouchableOpacity key={index} style={styles.statItem}>
                    <View style={styles.statIconContainer}>
                      <Ionicons name={stat.icon} size={20} color="#007AFF" />
                    </View>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* My Recipes Section */}
        <View style={styles.recipesSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="restaurant" size={24} color="#1A1A1A" />
              <Text style={styles.sectionTitle}>My Recipes</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recipesContainer}
            decelerationRate="fast"
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment="center"
          >
            {/* Recipe Cards */}
            <TouchableOpacity style={[styles.recipeCard, { width: CARD_WIDTH }]}>
              <Image source={pasta2} style={styles.recipeImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                style={styles.recipeGradient}
              >
                <View style={styles.recipeInfo}>
                  <View style={styles.recipeBadge}>
                    <Text style={styles.recipeBadgeText}>Italian</Text>
                  </View>
                  <Text style={styles.recipeTitle}>Italian Pasta</Text>
                  <View style={styles.recipeStats}>
                    <View style={styles.recipeStat}>
                      <Ionicons name="time-outline" size={16} color="#fff" />
                      <Text style={styles.recipeStatText}>30m</Text>
                    </View>
                    <View style={styles.recipeStat}>
                      <Ionicons name="heart" size={16} color="#FF3B30" />
                      <Text style={styles.recipeStatText}>128</Text>
                    </View>
                    <View style={styles.recipeStat}>
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text style={styles.recipeStatText}>4.8</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.recipeCard, { width: CARD_WIDTH }]}>
              <Image source={curry} style={styles.recipeImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                style={styles.recipeGradient}
              >
                <View style={styles.recipeInfo}>
                  <View style={[styles.recipeBadge, styles.indianBadge]}>
                    <Text style={styles.recipeBadgeText}>Indian</Text>
                  </View>
                  <Text style={styles.recipeTitle}>Chicken Curry</Text>
                  <View style={styles.recipeStats}>
                    <View style={styles.recipeStat}>
                      <Ionicons name="time-outline" size={16} color="#fff" />
                      <Text style={styles.recipeStatText}>45m</Text>
                    </View>
                    <View style={styles.recipeStat}>
                      <Ionicons name="heart" size={16} color="#FF3B30" />
                      <Text style={styles.recipeStatText}>96</Text>
                    </View>
                    <View style={styles.recipeStat}>
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text style={styles.recipeStatText}>4.6</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.recipeCard, { width: CARD_WIDTH }]}>
              <Image source={beef} style={styles.recipeImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                style={styles.recipeGradient}
              >
                <View style={styles.recipeInfo}>
                  <View style={[styles.recipeBadge, styles.mexicanBadge]}>
                    <Text style={styles.recipeBadgeText}>Mexican</Text>
                  </View>
                  <Text style={styles.recipeTitle}>Beef Tacos</Text>
                  <View style={styles.recipeStats}>
                    <View style={styles.recipeStat}>
                      <Ionicons name="time-outline" size={16} color="#fff" />
                      <Text style={styles.recipeStatText}>25m</Text>
                    </View>
                    <View style={styles.recipeStat}>
                      <Ionicons name="heart" size={16} color="#FF3B30" />
                      <Text style={styles.recipeStatText}>156</Text>
                    </View>
                    <View style={styles.recipeStat}>
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text style={styles.recipeStatText}>4.9</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Recipe Collections Section */}
        <View style={styles.collectionsSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="grid" size={24} color="#1A1A1A" />
              <Text style={styles.sectionTitle}>Recipe Collections</Text>
            </View>
          </View>
          
          <View style={styles.collectionsGrid}>
            <TouchableOpacity style={styles.collectionCard}>
              <LinearGradient
                colors={['#FF6B6B', '#EE5D5D']}
                style={styles.collectionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.collectionContent}>
                  <View style={styles.collectionIconContainer}>
                    <Ionicons name="flame" size={24} color="#FFF" />
                  </View>
                  <Text style={styles.collectionTitle}>Popular</Text>
                  <Text style={styles.collectionCount}>12 recipes</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.collectionCard}>
              <LinearGradient
                colors={['#4ECDC4', '#45B7AF']}
                style={styles.collectionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.collectionContent}>
                  <View style={styles.collectionIconContainer}>
                    <Ionicons name="time" size={24} color="#FFF" />
                  </View>
                  <Text style={styles.collectionTitle}>Quick & Easy</Text>
                  <Text style={styles.collectionCount}>8 recipes</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.collectionCard}>
              <LinearGradient
                colors={['#FFD93D', '#F4C724']}
                style={styles.collectionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.collectionContent}>
                  <View style={styles.collectionIconContainer}>
                    <Ionicons name="star" size={24} color="#FFF" />
                  </View>
                  <Text style={styles.collectionTitle}>Favorites</Text>
                  <Text style={styles.collectionCount}>15 recipes</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.collectionCard}>
              <LinearGradient
                colors={['#6C5CE7', '#5D4ED8']}
                style={styles.collectionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.collectionContent}>
                  <View style={styles.collectionIconContainer}>
                    <Ionicons name="leaf" size={24} color="#FFF" />
                  </View>
                  <Text style={styles.collectionTitle}>Healthy</Text>
                  <Text style={styles.collectionCount}>6 recipes</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.createCollectionButton}>
            <View style={styles.createCollectionContent}>
              <Ionicons name="add-circle" size={20} color="#007AFF" />
              <Text style={styles.createCollectionText}>Create New Collection</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  headerBackground: {
    height: 220,
  },
  headerGradient: {
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginTop: -50,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  profileSection: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -70,
    borderWidth: 4,
    borderColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    padding: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  recipesSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  recipesContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  recipeCard: {
    height: 320,
    marginRight: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  recipeGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    padding: 20,
    justifyContent: 'flex-end',
  },
  recipeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    marginBottom: 8,
  },
  indianBadge: {
    backgroundColor: '#FF9500',
  },
  mexicanBadge: {
    backgroundColor: '#FF3B30',
  },
  recipeBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  recipeInfo: {
    gap: 8,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  recipeStats: {
    flexDirection: 'row',
    gap: 16,
  },
  recipeStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recipeStatText: {
    color: '#FFF',
    fontSize: 14,
  },
  collectionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  collectionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  collectionCard: {
    width: (width - 52) / 2,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  collectionGradient: {
    flex: 1,
    padding: 16,
  },
  collectionContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  collectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  collectionCount: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  createCollectionButton: {
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#E8F2FF',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  createCollectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  createCollectionText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 100,
  },
  fullSize: {
    width: '100%',
    height: '100%',
  },
  settingsMenu: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: Platform.OS === 'android' ? 160 : 180,
    bottom: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 101,
  },
  settingsContent: {
    backgroundColor: '#FFF',
    overflow: 'hidden',
    height: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  settingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  settingsItems: {
    paddingVertical: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingsHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  closeButton: {
    padding: 8,
    marginRight: -8,
    borderRadius: 20,
  },
  settingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingsItemText: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
});
