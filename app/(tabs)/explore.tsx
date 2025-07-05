import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Card, Chip, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Catégories de vêtements
const categories = [
  {
    id: 1,
    name: 'Hommes',
    icon: 'account',
    color: '#3498db',
    description: 'Vêtements pour hommes',
    itemCount: 156,
  },
  {
    id: 2,
    name: 'Femmes',
    icon: 'account',
    color: '#e74c3c',
    description: 'Vêtements pour femmes',
    itemCount: 234,
  },
  {
    id: 3,
    name: 'Enfants',
    icon: 'baby-face',
    color: '#f39c12',
    description: 'Vêtements pour enfants',
    itemCount: 89,
  },
  {
    id: 4,
    name: 'Sport',
    icon: 'run',
    color: '#27ae60',
    description: 'Vêtements de sport',
    itemCount: 67,
  },
  {
    id: 5,
    name: 'Accessoires',
    icon: 'watch',
    color: '#9b59b6',
    description: 'Accessoires de mode',
    itemCount: 123,
  },
  {
    id: 6,
    name: 'Chaussures',
    icon: 'shoe-print',
    color: '#34495e',
    description: 'Chaussures et baskets',
    itemCount: 98,
  },
];

// Collections populaires
const popularCollections = [
  {
    id: 1,
    name: 'Nouveautés',
    image: 'https://via.placeholder.com/300x200',
    itemCount: 45,
  },
  {
    id: 2,
    name: 'Promotions',
    image: 'https://via.placeholder.com/300x200',
    itemCount: 32,
  },
  {
    id: 3,
    name: 'Tendances',
    image: 'https://via.placeholder.com/300x200',
    itemCount: 67,
  },
];

export default function ExploreScreen() {
  const renderCategoryCard = (category: any) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryCard}
      onPress={() => {
        // Navigation vers la catégorie
        console.log(`Naviguer vers ${category.name}`);
      }}
    >
      <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
        <IconButton
          icon={category.icon}
          size={24}
          iconColor="white"
        />
      </View>
      <View style={styles.categoryInfo}>
        <Text variant="titleMedium" style={styles.categoryName}>
          {category.name}
        </Text>
        <Text variant="bodySmall" style={styles.categoryDescription}>
          {category.description}
        </Text>
        <Text variant="bodySmall" style={styles.itemCount}>
          {category.itemCount} articles
        </Text>
      </View>
      <IconButton
        icon="chevron-right"
        size={20}
        iconColor="#7f8c8d"
      />
    </TouchableOpacity>
  );

  const renderCollectionCard = (collection: any) => (
    <TouchableOpacity
      key={collection.id}
      style={styles.collectionCard}
      onPress={() => {
        // Navigation vers la collection
        console.log(`Naviguer vers ${collection.name}`);
      }}
    >
      <Card.Cover source={{ uri: collection.image }} style={styles.collectionImage} />
      <View style={styles.collectionOverlay}>
        <Text variant="titleMedium" style={styles.collectionName}>
          {collection.name}
        </Text>
        <Text variant="bodySmall" style={styles.collectionItemCount}>
          {collection.itemCount} articles
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Explorer
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Découvrez nos catégories et collections
          </Text>
        </View>

        {/* Collections populaires */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Collections populaires
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.collectionsScroll}>
            {popularCollections.map(renderCollectionCard)}
          </ScrollView>
        </View>

        {/* Catégories */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Catégories
          </Text>
          <View style={styles.categoriesContainer}>
            {categories.map(renderCategoryCard)}
          </View>
        </View>

        {/* Recherche rapide */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Recherche rapide
          </Text>
          <View style={styles.searchChips}>
            <Chip mode="outlined" style={styles.searchChip}>
              T-shirts
            </Chip>
            <Chip mode="outlined" style={styles.searchChip}>
              Jeans
            </Chip>
            <Chip mode="outlined" style={styles.searchChip}>
              Robes
            </Chip>
            <Chip mode="outlined" style={styles.searchChip}>
              Pulls
            </Chip>
            <Chip mode="outlined" style={styles.searchChip}>
              Vestes
            </Chip>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    color: '#7f8c8d',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#2c3e50',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  collectionsScroll: {
    paddingHorizontal: 20,
  },
  collectionCard: {
    width: 200,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  collectionImage: {
    height: 120,
  },
  collectionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
  },
  collectionName: {
    color: 'white',
    fontWeight: 'bold',
  },
  collectionItemCount: {
    color: '#bdc3c7',
    marginTop: 2,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 2,
  },
  categoryDescription: {
    color: '#7f8c8d',
    marginBottom: 4,
  },
  itemCount: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  searchChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 10,
  },
  searchChip: {
    marginBottom: 5,
  },
});
