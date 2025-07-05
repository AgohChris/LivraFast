import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Card, Button, Chip, DataTable, FAB, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data pour les statistiques
const stats = {
  totalOrders: 1247,
  totalRevenue: 45678.90,
  pendingOrders: 23,
  totalProducts: 156,
  totalUsers: 892,
  todayOrders: 12,
};

// Mock data pour les commandes récentes
const recentOrders = [
  {
    id: '#ORD-001',
    customer: 'Jean Dupont',
    amount: 129.99,
    status: 'En préparation',
    date: '2024-01-15',
  },
  {
    id: '#ORD-002',
    customer: 'Marie Martin',
    amount: 89.50,
    status: 'Livrée',
    date: '2024-01-14',
  },
  {
    id: '#ORD-003',
    customer: 'Pierre Durand',
    amount: 299.99,
    status: 'En transit',
    date: '2024-01-13',
  },
  {
    id: '#ORD-004',
    customer: 'Sophie Bernard',
    amount: 45.00,
    status: 'En attente',
    date: '2024-01-12',
  },
];

// Mock data pour les produits populaires
const popularProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    sales: 156,
    revenue: 155844,
    stock: 23,
  },
  {
    id: 2,
    name: 'Nike Air Max',
    sales: 89,
    revenue: 11481,
    stock: 45,
  },
  {
    id: 3,
    name: 'Samsung TV 55"',
    sales: 67,
    revenue: 40133,
    stock: 12,
  },
];

export default function AdminDashboardScreen() {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const renderDashboard = () => (
    <View>
      {/* Statistiques principales */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.statValue}>
              {stats.totalOrders}
            </Text>
            <Text variant="bodyMedium" style={styles.statLabel}>
              Commandes totales
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.statValue}>
              {stats.totalRevenue.toLocaleString()} CFA
            </Text>
            <Text variant="bodyMedium" style={styles.statLabel}>
              Chiffre d'affaires
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.statValue}>
              {stats.pendingOrders}
            </Text>
            <Text variant="bodyMedium" style={styles.statLabel}>
              En attente
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.statValue}>
              {stats.todayOrders}
            </Text>
            <Text variant="bodyMedium" style={styles.statLabel}>
              Aujourd'hui
            </Text>
          </Card.Content>
        </Card>
      </View>

      {/* Commandes récentes */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Commandes récentes
            </Text>
            <Button
              mode="text"
              onPress={() => router.push('/admin/orders')}
              compact
            >
              Voir tout
            </Button>
          </View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>ID</DataTable.Title>
              <DataTable.Title>Client</DataTable.Title>
              <DataTable.Title numeric>Montant</DataTable.Title>
              <DataTable.Title>Statut</DataTable.Title>
            </DataTable.Header>

            {recentOrders.map((order) => (
              <DataTable.Row key={order.id}>
                <DataTable.Cell>{order.id}</DataTable.Cell>
                <DataTable.Cell>{order.customer}</DataTable.Cell>
                <DataTable.Cell numeric>{order.amount.toLocaleString()} CFA</DataTable.Cell>
                <DataTable.Cell>
                  <Chip
                    mode="outlined"
                    style={[
                      styles.statusChip,
                      {
                        backgroundColor: 
                          order.status === 'Livrée' ? '#4CAF50' :
                          order.status === 'En transit' ? '#2196F3' :
                          order.status === 'En préparation' ? '#FF9800' : '#9E9E9E'
                      }
                    ]}
                  >
                    {order.status}
                  </Chip>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      {/* Produits populaires */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Produits populaires
            </Text>
            <Button
              mode="text"
              onPress={() => router.push('/admin/products')}
              compact
            >
              Gérer
            </Button>
          </View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Produit</DataTable.Title>
              <DataTable.Title numeric>Ventes</DataTable.Title>
              <DataTable.Title numeric>Revenus</DataTable.Title>
              <DataTable.Title numeric>Stock</DataTable.Title>
            </DataTable.Header>

            {popularProducts.map((product) => (
              <DataTable.Row key={product.id}>
                <DataTable.Cell>{product.name}</DataTable.Cell>
                <DataTable.Cell numeric>{product.sales}</DataTable.Cell>
                <DataTable.Cell numeric>{product.revenue.toLocaleString()} CFA</DataTable.Cell>
                <DataTable.Cell numeric>{product.stock}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <Text variant="titleLarge" style={styles.sectionTitle}>
        Actions rapides
      </Text>
      <View style={styles.actionButtons}>
        <Button
          mode="contained"
          icon="plus"
          style={styles.actionButton}
          onPress={() => router.push('/admin/products')}
        >
          Ajouter un produit
        </Button>
        <Button
          mode="contained"
          icon="package-variant"
          style={styles.actionButton}
          onPress={() => router.push('/admin/orders')}
        >
          Gérer les commandes
        </Button>
        <Button
          mode="contained"
          icon="account-group"
          style={styles.actionButton}
          onPress={() => router.push('/admin/users')}
        >
          Gérer les utilisateurs
        </Button>
        <Button
          mode="contained"
          icon="chart-line"
          style={styles.actionButton}
          onPress={() => console.log('Voir les rapports')}
        >
          Rapports
        </Button>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Dashboard Admin
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Vue d'ensemble de la plateforme
          </Text>
        </View>

        {/* Onglets */}
        <View style={styles.tabsContainer}>
          <Chip
            mode={selectedTab === 'dashboard' ? 'flat' : 'outlined'}
            onPress={() => setSelectedTab('dashboard')}
            style={styles.tabChip}
          >
            Dashboard
          </Chip>
          <Chip
            mode={selectedTab === 'actions' ? 'flat' : 'outlined'}
            onPress={() => setSelectedTab('actions')}
            style={styles.tabChip}
          >
            Actions
          </Chip>
        </View>

        {/* Contenu selon l'onglet sélectionné */}
        {selectedTab === 'dashboard' ? renderDashboard() : renderQuickActions()}
      </ScrollView>

      {/* FAB pour actions rapides */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/admin/products')}
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabChip: {
    marginRight: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 55) / 2,
    marginBottom: 15,
    elevation: 2,
  },
  statValue: {
    fontWeight: 'bold',
    color: '#2c3e50',
    fontSize: 24,
  },
  statLabel: {
    color: '#7f8c8d',
    marginTop: 4,
  },
  sectionCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statusChip: {
    height: 24,
  },
  quickActions: {
    paddingHorizontal: 20,
  },
  actionButtons: {
    gap: 10,
  },
  actionButton: {
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 