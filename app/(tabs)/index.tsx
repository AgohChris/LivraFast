import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Animated } from 'react-native';
import { Text, Searchbar, Chip, Button, IconButton, useTheme, Badge } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCart } from '@/contexts/CartContext';
import { useThemeMode } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { shadows, categoryColors } from '@/theme/theme';
import { useResponsive } from '@/hooks/useResponsive';

const { width, height } = Dimensions.get('window');

// Mock data pour les catégories
const categories = [
  { id: 1, name: 'Vêtements Homme', icon: 'account', gradient: ['#6366F1', '#8B5CF6'] },
  { id: 2, name: 'Vêtements Femme', icon: 'account-heart', gradient: ['#EC4899', '#F472B6'] },
  { id: 3, name: 'Vêtements Enfant', icon: 'baby-face', gradient: ['#10B981', '#34D399'] },
  { id: 4, name: 'Pantalons Homme', icon: 'tshirt-crew', gradient: ['#F59E0B', '#FBBF24'] },
  { id: 5, name: 'Pantalons Femme', icon: 'dresser', gradient: ['#8B5CF6', '#A855F7'] },
  { id: 6, name: 'Pantalons Enfant', icon: 'human-child', gradient: ['#EC4899', '#F472B6'] },
  { id: 7, name: 'Chaussures Homme', icon: 'shoe-formal', gradient: ['#3B82F6', '#60A5FA'] },
  { id: 8, name: 'Chaussures Femme', icon: 'shoe-heel', gradient: ['#059669', '#10B981'] },
  { id: 9, name: 'Chaussures Enfant', icon: 'shoe-print', gradient: ['#F59E0B', '#FBBF24'] },
  { id: 10, name: 'Habits Homme', icon: 'hanger', gradient: ['#6366F1', '#8B5CF6'] },
  { id: 11, name: 'Habits Femme', icon: 'hanger', gradient: ['#EC4899', '#F472B6'] },
  { id: 12, name: 'Habits Enfant', icon: 'hanger', gradient: ['#10B981', '#34D399'] },
];

// Helper pour formater les prix en CFA
function formatCFA(price: number | string): string {
  // Accepte un nombre ou une string avec chiffre(s)
  const n = typeof price === 'string' ? parseInt(price.replace(/[^\d]/g, '')) : price;
  if (isNaN(n)) return '';
  return n.toLocaleString('fr-FR') + ' CFA';
}

// Mock data pour les articles en vedette
const featuredProducts = [
  {
    id: '1',
    name: 'T-shirt Premium Homme',
    price: 29000,
    originalPrice: 39000,
    image: 'HTTPS://via.placeholder.com/300x200',
    category: 'Vêtements Homme',
    rating: 4.8,
    reviews: 1247,
    discount: 26,
  },
  {
    id: '2',
    name: 'Jeans Slim Femme',
    price: 59000,
    originalPrice: 79000,
    image: 'HTTPS://via.placeholder.com/300x200',
    category: 'Pantalons Femme',
    rating: 4.6,
    reviews: 892,
    discount: 25,
  },
  {
    id: '3',
    name: 'Sneakers Sport Enfant',
    price: 39000,
    originalPrice: 49000,
    image: 'HTTPS://via.placeholder.com/300x200',
    category: 'Chaussures Enfant',
    rating: 4.7,
    reviews: 567,
    discount: 20,
  },
  {
    id: '4',
    name: 'Blouson Cuir Homme',
    price: 189000,
    originalPrice: 229000,
    image: 'HTTPS://via.placeholder.com/300x200',
    category: 'Habits Homme',
    rating: 4.9,
    reviews: 1234,
    discount: 17,
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [adminTapCount, setAdminTapCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const { getItemCount } = useCart();
  const { toggleTheme, themeMode } = useThemeMode();
  const responsive = useResponsive();
  
  // Animations
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}` as any);
  };

  const handleCategoryPress = (categoryId: number) => {
    router.push('/(tabs)/categories' as any);
  };

  const handleLogoPress = () => {
    const now = Date.now();
    const timeDiff = now - lastTapTime;
    
    // Réinitialiser le compteur si plus de 2 secondes se sont écoulées
    if (timeDiff > 2000) {
      setAdminTapCount(1);
    } else {
      setAdminTapCount(prev => prev + 1);
    }
    
    setLastTapTime(now);
    
    // Si 3 taps consécutifs, accéder à l'authentification admin
    if (adminTapCount + 1 >= 3) {
      setAdminTapCount(0);
      router.push('/admin/login' as any);
    }
  };

  const renderHeader = () => (
    <Animated.View 
      style={[
        styles.header,
        { 
          opacity: fadeAnim,
          padding: responsive.getPadding(responsive.isTablet ? 'xl' : 'lg'),
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
            <Text 
              variant="displaySmall" 
              style={[
                styles.title,
                { fontSize: responsive.getAdaptiveFontSize(28, 32) }
              ]}
              onPress={handleLogoPress}
            >
              LivraFast Mode
            </Text>
            <Text 
              variant="bodyLarge" 
              style={[
                styles.subtitle,
                { fontSize: responsive.getAdaptiveFontSize(16, 18) }
              ]}
            >
              Vêtements, chaussures et habits livrés rapidement
            </Text>
          </View>
          <View style={styles.headerActions}>
            <View style={styles.cartBadge}>
              <IconButton
                icon="cart"
                size={responsive.getAdaptiveSize(24, 28)}
                iconColor={theme.colors.onPrimary}
                onPress={() => router.push('/(tabs)/cart' as any)}
              />
              {getItemCount() > 0 && (
                <Badge style={styles.badge}>
                  {getItemCount()}
                </Badge>
              )}
            </View>
            <IconButton
              icon={themeMode === 'dark' ? 'weather-sunny' : 'weather-night'}
              size={responsive.getAdaptiveSize(24, 28)}
              iconColor={theme.colors.onPrimary}
              onPress={toggleTheme}
            />
          </View>
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
          paddingHorizontal: responsive.getPadding(responsive.isTablet ? 'xl' : 'lg'),
        }
      ]}
    >
      <Searchbar
        placeholder="Rechercher un vêtement, chaussure ou habit..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={[
          styles.searchBar,
          { 
            borderRadius: responsive.getBorderRadius('lg'),
            height: responsive.getHeight('input'),
          }
        ]}
        iconColor={theme.colors.primary}
      />
    </Animated.View>
  );

  const renderCategories = () => (
    <View style={styles.section}>
      <Text 
        variant="headlineSmall" 
        style={[
          styles.sectionTitle, 
          { 
            color: theme.colors.onSurface,
            fontSize: responsive.getAdaptiveFontSize(20, 24),
            marginHorizontal: responsive.getMargin(responsive.isTablet ? 'xl' : 'lg'),
          }
        ]}
      >
        Catégories populaires
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesContainer}
        contentContainerStyle={[
          styles.categoriesContent,
          { paddingHorizontal: responsive.getPadding(responsive.isTablet ? 'xl' : 'lg') }
        ]}
      >
        {categories.map((category, index) => (
          <Animated.View
            key={category.id}
            style={{
              opacity: fadeAnim,
            }}
          >
            <LinearGradient
              colors={category.gradient as [string, string]}
              style={[
                styles.categoryCard,
                {
                  width: responsive.getAdaptiveSize(120, 160),
                  height: responsive.getAdaptiveSize(120, 160),
                  borderRadius: responsive.getBorderRadius('xl'),
                  marginRight: responsive.getSpacing('md'),
                }
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconButton
                icon={category.icon}
                size={responsive.getAdaptiveSize(32, 40)}
                iconColor="white"
                style={styles.categoryIcon}
              />
              <Text style={[
                styles.categoryName,
                { fontSize: responsive.getAdaptiveFontSize(12, 14) }
              ]}>
                {category.name}
              </Text>
            </LinearGradient>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );

  const renderFeaturedProducts = () => {
    const productCardWidth = responsive.isTablet 
      ? (responsive.screenWidth - responsive.getSpacing('xl') * 2 - responsive.getSpacing('md')) / 2
      : (responsive.screenWidth - responsive.getSpacing('lg') * 2 - responsive.getSpacing('md')) / 2;

    return (
      <View style={styles.section}>
        <Text 
          variant="headlineSmall" 
          style={[
            styles.sectionTitle, 
            { 
              color: theme.colors.onSurface,
              fontSize: responsive.getAdaptiveFontSize(20, 24),
              marginHorizontal: responsive.getMargin(responsive.isTablet ? 'xl' : 'lg'),
            }
          ]}
        >
          Articles en vedette
        </Text>
        <View style={[
          styles.productsGrid,
          { 
            paddingHorizontal: responsive.getPadding(responsive.isTablet ? 'xl' : 'lg'),
            gap: responsive.getSpacing('md'),
          }
        ]}>
          {featuredProducts.map((product, index) => (
            <Animated.View
              key={product.id}
              style={[
                styles.productCard,
                {
                  width: productCardWidth,
                  opacity: fadeAnim,
                }
              ]}
            >
              <LinearGradient
                colors={['#FFFFFF', '#F8FAFC']}
                style={[
                  styles.productGradient,
                  { borderRadius: responsive.getBorderRadius('xl') }
                ]}
              >
                <View style={[
                  styles.productImageContainer,
                  { height: responsive.getAdaptiveSize(120, 160) }
                ]}>
                  <View style={styles.discountBadge}>
                    <Text style={[
                      styles.discountText,
                      { fontSize: responsive.getAdaptiveFontSize(12, 14) }
                    ]}>-{product.discount}%</Text>
                  </View>
                  <View style={styles.productImage} />
                </View>
                <View style={[
                  styles.productContent,
                  { padding: responsive.getPadding('md') }
                ]}>
                  <Text 
                    variant="titleSmall" 
                    style={[
                      styles.productName, 
                      { 
                        color: theme.colors.onSurface,
                        fontSize: responsive.getAdaptiveFontSize(14, 16),
                      }
                    ]} 
                    numberOfLines={2}
                  >
                    {product.name}
                  </Text>
                  <View style={styles.productRating}>
                    <Text 
                      variant="bodySmall" 
                      style={{ 
                        color: '#F59E0B',
                        fontSize: responsive.getAdaptiveFontSize(12, 14)
                      }}
                    >
                      {product.rating} ({product.reviews})
                    </Text>
                  </View>
                  <View style={styles.productPrice}>
                    <Text 
                      variant="titleMedium" 
                      style={[
                        styles.currentPrice, 
                        { 
                          color: theme.colors.primary,
                          fontSize: responsive.getAdaptiveFontSize(16, 18)
                        }
                      ]}> 
                      {formatCFA(product.price)}
                    </Text>
                    <Text 
                      variant="bodySmall" 
                      style={[
                        styles.originalPrice, 
                        { 
                          color: theme.colors.onSurfaceVariant,
                          fontSize: responsive.getAdaptiveFontSize(14, 16)
                        }
                      ]}> 
                      {formatCFA(product.originalPrice)}
                    </Text>
                  </View>
                  <Chip 
                    mode="outlined" 
                    style={[
                      styles.categoryChip,
                      { borderRadius: responsive.getBorderRadius('md') }
                    ]} 
                    textStyle={[
                      styles.categoryChipText,
                      { fontSize: responsive.getAdaptiveFontSize(11, 13) }
                    ]}
                  >
                    {product.category}
                  </Chip>
                </View>
              </LinearGradient>
            </Animated.View>
          ))}
        </View>
      </View>
    );
  };

  const renderPromoSection = () => (
    <Animated.View 
      style={[
        styles.promoSection,
        { 
          opacity: fadeAnim,
          paddingHorizontal: responsive.getPadding(responsive.isTablet ? 'xl' : 'lg'),
        }
      ]}
    >
      <LinearGradient
        colors={['#F59E0B', '#F97316']}
        style={[
          styles.promoCard,
          { 
            borderRadius: responsive.getBorderRadius('xxl'),
            padding: responsive.getPadding('xl'),
          }
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.promoContent}>
          <Text 
            variant="headlineSmall" 
            style={[
              styles.promoTitle,
              { fontSize: responsive.getAdaptiveFontSize(20, 24) }
            ]}
          >
            Livraison gratuite
          </Text>
          <Text 
            variant="bodyLarge" 
            style={[
              styles.promoText,
              { fontSize: responsive.getAdaptiveFontSize(16, 18) }
            ]}
          >
            Pour toute commande supérieure à 50 000 CFA
          </Text>
          <Button
            mode="contained"
            onPress={() => console.log('Voir les conditions')}
            style={[
              styles.promoButton,
              { 
                borderRadius: responsive.getBorderRadius('md'),
                height: responsive.getHeight('button'),
              }
            ]}
            textColor={theme.colors.onSecondary}
          >
            Voir les conditions
          </Button>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {renderHeader()}
        {renderSearchBar()}
        {renderCategories()}
        {renderFeaturedProducts()}
        {renderPromoSection()}
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchBar: {
    elevation: 8,
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
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  categoriesContainer: {
    paddingLeft: 0,
  },
  categoriesContent: {
    paddingRight: 0,
  },
  categoryCard: {
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  categoryIcon: {
    marginBottom: 8,
    alignSelf: 'center',
  },
  categoryName: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    ...shadows.large,
  },
  productGradient: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  productImageContainer: {
    position: 'relative',
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
    fontWeight: '600',
  },
  productContent: {
    padding: 16,
  },
  productName: {
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 18,
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
  },
  categoryChip: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    marginTop: 4,
  },
  categoryChipText: {
    fontWeight: '500',
  },
  promoSection: {
    marginBottom: 32,
  },
  promoCard: {
    borderRadius: 24,
    ...shadows.large,
  },
  promoContent: {
    alignItems: 'center',
  },
  promoTitle: {
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  promoText: {
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 16,
  },
  promoButton: {
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});
