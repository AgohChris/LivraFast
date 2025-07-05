import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Card, Button, Chip, DataTable, Searchbar, FAB, IconButton, Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Mock data pour les commandes
const orders = [
  {
    id: '#ORD-001',
    customer: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    phone: '06 12 34 56 78',
    amount: 129.99,
    status: 'En préparation',
    date: '2024-01-15',
    items: 3,
    address: '123 Rue de la Paix, 75001 Paris',
  },
  {
    id: '#ORD-002',
    customer: 'Marie Martin',
    email: 'marie.martin@email.com',
    phone: '06 98 76 54 32',
    amount: 89.50,
    status: 'Livrée',
    date: '2024-01-14',
    items: 2,
    address: '456 Avenue des Champs, 75008 Paris',
  },
  {
    id: '#ORD-003',
    customer: 'Pierre Durand',
    email: 'pierre.durand@email.com',
    phone: '06 11 22 33 44',
    amount: 299.99,
    status: 'En transit',
    date: '2024-01-13',
    items: 1,
    address: '789 Boulevard Saint-Germain, 75006 Paris',
  },
  {
    id: '#ORD-004',
    customer: 'Sophie Bernard',
    email: 'sophie.bernard@email.com',
    phone: '06 55 66 77 88',
    amount: 45.00,
    status: 'En attente',
    date: '2024-01-12',
    items: 4,
    address: '321 Rue du Commerce, 75015 Paris',
  },
  {
    id: '#ORD-005',
    customer: 'Lucas Moreau',
    email: 'lucas.moreau@email.com',
    phone: '06 99 88 77 66',
    amount: 199.99,
    status: 'Annulée',
    date: '2024-01-11',
    items: 2,
    address: '654 Rue de Rivoli, 75001 Paris',
  },
];

const statusOptions = [
  { label: 'En attente', value: 'En attente', color: '#9E9E9E' },
  { label: 'En préparation', value: 'En préparation', color: '#FF9800' },
  { label: 'En transit', value: 'En transit', color: '#2196F3' },
  { label: 'Livrée', value: 'Livrée', color: '#4CAF50' },
  { label: 'Annulée', value: 'Annulée', color: '#F44336' },
];

export default function AdminOrdersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedStatus === 'all') return matchesSearch;
    return matchesSearch && order.status === selectedStatus;
  });

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.color : '#9E9E9E';
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log(`Mettre à jour la commande ${orderId} vers ${newStatus}`);
    setMenuVisible(false);
  };

  const renderOrderRow = (order: any) => (
    <DataTable.Row key={order.id}>
      <DataTable.Cell>
        <View style={styles.orderCell}>
          <Text variant="bodyMedium" style={styles.orderId}>
            {order.id}
          </Text>
          <Text variant="bodySmall" style={styles.orderDate}>
            {order.date}
          </Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell>
        <View style={styles.customerCell}>
          <Text variant="bodyMedium" style={styles.customerName}>
            {order.customer}
          </Text>
          <Text variant="bodySmall" style={styles.customerEmail}>
            {order.email}
          </Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell numeric>{order.amount.toLocaleString()} CFA</DataTable.Cell>
      <DataTable.Cell numeric>{order.items}</DataTable.Cell>
      <DataTable.Cell>
        <Chip
          mode="outlined"
          style={[styles.statusChip, { backgroundColor: getStatusColor(order.status) }]}
        >
          {order.status}
        </Chip>
      </DataTable.Cell>
      <DataTable.Cell>
        <Menu
          visible={menuVisible && selectedOrder?.id === order.id}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <IconButton
              icon="dots-vertical"
              size={20}
              onPress={() => {
                setSelectedOrder(order);
                setMenuVisible(true);
              }}
            />
          }
        >
          <Menu.Item
            onPress={() => updateOrderStatus(order.id, 'En préparation')}
            title="En préparation"
            leadingIcon="package-variant"
          />
          <Menu.Item
            onPress={() => updateOrderStatus(order.id, 'En transit')}
            title="En transit"
            leadingIcon="truck"
          />
          <Menu.Item
            onPress={() => updateOrderStatus(order.id, 'Livrée')}
            title="Livrée"
            leadingIcon="check-circle"
          />
          <Menu.Item
            onPress={() => updateOrderStatus(order.id, 'Annulée')}
            title="Annulée"
            leadingIcon="close-circle"
          />
        </Menu>
      </DataTable.Cell>
    </DataTable.Row>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Gestion des Commandes
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {filteredOrders.length} commande(s)
          </Text>
        </View>

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
            <Chip
              mode={selectedStatus === 'all' ? 'flat' : 'outlined'}
              onPress={() => setSelectedStatus('all')}
              style={styles.filterChip}
            >
              Toutes
            </Chip>
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

        {/* Liste des commandes */}
        <Card style={styles.ordersCard}>
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Commande</DataTable.Title>
                <DataTable.Title>Client</DataTable.Title>
                <DataTable.Title numeric>Montant</DataTable.Title>
                <DataTable.Title numeric>Articles</DataTable.Title>
                <DataTable.Title>Statut</DataTable.Title>
                <DataTable.Title>Actions</DataTable.Title>
              </DataTable.Header>

              {filteredOrders.map(renderOrderRow)}
            </DataTable>
          </Card.Content>
        </Card>

        {/* Statistiques rapides */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.statValue}>
                {orders.length}
              </Text>
              <Text variant="bodyMedium" style={styles.statLabel}>
                Total commandes
              </Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.statValue}>
                {orders.filter(o => o.status === 'En attente').length}
              </Text>
              <Text variant="bodyMedium" style={styles.statLabel}>
                En attente
              </Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.statValue}>
                {orders.filter(o => o.status === 'Livrée').length}
              </Text>
              <Text variant="bodyMedium" style={styles.statLabel}>
                Livrées
              </Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      {/* FAB pour actions rapides */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log('Nouvelle commande')}
      />
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
  searchBar: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterChip: {
    marginRight: 10,
  },
  ordersCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 3,
  },
  orderCell: {
    flex: 1,
  },
  orderId: {
    fontWeight: 'bold',
  },
  orderDate: {
    color: '#7f8c8d',
    fontSize: 12,
  },
  customerCell: {
    flex: 1,
  },
  customerName: {
    fontWeight: 'bold',
  },
  customerEmail: {
    color: '#7f8c8d',
    fontSize: 12,
  },
  statusChip: {
    height: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 