import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Card, Button, IconButton, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data pour la commande confirmée
const order = {
  id: '#ORD-2024-001',
  status: 'Confirmée',
  total: 1458.98,
  items: [
    { name: 'iPhone 15 Pro Max', quantity: 1, price: 1299 },
    { name: 'Nike Air Max 270', quantity: 2, price: 129 },
  ],
  delivery: {
    method: 'Livraison express',
    cost: 12.99,
    estimatedDate: '2024-01-18',
  },
  customer: {
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    address: '123 Rue de la Paix, 75001 Paris',
  },
};

export default function OrderConfirmationScreen() {
  const theme = useTheme();

  const trackOrder = () => {
    router.push('/order-tracking' as any);
  };

  const goToHome = () => {
    router.replace('/(tabs)');
  };

  const continueShopping = () => {
    router.push('/(tabs)');
  };

  const viewOrders = () => {
    console.log('Voir mes commandes');
    // Navigation vers l'historique des commandes
    // router.push('/my-orders'); // Route à créer
    alert('Fonctionnalité de commandes à implémenter');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Livrée':
        return '#4CAF50';
      case 'En cours':
        return '#FF9800';
      case 'Annulée':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header avec bouton de retour */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
          iconColor={theme.colors.onSurface}
        />
        <Text variant="titleLarge" style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
          Confirmation
        </Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header avec animation de succès */}
        <View style={styles.successHeader}>
          <View style={styles.successIcon}>
            <IconButton
              icon="check-circle"
              size={80}
              iconColor="#4CAF50"
            />
          </View>
          <Text variant="headlineMedium" style={[styles.successTitle, { color: theme.colors.onSurface }]}>
            Commande confirmée !
          </Text>
          <Text variant="bodyMedium" style={[styles.successSubtitle, { color: theme.colors.onSurfaceVariant }]}>
            Votre commande a été enregistrée avec succès
          </Text>
        </View>

        {/* Détails de la commande */}
        <Card style={[styles.orderCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
              Détails de la commande
            </Text>
            
            <View style={styles.orderInfo}>
              <View style={styles.infoRow}>
                <Text variant="bodyMedium" style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Numéro de commande
                </Text>
                <Text variant="bodyMedium" style={[styles.infoValue, { color: theme.colors.onSurface }]}>
                  {order.id}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text variant="bodyMedium" style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Statut
                </Text>
                <Text variant="bodyMedium" style={[styles.statusValue, { color: getStatusColor(order.status) }]}>
                  {order.status}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text variant="bodyMedium" style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Date de livraison estimée
                </Text>
                <Text variant="bodyMedium" style={[styles.infoValue, { color: theme.colors.onSurface }]}>
                  {order.delivery.estimatedDate}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Récapitulatif */}
        <Card style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
              Récapitulatif
            </Text>
            
            {order.items.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <View style={styles.itemInfo}>
                  <Text variant="bodyMedium" style={[styles.itemName, { color: theme.colors.onSurface }]}>
                    {item.name}
                  </Text>
                  <Text variant="bodySmall" style={[styles.itemQuantity, { color: theme.colors.onSurfaceVariant }]}>
                    Quantité: {item.quantity}
                  </Text>
                </View>
                <Text variant="bodyMedium" style={[styles.itemPrice, { color: theme.colors.onSurface }]}>
                  {(item.price * item.quantity).toLocaleString()} CFA
                </Text>
              </View>
            ))}
            
            <View style={styles.totalRow}>
              <Text variant="titleMedium" style={[styles.totalLabel, { color: theme.colors.onSurface }]}>
                Total
              </Text>
              <Text variant="titleMedium" style={[styles.totalAmount, { color: theme.colors.error }]}>
                {order.total.toLocaleString()} CFA
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Informations de livraison */}
        <Card style={[styles.deliveryCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
              Livraison
            </Text>
            
            <View style={styles.deliveryInfo}>
              <Text variant="bodyMedium" style={[styles.deliveryMethod, { color: theme.colors.onSurface }]}>
                {order.delivery.method}
              </Text>
              <Text variant="bodySmall" style={[styles.deliveryAddress, { color: theme.colors.onSurfaceVariant }]}>
                {order.customer.address}
              </Text>
              <Text variant="bodySmall" style={[styles.deliveryCost, { color: theme.colors.onSurfaceVariant }]}>
                Frais de livraison: {order.delivery.cost.toLocaleString()} CFA
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Actions principales */}
        <View style={styles.actionsContainer}>
          <Button
            mode="contained"
            icon="truck"
            onPress={trackOrder}
            style={styles.actionButton}
          >
            Suivre ma commande
          </Button>
          
          <Button
            mode="outlined"
            icon="package-variant"
            onPress={viewOrders}
            style={styles.actionButton}
          >
            Voir mes commandes
          </Button>
        </View>

        {/* Actions secondaires */}
        <View style={styles.secondaryActions}>
          <Button
            mode="outlined"
            icon="shopping"
            onPress={continueShopping}
            style={styles.secondaryButton}
          >
            Continuer mes achats
          </Button>
          
          <Button
            mode="text"
            icon="home"
            onPress={goToHome}
            style={styles.secondaryButton}
          >
            Retour à l'accueil
          </Button>
        </View>

        {/* Informations supplémentaires */}
        <Card style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.infoTitle, { color: theme.colors.onSurface }]}>
              Prochaines étapes
            </Text>
            
            <View style={styles.stepsList}>
              <View style={styles.stepItem}>
                <Text variant="bodySmall" style={styles.stepNumber}>
                  1
                </Text>
                <Text variant="bodySmall" style={[styles.stepText, { color: theme.colors.onSurface }]}>
                  Votre commande est en cours de préparation
                </Text>
              </View>
              
              <View style={styles.stepItem}>
                <Text variant="bodySmall" style={styles.stepNumber}>
                  2
                </Text>
                <Text variant="bodySmall" style={[styles.stepText, { color: theme.colors.onSurface }]}>
                  Vous recevrez un email de confirmation
                </Text>
              </View>
              
              <View style={styles.stepItem}>
                <Text variant="bodySmall" style={styles.stepNumber}>
                  3
                </Text>
                <Text variant="bodySmall" style={[styles.stepText, { color: theme.colors.onSurface }]}>
                  Suivez votre livraison en temps réel
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  successSubtitle: {
    textAlign: 'center',
  },
  orderCard: {
    marginBottom: 20,
    elevation: 3,
  },
  summaryCard: {
    marginBottom: 20,
    elevation: 3,
  },
  deliveryCard: {
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
  },
  orderInfo: {
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    flex: 1,
  },
  infoValue: {
    fontWeight: 'bold',
  },
  statusValue: {
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemQuantity: {
    marginTop: 2,
  },
  itemPrice: {
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalAmount: {
    fontWeight: 'bold',
  },
  deliveryInfo: {
    gap: 5,
  },
  deliveryMethod: {
    fontWeight: 'bold',
  },
  deliveryAddress: {
    marginTop: 2,
  },
  deliveryCost: {
    marginTop: 2,
  },
  actionsContainer: {
    marginBottom: 20,
    gap: 10,
  },
  actionButton: {
    marginBottom: 5,
  },
  secondaryActions: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
  },
  infoCard: {
    elevation: 2,
  },
  infoTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
  },
  stepsList: {
    gap: 15,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    backgroundColor: '#007AFF',
    color: 'white',
    width: 20,
    height: 20,
    borderRadius: 10,
    textAlign: 'center',
    lineHeight: 20,
    marginRight: 10,
    marginTop: 2,
  },
  stepText: {
    flex: 1,
  },
}); 