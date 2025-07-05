import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { Text, Searchbar, Chip, useTheme, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { shadows } from '@/theme/theme';

const { width } = Dimensions.get('window');

// Mock data pour les catégories avec plus de détails
const categories = [
  { 
    id: 1, 
    name: 'Vêtements Homme', 
    icon: 'account', 
    gradient: ['#6366F1', '#8B5CF6'],
    productCount: 1247,
    description: 'T-shirts, chemises, pulls, vestes pour hommes'
  },
  { 
    id: 2, 
    name: 'Vêtements Femme', 
    icon: 'account-heart', 
    gradient: ['#EC4899', '#F472B6'],
    productCount: 892,
    description: 'Tops, robes, chemisiers, cardigans pour femmes'
  },
  { 
    id: 3, 
    name: 'Vêtements Enfant', 
    icon: 'baby-face', 
    gradient: ['#10B981', '#34D399'],
    productCount: 567,
    description: 'Vêtements pour bébés et enfants de tous âges'
  },
  { 
    id: 4, 
    name: 'Pantalons Homme', 
    icon: 'tshirt-crew', 
    gradient: ['#F59E0B', '#FBBF24'],
    productCount: 1234,
    description: 'Jeans, chinos, pantalons de travail pour hommes'
  },
  { 
    id: 5, 
    name: 'Pantalons Femme', 
    icon: 'dresser', 
    gradient: ['#8B5CF6', '#A855F7'],
    productCount: 345,
    description: 'Jeans, leggings, pantalons élégants pour femmes'
  },
  { 
    id: 6, 
    name: 'Pantalons Enfant', 
    icon: 'human-child', 
    gradient: ['#EC4899', '#F472B6'],
    productCount: 678,
    description: 'Pantalons et shorts pour enfants et adolescents'
  },
  { 
    id: 7, 
    name: 'Chaussures Homme', 
    icon: 'shoe-formal', 
    gradient: ['#3B82F6', '#60A5FA'],
    productCount: 456,
    description: 'Sneakers, chaussures de ville, bottes pour hommes'
  },
  { 
    id: 8, 
    name: 'Chaussures Femme', 
    icon: 'shoe-heel', 
    gradient: ['#059669', '#10B981'],
    productCount: 789,
    description: 'Talons, ballerines, sneakers pour femmes'
  },
  { 
    id: 9, 
    name: 'Chaussures Enfant', 
    icon: 'shoe-print', 
    gradient: ['#F59E0B', '#FBBF24'],
    productCount: 234,
    description: 'Chaussures confortables pour enfants et bébés'
  },
  { 
    id: 10, 
    name: 'Habits Homme', 
    icon: 'hanger', 
    gradient: ['#6366F1', '#8B5CF6'],
    productCount: 123,
    description: 'Manteaux, blousons, vestes pour hommes'
  },
  { 
    id: 11, 
    name: 'Habits Femme', 
    icon: 'hanger', 
    gradient: ['#EC4899', '#F472B6'],
    productCount: 567,
    description: 'Manteaux, blousons, vestes pour femmes'
  },
  { 
    id: 12, 
    name: 'Habits Enfant', 
    icon: 'hanger', 
    gradient: ['#10B981', '#34D399'],
    productCount: 89,
    description: 'Manteaux, blousons, vestes pour enfants'
  },
];

export default function CategoriesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const theme = useTheme();
  
  // Animations
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryPress = (categoryId: number) => {
    setSelectedCategory(categoryId);
    // Navigation vers les produits de cette catégorie
    router.push('/(tabs)/explore' as any);
  };

  const renderHeader = () => (
    <Animated.View 
      style={[
        styles.header,
        { 
          opacity: fadeAnim,
        }
      ]}
    >
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text variant="displaySmall" style={styles.title}>
              Catégories Mode
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Découvrez nos vêtements, chaussures et habits par catégorie
            </Text>
          </View>
          <IconButton
            icon="arrow-left"
            size={24}
            iconColor="white"
            onPress={() => router.back()}
          />
        </View>
      </LinearGradient>
    </Animated.View>
  );

  const renderSearchBar = () => (
    <Animated.View 
      style={[
        styles.searchContainer,
        { 
          opacity: fadeAnim,
        }
      ]}
    >
      <Searchbar
        placeholder="Rechercher une catégorie..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor={theme.colors.primary}
      />
    </Animated.View>
  );

  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      <Text variant="headlineSmall" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
        Toutes les catégories ({filteredCategories.length})
      </Text>
      <View style={styles.categoriesGrid}>
        {filteredCategories.map((category, index) => (
          <Animated.View
            key={category.id}
            style={[
              styles.categoryCard,
              {
                opacity: fadeAnim,
              }
            ]}
          >
            <TouchableOpacity
              style={styles.categoryTouchable}
              onPress={() => handleCategoryPress(category.id)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={category.gradient as [string, string]}
                style={styles.categoryCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <IconButton
                  icon={category.icon}
                  size={48}
                  iconColor="white"
                  style={styles.categoryIcon}
                />
                <Text style={styles.categoryName}>
                  {category.name}
                </Text>
                <Text style={styles.categoryDescription}>
                  {category.description}
                </Text>
                <View style={styles.categoryStats}>
                  <Text style={styles.productCount}>
                    {category.productCount} produits
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );

  const renderPopularCategories = () => (
    <View style={styles.section}>
      <Text variant="headlineSmall" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
        Catégories populaires
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.popularContainer}
        contentContainerStyle={styles.popularContent}
      >
        {categories.slice(0, 6).map((category, index) => (
          <Animated.View
            key={category.id}
            style={{
              opacity: fadeAnim,
            }}
          >
            <TouchableOpacity
              style={styles.popularCard}
              onPress={() => handleCategoryPress(category.id)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={category.gradient as [string, string]}
                style={styles.popularGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <IconButton
                  icon={category.icon}
                  size={36}
                  iconColor="white"
                  style={styles.popularIcon}
                />
                <Text style={styles.popularName}>
                  {category.name}
                </Text>
                <Text style={styles.popularCount}>
                  {category.productCount} produits
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {renderHeader()}
        {renderSearchBar()}
        {renderPopularCategories()}
        {renderCategories()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    marginBottom: 20,
  },
  headerGradient: {
    padding: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    color: 'white',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    elevation: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontWeight: '700',
    marginHorizontal: 20,
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  popularContainer: {
    paddingLeft: 20,
  },
  popularContent: {
    paddingRight: 20,
  },
  popularCard: {
    width: 140,
    height: 140,
    borderRadius: 20,
    marginRight: 16,
    overflow: 'hidden',
    ...shadows.medium,
  },
  popularGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popularIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  popularName: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
  popularCount: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  categoriesGrid: {
    gap: 16,
  },
  categoryCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    ...shadows.large,
  },
  categoryTouchable: {
    width: '100%',
  },
  categoryIcon: {
    marginBottom: 16,
    alignSelf: 'center',
  },
  categoryName: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  categoryDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  categoryStats: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  productCount: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
}); 