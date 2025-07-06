import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Chip, Divider, IconButton, Badge, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import Notification from '@/components/Notification';
import { useCart } from '@/contexts/CartContext';
import { useResponsive } from '@/hooks/useResponsive';

const { width } = Dimensions.get('window');

// Mock data pour le produit (vêtement)
const product = {
  id: '1',
  name: 'T-shirt Premium Homme',
  price: 29,
  originalPrice: 39,
  description: 'T-shirt en coton bio de haute qualité, coupe moderne et confortable. Idéal pour un usage quotidien ou occasionnel. Matériau respirant et durable.',
  category: 'Vêtements Homme',
  brand: 'LivraFast',
  rating: 4.8,
  reviews: 1247,
  inStock: true,
  stockCount: 23,
  images: [
    'HTTPS://via.placeholder.com/400x300',
    'HTTPS://via.placeholder.com/400x300',
    'HTTPS://via.placeholder.com/400x300',
  ],
  specs: {
    'Matériau': '100% Coton bio',
    'Entretien': 'Lavage machine 30°C',
    'Couleur': 'Blanc, Noir, Bleu, Gris',
    'Taille': 'S, M, L, XL, XXL',
    'Style': 'Casual, Moderne',
  },
  colors: ['Blanc', 'Noir', 'Bleu', 'Gris'],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]); // L par défaut
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const theme = useTheme();
  const { addItem } = useCart();
  const responsive = useResponsive();

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
    };
    
    addItem(cartItem);
    setNotificationMessage(`${product.name} ajouté au panier !`);
    setShowNotification(true);
  };

  const buyNow = () => {
    // Ajouter au panier puis aller directement au checkout
    handleAddToCart();
    router.push('/checkout');
  };

  const goBack = () => {
    router.back();
  };

  const goHome = () => {
    router.push('/(tabs)');
  };

  const renderImageGallery = () => (
    <View style={styles.imageContainer}>
      <Card.Cover 
        source={{ uri: product.images[currentImageIndex] }} 
        style={[
          styles.mainImage,
          { height: responsive.getAdaptiveSize(300, 400) }
        ]}
      />
      <View style={[
        styles.imageThumbnails,
        { 
          paddingHorizontal: responsive.getPadding('lg'),
          gap: responsive.getSpacing('sm'),
        }
      ]}>
        {product.images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setCurrentImageIndex(index)}
          >
            <Card.Cover
              source={{ uri: image }}
              style={[
                styles.thumbnail,
                {
                  width: responsive.getAdaptiveSize(60, 80),
                  height: responsive.getAdaptiveSize(60, 80),
                  borderRadius: responsive.getBorderRadius('sm'),
                },
                currentImageIndex === index && styles.selectedThumbnail
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderProductInfo = () => (
    <View style={styles.productInfo}>
      <View style={styles.headerRow}>
        <Text 
          variant="headlineSmall" 
          style={[
            styles.productName, 
            { 
              color: theme.colors.onSurface,
              fontSize: responsive.getAdaptiveFontSize(20, 24),
            }
          ]}
        >
          {product.name}
        </Text>
        <Badge style={styles.discountBadge}>
          {`-${discount}%`}
        </Badge>
      </View>
      
      <View style={styles.priceRow}>
        <Text 
          variant="headlineMedium" 
          style={[
            styles.currentPrice, 
            { 
              color: theme.colors.error,
              fontSize: responsive.getAdaptiveFontSize(24, 28),
            }
          ]}
        >
          {product.price.toLocaleString()} CFA
        </Text>
        <Text 
          variant="titleMedium" 
          style={[
            styles.originalPrice, 
            { 
              color: theme.colors.onSurfaceVariant,
              fontSize: responsive.getAdaptiveFontSize(18, 20),
            }
          ]}
        >
          {product.originalPrice.toLocaleString()} CFA
        </Text>
      </View>

      <View style={styles.ratingRow}>
        <Text 
          variant="bodyMedium" 
          style={[
            styles.rating, 
            { 
              color: '#f39c12',
              fontSize: responsive.getAdaptiveFontSize(14, 16),
            }
          ]}
        >
          {product.rating} ({product.reviews} avis)
        </Text>
        <Chip 
          mode="outlined" 
          style={[
            styles.categoryChip,
            { borderRadius: responsive.getBorderRadius('md') }
          ]}
        >
          {product.category}
        </Chip>
      </View>

      <Text 
        variant="bodyMedium" 
        style={[
          styles.description, 
          { 
            color: theme.colors.onSurface,
            fontSize: responsive.getAdaptiveFontSize(14, 16),
            lineHeight: responsive.getAdaptiveSize(22, 24),
          }
        ]}
      >
        {product.description}
      </Text>
    </View>
  );

  const renderOptions = () => (
    <View style={styles.optionsContainer}>
      <Text 
        variant="titleMedium" 
        style={[
          styles.sectionTitle, 
          { 
            color: theme.colors.onSurface,
            fontSize: responsive.getAdaptiveFontSize(18, 20),
          }
        ]}
      >
        Couleur
      </Text>
      <View style={[
        styles.colorOptions,
        { gap: responsive.getSpacing('sm') }
      ]}>
        {product.colors.map((color) => (
          <Chip
            key={color}
            mode={selectedColor === color ? 'flat' : 'outlined'}
            onPress={() => setSelectedColor(color)}
            style={[
              styles.colorChip,
              { borderRadius: responsive.getBorderRadius('md') }
            ]}
          >
            {color}
          </Chip>
        ))}
      </View>

      <Text 
        variant="titleMedium" 
        style={[
          styles.sectionTitle, 
          { 
            color: theme.colors.onSurface,
            fontSize: responsive.getAdaptiveFontSize(18, 20),
          }
        ]}
      >
        Taille
      </Text>
      <View style={[
        styles.sizeOptions,
        { gap: responsive.getSpacing('sm') }
      ]}>
        {product.sizes.map((size) => (
          <Chip
            key={size}
            mode={selectedSize === size ? 'flat' : 'outlined'}
            onPress={() => setSelectedSize(size)}
            style={[
              styles.sizeChip,
              { borderRadius: responsive.getBorderRadius('md') }
            ]}
          >
            {size}
          </Chip>
        ))}
      </View>

      <Text 
        variant="titleMedium" 
        style={[
          styles.sectionTitle, 
          { 
            color: theme.colors.onSurface,
            fontSize: responsive.getAdaptiveFontSize(18, 20),
          }
        ]}
      >
        Quantité
      </Text>
      <View style={styles.quantityContainer}>
        <IconButton
          icon="minus"
          size={responsive.getAdaptiveSize(24, 28)}
          onPress={() => setQuantity(Math.max(1, quantity - 1))}
        />
        <Text 
          variant="titleLarge" 
          style={[
            styles.quantityText, 
            { 
              color: theme.colors.onSurface,
              fontSize: responsive.getAdaptiveFontSize(20, 24),
            }
          ]}
        >
          {quantity}
        </Text>
        <IconButton
          icon="plus"
          size={responsive.getAdaptiveSize(24, 28)}
          onPress={() => setQuantity(quantity + 1)}
        />
      </View>
    </View>
  );

  const renderSpecifications = () => (
    <View style={styles.specsContainer}>
      <Text 
        variant="titleMedium" 
        style={[
          styles.sectionTitle, 
          { 
            color: theme.colors.onSurface,
            fontSize: responsive.getAdaptiveFontSize(18, 20),
          }
        ]}
      >
        Caractéristiques
      </Text>
      {Object.entries(product.specs).map(([key, value]) => (
        <View key={key} style={styles.specRow}>
          <Text 
            variant="bodyMedium" 
            style={[
              styles.specKey, 
              { 
                color: theme.colors.onSurface,
                fontSize: responsive.getAdaptiveFontSize(14, 16),
              }
            ]}
          >
            {key}
          </Text>
          <Text 
            variant="bodyMedium" 
            style={[
              styles.specValue, 
              { 
                color: theme.colors.onSurfaceVariant,
                fontSize: responsive.getAdaptiveFontSize(14, 16),
              }
            ]}
          >
            {value}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header avec boutons de navigation */}
      <View style={[
        styles.header, 
        { 
          backgroundColor: theme.colors.surface,
          paddingHorizontal: responsive.getPadding('sm'),
          paddingVertical: responsive.getPadding('sm'),
        }
      ]}>
        <IconButton
          icon="arrow-left"
          size={responsive.getAdaptiveSize(24, 28)}
          onPress={goBack}
          iconColor={theme.colors.onSurface}
        />
        <Text 
          variant="titleMedium" 
          style={[
            styles.headerTitle, 
            { 
              color: theme.colors.onSurface,
              fontSize: responsive.getAdaptiveFontSize(18, 20),
            }
          ]}
        >
          Détail produit
        </Text>
        <IconButton
          icon="home"
          size={responsive.getAdaptiveSize(24, 28)}
          onPress={goHome}
          iconColor={theme.colors.onSurface}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {renderImageGallery()}
        
        <View style={[
          styles.content,
          { paddingHorizontal: responsive.getPadding('lg') }
        ]}>
          {renderProductInfo()}
          
          <Divider style={styles.divider} />
          
          {renderOptions()}
          
          <Divider style={styles.divider} />
          
          {renderSpecifications()}
        </View>
      </ScrollView>

      {/* Boutons d'action */}
      <View style={[
        styles.actionButtons, 
        { 
          backgroundColor: theme.colors.surface,
          padding: responsive.getPadding('lg'),
          gap: responsive.getSpacing('sm'),
        }
      ]}>
        <Button
          mode="outlined"
          onPress={handleAddToCart}
          style={[
            styles.addToCartButton,
            { 
              flex: 1,
              height: responsive.getHeight('button'),
              borderRadius: responsive.getBorderRadius('md'),
            }
          ]}
          icon="cart-plus"
        >
          Ajouter au panier
        </Button>
        <Button
          mode="contained"
          onPress={buyNow}
          style={[
            styles.buyNowButton,
            { 
              flex: 1,
              height: responsive.getHeight('button'),
              borderRadius: responsive.getBorderRadius('md'),
            }
          ]}
          icon="shopping"
        >
          Acheter maintenant
        </Button>
      </View>

      <Notification
        visible={showNotification}
        message={notificationMessage}
        type="success"
        onClose={() => setShowNotification(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  imageContainer: {
    marginBottom: 20,
  },
  mainImage: {
    width: '100%',
  },
  imageThumbnails: {
    flexDirection: 'row',
    marginTop: 10,
  },
  thumbnail: {
    borderRadius: 8,
  },
  selectedThumbnail: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  content: {
    paddingHorizontal: 0,
  },
  productInfo: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productName: {
    fontWeight: 'bold',
    flex: 1,
  },
  discountBadge: {
    backgroundColor: '#e74c3c',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  currentPrice: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  rating: {
    marginRight: 10,
  },
  categoryChip: {
    height: 24,
  },
  description: {
    lineHeight: 22,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  colorChip: {
    marginBottom: 5,
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  sizeChip: {
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  specsContainer: {
    marginBottom: 20,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  specKey: {
    fontWeight: 'bold',
  },
  specValue: {
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    marginVertical: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  addToCartButton: {
    flex: 1,
  },
  buyNowButton: {
    flex: 1,
  },
}); 