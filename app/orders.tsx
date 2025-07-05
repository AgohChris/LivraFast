import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Card, Chip, IconButton, Searchbar, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data pour toutes les commandes
const allOrders = [
  {
    id: '#ORD-2024-001',
    date: '2024-01-15',
    status: 'Livrée',
    total: 129.99,
    items: ['T-shirt Premium Cotton', 'Jeans Slim Fit'],
    deliveryAddress: '123 Rue de la Paix, 75001 Paris',
    trackingNumber: 'TRK-2024-001',
  },
  {
    id: '#ORD-2024-002',
    date: '2024-01-10',
    status: 'En cours',
    total: 89.50,
    items: ['Pull en laine', 'Chaussettes'],
    deliveryAddress: '123 Rue de la Paix, 75001 Paris',
    trackingNumber: 'TRK-2024-002',
  },
  {
    id: '#ORD-2024-003',
    date: '2024-01-05',
    status: 'Livrée',
    total: 45.99,
    items: ['Casquette'],
    deliveryAddress: '123 Rue de la Paix, 75001 Paris',
    trackingNumber: 'TRK-2024-003',
  },
  {
    id: '#ORD-2023-012',
    date: '2023-12-20',
    status: 'Livrée',
    total: 156.75,
    items: ['Veste en cuir', 'Écharpe'],
    deliveryAddress: '123 Rue de la Paix, 75001 Paris',
    trackingNumber: 'TRK-2023-012',
  },
  {
    id: '#ORD-2023-011',
    date: '2023-12-15',
    status: 'Annulée',
    total: 78.30,
    items: ['Pantalon chino'],
    deliveryAddress: '123 Rue de la Paix, 75001 Paris',
    trackingNumber: null,
  },
  {
    id: '#ORD-2023-010',
    date: '2023-12-10',
    status: 'Livrée',
    total: 234.00,
    items: ['Costume complet', 'Cravate'],
    deliveryAddress: '123 Rue de la Paix, 75001 Paris',
    trackingNumber: 'TRK-2023-010',
  },
];

const statusOptions = [
  { label: 'Toutes', value: 'all', color: '#9E9E9E' },
  { label: 'En cours', value: 'En cours', color: '#FF9800' },
  { label: 'Livrée', value: 'Livrée', color: '#4CAF50' },
  { label: 'Annulée', value: 'Annulée', color: '#F44336' },
];

export default function OrdersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedStatus === 'all') return matchesSearch;
    return matchesSearch && order.status === selectedStatus;
  });

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.color : '#9E9E9E';
  };

  const handleTrackOrder = (order: any) => {
    if (order.trackingNumber) {
      router.push({
        pathname: '/order-tracking',
        params: { 
          orderId: order.id,
          trackingNumber: order.trackingNumber 
        }
      });
    }
  };

  const renderOrderCard = (order: any) => (
    <Card key={order.id} style={styles.orderCard}>
      <Card.Content>
        <View style={styles.orderHeader}>
          <View style={styles.orderInfo}>
            <Text variant="titleMedium" style={styles.orderId}>
              {order.id}
            </Text>
            <Text variant="bodySmall" style={styles.orderDate}>
              {new Date(order.date).toLocaleDateString('fr-FR')}
            </Text>
          </View>
          <Chip
            mode="outlined"
            style={[styles.statusChip, { backgroundColor: getStatusColor(order.status) }]}
          >
            {order.status}
          </Chip>
        </View>

        <View style={styles.orderItems}>
          <Text variant="bodyMedium" style={styles.itemsTitle}>
            Articles commandés:
          </Text>
          {order.items.map((item: string, index: number) => (
            <Text key={index} variant="bodySmall" style={styles.orderItem}>
              • {item}
            </Text>
          ))}
        </View>

        <View style={styles.orderDetails}>
          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              Adresse de livraison:
            </Text>
            <Text variant="bodySmall" style={styles.detailValue}>
              {order.deliveryAddress}
            </Text>
          </View>
          
          {order.trackingNumber && (
            <View style={styles.detailRow}>
              <Text variant="bodySmall" style={styles.detailLabel}>
                Numéro de suivi:
              </Text>
              <Text variant="bodySmall" style={styles.detailValue}>
                {order.trackingNumber}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.orderFooter}>
          <Text variant="titleMedium" style={styles.orderTotal}>
            {order.total.toLocaleString()} CFA
          </Text>
          
          <View style={styles.orderActions}>
                         {order.trackingNumber && (
               <Button
                 mode="outlined"
                 icon="map-marker"
                 onPress={() => handleTrackOrder(order)}
                 style={styles.trackButton}
               >
                 Suivre
               </Button>
             )}
             
             <Button
               mode="outlined"
               icon="eye"
               onPress={() => console.log(`Voir les détails de ${order.id}`)}
             >
               Détails
             </Button>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
        />
        <Text variant="titleLarge" style={styles.headerTitle}>
          Mes commandes
        </Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Barre de recherche */}
        <Searchbar
          placeholder="Rechercher une commande..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        {/* Filtres par statut */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {statusOptions.map((status) => (
              <Chip
                key={status.value}
                mode={selectedStatus === status.value ? 'flat' : 'outlined'}
                onPress={() => setSelectedStatus(status.value)}
                style={styles.filterChip}
              >
                {status.label}
              </Chip>
            ))}
          </ScrollView>
        </View>

        {/* Statistiques */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.statValue}>
                {allOrders.length}
              </Text>
              <Text variant="bodyMedium" style={styles.statLabel}>
                Total commandes
              </Text>
            </Card.Content>
          </Card>
          
          <Card style={styles.statCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.statValue}>
                {allOrders.filter(o => o.status === 'Livrée').length}
              </Text>
              <Text variant="bodyMedium" style={styles.statLabel}>
                Commandes livrées
              </Text>
            </Card.Content>
          </Card>
          
          <Card style={styles.statCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.statValue}>
                {allOrders.reduce((total, order) => total + order.total, 0).toLocaleString()} CFA
              </Text>
              <Text variant="bodyMedium" style={styles.statLabel}>
                Total dépensé
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Liste des commandes */}
        <View style={styles.ordersContainer}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(renderOrderCard)
          ) : (
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <Text variant="titleMedium" style={styles.emptyTitle}>
                  Aucune commande trouvée
                </Text>
                <Text variant="bodyMedium" style={styles.emptyText}>
                  {searchQuery || selectedStatus !== 'all' 
                    ? 'Aucune commande ne correspond à vos critères'
                    : 'Vous n\'avez pas encore passé de commande'
                  }
                </Text>
                <Button
                  mode="contained"
                  onPress={() => router.push('/(tabs)')}
                  style={styles.shopButton}
                  icon="shopping"
                >
                  Commencer mes achats
                </Button>
              </Card.Content>
            </Card>
          )}
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
    color: '#2c3e50',
  },
  searchBar: {
    margin: 20,
    marginBottom: 10,
    elevation: 2,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterChip: {
    marginRight: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    elevation: 2,
  },
  statValue: {
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  statLabel: {
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 4,
  },
  ordersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  orderCard: {
    marginBottom: 15,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  orderDate: {
    color: '#7f8c8d',
    marginTop: 2,
  },
  statusChip: {
    height: 24,
  },
  orderItems: {
    marginBottom: 15,
  },
  itemsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  orderItem: {
    color: '#7f8c8d',
    marginLeft: 10,
  },
  orderDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#2c3e50',
    width: 120,
  },
  detailValue: {
    flex: 1,
    color: '#7f8c8d',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 10,
  },
  trackButton: {
    marginRight: 5,
  },
  emptyCard: {
    marginTop: 50,
    elevation: 2,
  },
  emptyContent: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  emptyText: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 20,
  },
  shopButton: {
    marginTop: 10,
  },
});