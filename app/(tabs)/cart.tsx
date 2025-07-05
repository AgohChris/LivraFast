import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Card, Button, Chip, Divider, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data pour le panier
const cartItems = [
  {
    id: 1,
    name: 'T-shirt Premium Cotton',
    price: 25000,
    quantity: 1,
    image: 'https://via.placeholder.com/80',
    category: 'Vêtements Hommes',
    inStock: true,
  },
  {
    id: 2,
    name: 'Jeans Slim Fit',
    price: 45000,
    quantity: 2,
    image: 'https://via.placeholder.com/80',
    category: 'Vêtements Hommes',
    inStock: true,
  },
  {
    id: 3,
    name: 'Robe d\'été Élégante',
    price: 35000,
    quantity: 1,
    image: 'https://via.placeholder.com/80',
    category: 'Vêtements Femmes',
    inStock: true,
  },
];

export default function CartScreen() {
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setItems(items.filter(item => item.id !== id));
    } else {
      setItems(items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 50000 ? 0 : 2500;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const renderCartItem = (item: any) => (
    <Card key={item.id} style={styles.cartItem}>
      <Card.Content style={styles.itemContent}>
        <View style={styles.itemImageContainer}>
          <Card.Cover source={{ uri: item.image }} style={styles.itemImage} />
        </View>
        <View style={styles.itemInfo}>
          <Text variant="titleMedium" style={styles.itemName}>
            {item.name}
          </Text>
          <Text variant="bodySmall" style={styles.itemCategory}>
            {item.category}
          </Text>
          <Text variant="titleMedium" style={styles.itemPrice}>
            {item.price.toLocaleString()} CFA
          </Text>
        </View>
        <View style={styles.itemActions}>
          <View style={styles.quantityContainer}>
            <IconButton
              icon="minus"
              size={20}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            />
            <Text variant="titleMedium" style={styles.quantityText}>
              {item.quantity}
            </Text>
            <IconButton
              icon="plus"
              size={20}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            />
          </View>
          <IconButton
            icon="delete"
            size={20}
            onPress={() => updateQuantity(item.id, 0)}
            iconColor="#e74c3c"
          />
        </View>
      </Card.Content>
    </Card>
  );

  const renderOrderSummary = () => (
    <Card style={styles.summaryCard}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.summaryTitle}>
          Résumé de la commande
        </Text>
        <View style={styles.summaryRow}>
          <Text variant="bodyMedium">Sous-total</Text>
          <Text variant="bodyMedium">{calculateSubtotal().toLocaleString()} CFA</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text variant="bodyMedium">Livraison</Text>
          <Text variant="bodyMedium">
            {calculateShipping() === 0 ? 'Gratuit' : `${calculateShipping().toLocaleString()} CFA`}
          </Text>
        </View>
        <Divider style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text variant="titleMedium" style={styles.totalLabel}>
            Total
          </Text>
          <Text variant="titleMedium" style={styles.totalAmount}>
            {calculateTotal().toLocaleString()} CFA
          </Text>
        </View>
        {calculateSubtotal() < 50000 && (
          <Chip mode="outlined" style={styles.freeShippingChip}>
            Plus que {(50000 - calculateSubtotal()).toLocaleString()} CFA pour la livraison gratuite !
          </Chip>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Mon Panier
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {items.length} article(s)
          </Text>
        </View>

        {items.length === 0 ? (
          // Panier vide
          <View style={styles.emptyCart}>
            <Text variant="headlineMedium" style={styles.emptyTitle}>
              🛒 Votre panier est vide
            </Text>
            <Text variant="bodyMedium" style={styles.emptySubtitle}>
              Ajoutez des articles pour commencer vos achats
            </Text>
            <Button 
              mode="contained" 
              style={styles.continueShoppingButton}
              onPress={() => router.push('/(tabs)/explore')}
            >
              Continuer mes achats
            </Button>
          </View>
        ) : (
          // Panier avec articles
          <>
            {/* Liste des articles */}
            <View style={styles.itemsContainer}>
              {items.map(renderCartItem)}
            </View>

            {/* Résumé de la commande */}
            {renderOrderSummary()}

            {/* Boutons d'action */}
            <View style={styles.actionButtons}>
              <Button
                mode="outlined"
                style={styles.actionButton}
                onPress={() => router.push('/(tabs)/explore')}
              >
                Continuer mes achats
              </Button>
              <Button
                mode="contained"
                style={styles.actionButton}
                onPress={() => router.push('/checkout')}
              >
                Passer la commande
              </Button>
            </View>
          </>
        )}
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
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtitle: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 30,
  },
  continueShoppingButton: {
    marginTop: 20,
  },
  itemsContainer: {
    paddingHorizontal: 20,
  },
  cartItem: {
    marginBottom: 15,
    elevation: 2,
  },
  itemContent: {
    flexDirection: 'row',
    padding: 15,
  },
  itemImageContainer: {
    marginRight: 15,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemCategory: {
    color: '#7f8c8d',
    marginBottom: 8,
  },
  itemPrice: {
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  itemActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityText: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  summaryCard: {
    margin: 20,
    elevation: 3,
  },
  summaryTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryDivider: {
    marginVertical: 10,
  },
  totalLabel: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  totalAmount: {
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  freeShippingChip: {
    marginTop: 10,
    alignSelf: 'center',
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
  actionButton: {
    marginBottom: 10,
  },
}); 