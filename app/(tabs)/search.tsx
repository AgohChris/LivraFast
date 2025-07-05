import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { Text, Searchbar, Chip, Button, useTheme, IconButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { shadows } from '@/theme/theme';

const { width } = Dimensions.get('window');

// Mock data pour les résultats de recherche
const searchResults = [
  {
    id: '1',
    name: 'T-shirt Premium Cotton',
    category: 'T-shirts',
    price: '49 000',
    originalPrice: '69 000',
    rating: 4.5,
    reviews: 128,
    image: 'HTTPS://via.placeholder.com/150',
    discount: 29,
    inStock: true,
    fastDelivery: true,
  },
  {
    id: '2',
    name: 'Jeans Slim Fit',
    category: 'Pantalons',
    price: '89 000',
    originalPrice: '119 000',
    rating: 4.3,
    reviews: 95,
    image: 'HTTPS://via.placeholder.com/150',
    discount: 25,
    inStock: true,
    fastDelivery: false,
  },
  {
    id: '3',
    name: 'Pull en laine',
    category: 'Hauts',
    price: '59 000',
    originalPrice: '79 000',
    rating: 4.7,
    reviews: 203,
    image: 'HTTPS://via.placeholder.com/150',
    discount: 25,
    inStock: false,
    fastDelivery: true,
  },
  {
    id: '4',
    name: 'Veste en cuir',
    category: 'Vestes',
    price: '129 000',
    originalPrice: '159 000',
    rating: 4.6,
    reviews: 87,
    image: 'HTTPS://via.placeholder.com/150',
    discount: 19,
    inStock: true,
    fastDelivery: true,
  },
];

const categories = [
  { id: 1, name: 'T-shirts', icon: 'tshirt-crew' },
  { id: 2, name: 'Pantalons', icon: 'pants' },
  { id: 3, name: 'Hauts', icon: 'shirt' },
  { id: 4, name: 'Vestes', icon: 'jacket' },
  { id: 5, name: 'Chaussures', icon: 'shoe-heel' },
  { id: 6, name: 'Accessoires', icon: 'watch' },
];

// Filtres disponibles
const filters = {
  categories: ['Toutes', 'Vêtements Homme', 'Vêtements Femme', 'Vêtements Enfant', 'Pantalons Homme', 'Pantalons Femme', 'Pantalons Enfant', 'Chaussures Homme', 'Chaussures Femme', 'Chaussures Enfant', 'Habits Homme', 'Habits Femme', 'Habits Enfant'],
  priceRanges: ['Tous les prix', '0-50 000 CFA', '50 000-100 000 CFA', '100 000-200 000 CFA', '200 000 CFA+'],
  ratings: ['Toutes les notes', '4+ étoiles', '3+ étoiles'],
  availability: ['Tous', 'En stock', 'Livraison rapide'],
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'Toutes',
    priceRange: 'Tous les prix',
    rating: 'Toutes les notes',
    availability: 'Tous',
  });
  const [showFilters, setShowFilters] = useState(false);
  const theme = useTheme();
  
  // Animations
  const fadeAnim = useState(new Animated.Value(0))[0];
  const filterAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    Animated.timing(filterAnim, {
      toValue: showFilters ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const applyFilter = (filterType: string, value: string) => {
    setSelectedFilters(prev => ({ ...prev, [filterType]: value }));
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
              Recherche Mode
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Trouvez vos vêtements, chaussures et habits idéaux
            </Text>
          </View>
          <IconButton
            icon="tune"
            size={24}
            iconColor="white"
            onPress={toggleFilters}
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
        placeholder="Rechercher un vêtement, chaussure ou habit..."
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
        iconColor={theme.colors.primary}
        onSubmitEditing={() => setIsSearching(true)}
      />
    </Animated.View>
  );

  const renderFilters = () => (
    <Animated.View 
      style={[
        styles.filtersContainer,
        {
          opacity: filterAnim,
        }
      ]}
    >
      <LinearGradient
        colors={['#F8FAFC', '#F1F5F9']}
        style={styles.filtersGradient}
      >
        <Text variant="titleMedium" style={[styles.filterTitle, { color: theme.colors.onSurface }]}>
          Filtres
        </Text>
        
        <View style={styles.filterSection}>
          <Text variant="bodyMedium" style={[styles.filterLabel, { color: theme.colors.onSurfaceVariant }]}>
            Catégorie
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChips}>
            {filters.categories.map((category) => (
              <Chip
                key={category}
                selected={selectedFilters.category === category}
                onPress={() => applyFilter('category', category)}
                style={styles.filterChip}
                mode="outlined"
              >
                {category}
              </Chip>
            ))}
          </ScrollView>
        </View>

        <View style={styles.filterSection}>
          <Text variant="bodyMedium" style={[styles.filterLabel, { color: theme.colors.onSurfaceVariant }]}>
            Prix
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChips}>
            {filters.priceRanges.map((range) => (
              <Chip
                key={range}
                selected={selectedFilters.priceRange === range}
                onPress={() => applyFilter('priceRange', range)}
                style={styles.filterChip}
                mode="outlined"
              >
                {range}
              </Chip>
            ))}
          </ScrollView>
        </View>

        <View style={styles.filterSection}>
          <Text variant="bodyMedium" style={[styles.filterLabel, { color: theme.colors.onSurfaceVariant }]}>
            Note
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChips}>
            {filters.ratings.map((rating) => (
              <Chip
                key={rating}
                selected={selectedFilters.rating === rating}
                onPress={() => applyFilter('rating', rating)}
                style={styles.filterChip}
                mode="outlined"
              >
                {rating}
              </Chip>
            ))}
          </ScrollView>
        </View>

        <View style={styles.filterActions}>
          <Button
            mode="outlined"
            onPress={() => setSelectedFilters({
              category: 'Toutes',
              priceRange: 'Tous les prix',
              rating: 'Toutes les notes',
              availability: 'Tous',
            })}
            style={styles.resetButton}
          >
            Réinitialiser
          </Button>
          <Button
            mode="contained"
            onPress={toggleFilters}
            style={styles.applyButton}
          >
            Appliquer
          </Button>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  const renderSearchResults = () => (
    <View style={styles.resultsContainer}>
      <View style={styles.resultsHeader}>
        <Text variant="headlineSmall" style={[styles.resultsTitle, { color: theme.colors.onSurface }]}>
          Résultats ({searchResults.length})
        </Text>
        <Button
          mode="text"
          onPress={() => console.log('Trier')}
          icon="sort"
        >
          Trier
        </Button>
      </View>
      
      <View style={styles.resultsGrid}>
        {searchResults.map((product, index) => (
          <Animated.View
            key={product.id}
            style={[
              styles.productCard,
              {
                opacity: fadeAnim,
              }
            ]}
          >
            <TouchableOpacity
              style={styles.productTouchable}
              onPress={() => router.push(`/product/${product.id}` as any)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#FFFFFF', '#F8FAFC']}
                style={styles.productGradient}
              >
                <View style={styles.productImageContainer}>
                  <View style={styles.productImage} />
                  {product.discount > 0 && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>-{product.discount}%</Text>
                    </View>
                  )}
                  {!product.inStock && (
                    <View style={styles.outOfStockBadge}>
                      <Text style={styles.outOfStockText}>Rupture</Text>
                    </View>
                  )}
                  {product.fastDelivery && (
                    <View style={styles.fastDeliveryBadge}>
                      <Text style={styles.fastDeliveryText}>⚡ Rapide</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.productContent}>
                  <Text variant="titleMedium" style={[styles.productName, { color: theme.colors.onSurface }]} numberOfLines={2}>
                    {product.name}
                  </Text>
                  
                  <View style={styles.productRating}>
                    <Text variant="bodySmall" style={{ color: '#F59E0B' }}>
                      ⭐ {product.rating} ({product.reviews})
                    </Text>
                  </View>
                  
                  <View style={styles.productPrice}>
                    <Text variant="titleLarge" style={[styles.currentPrice, { color: theme.colors.primary }]}>
                      {product.price}
                    </Text>
                    {product.originalPrice !== product.price && (
                      <Text variant="bodyMedium" style={[styles.originalPrice, { color: theme.colors.onSurfaceVariant }]}>
                        {product.originalPrice}
                      </Text>
                    )}
                  </View>
                  
                  <Chip mode="outlined" style={styles.categoryChip}>
                    {product.category}
                  </Chip>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <Animated.View 
      style={[
        styles.emptyState,
        { 
          opacity: fadeAnim,
        }
      ]}
    >
      <LinearGradient
        colors={['#F8FAFC', '#F1F5F9']}
        style={styles.emptyStateGradient}
      >
        <Text style={styles.emptyStateIcon}>🔍</Text>
        <Text variant="headlineSmall" style={[styles.emptyStateTitle, { color: theme.colors.onSurface }]}>
          Aucun résultat trouvé
        </Text>
        <Text variant="bodyLarge" style={[styles.emptyStateText, { color: theme.colors.onSurfaceVariant }]}>
          Essayez de modifier vos critères de recherche
        </Text>
        <Button
          mode="contained"
          onPress={() => setSearchQuery('')}
          style={styles.clearSearchButton}
        >
          Effacer la recherche
        </Button>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {renderHeader()}
        {renderSearchBar()}
        {showFilters && renderFilters()}
        {isSearching ? (
          searchResults.length > 0 ? renderSearchResults() : renderEmptyState()
        ) : (
          <View style={styles.initialState}>
            <Text variant="headlineSmall" style={[styles.initialTitle, { color: theme.colors.onSurface }]}>
              Que cherchez-vous ?
            </Text>
            <Text variant="bodyLarge" style={[styles.initialText, { color: theme.colors.onSurfaceVariant }]}>
              Utilisez la barre de recherche ci-dessus pour trouver vos produits
            </Text>
          </View>
        )}
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
  filtersContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
    overflow: 'hidden',
  },
  filtersGradient: {
    borderRadius: 20,
    padding: 20,
    ...shadows.medium,
  },
  filterTitle: {
    fontWeight: '700',
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    marginBottom: 12,
    fontWeight: '600',
  },
  filterChips: {
    flexDirection: 'row',
  },
  filterChip: {
    marginRight: 8,
    borderRadius: 12,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 12,
  },
  applyButton: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 12,
  },
  resultsContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultsTitle: {
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  resultsGrid: {
    gap: 16,
  },
  productCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    ...shadows.large,
  },
  productTouchable: {
    width: '100%',
  },
  productGradient: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  productImageContainer: {
    position: 'relative',
    height: 120,
  },
  productImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E2E8F0',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#6B7280',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  outOfStockText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  fastDeliveryBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  fastDeliveryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  productContent: {
    padding: 16,
  },
  productName: {
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 20,
  },
  productRating: {
    marginBottom: 8,
  },
  productPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  currentPrice: {
    fontWeight: '700',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    fontSize: 14,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    borderRadius: 12,
  },
  emptyState: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  emptyStateGradient: {
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    ...shadows.medium,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateText: {
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  clearSearchButton: {
    borderRadius: 12,
  },
  initialState: {
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  initialTitle: {
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  initialText: {
    textAlign: 'center',
    lineHeight: 24,
  },
}); 