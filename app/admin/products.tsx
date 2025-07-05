import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Card, Button, Chip, DataTable, Searchbar, FAB, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Mock data pour les produits
const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 999,
    category: 'Électronique',
    stock: 23,
    status: 'En stock',
    image: 'HTTPS://via.placeholder.com/60',
  },
  {
    id: 2,
    name: 'Nike Air Max 270',
    price: 129,
    category: 'Sport',
    stock: 45,
    status: 'En stock',
    image: 'HTTPS://via.placeholder.com/60',
  },
  {
    id: 3,
    name: 'Samsung TV 55" 4K',
    price: 599,
    category: 'Électronique',
    stock: 12,
    status: 'Stock faible',
    image: 'HTTPS://via.placeholder.com/60',
  },
  {
    id: 4,
    name: 'MacBook Pro M3',
    price: 2499,
    category: 'Électronique',
    stock: 8,
    status: 'En stock',
    image: 'HTTPS://via.placeholder.com/60',
  },
  {
    id: 5,
    name: 'Adidas T-Shirt',
    price: 29,
    category: 'Mode',
    stock: 0,
    status: 'Rupture',
    image: 'HTTPS://via.placeholder.com/60',
  },
];

export default function AdminProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'inStock') return matchesSearch && product.stock > 0;
    if (selectedFilter === 'lowStock') return matchesSearch && product.stock <= 10 && product.stock > 0;
    if (selectedFilter === 'outOfStock') return matchesSearch && product.stock === 0;
    
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En stock': return '#4CAF50';
      case 'Stock faible': return '#FF9800';
      case 'Rupture': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const renderProductRow = (product: any) => (
    <DataTable.Row key={product.id}>
      <DataTable.Cell>
        <View style={styles.productCell}>
          <View style={styles.productImage}>
            <Text style={styles.imagePlaceholder}>📱</Text>
          </View>
          <View style={styles.productInfo}>
            <Text variant="bodyMedium" style={styles.productName}>
              {product.name}
            </Text>
            <Text variant="bodySmall" style={styles.productCategory}>
              {product.category}
            </Text>
          </View>
        </View>
      </DataTable.Cell>
                  <DataTable.Cell numeric>{product.price.toLocaleString()} CFA</DataTable.Cell>
      <DataTable.Cell numeric>{product.stock}</DataTable.Cell>
      <DataTable.Cell>
        <Chip
          mode="outlined"
          style={[styles.statusChip, { backgroundColor: getStatusColor(product.status) }]}
        >
          {product.status}
        </Chip>
      </DataTable.Cell>
      <DataTable.Cell>
        <View style={styles.actionButtons}>
          <IconButton
            icon="pencil"
            size={20}
            onPress={() => console.log(`Modifier ${product.name}`)}
          />
          <IconButton
            icon="delete"
            size={20}
            iconColor="#e74c3c"
            onPress={() => console.log(`Supprimer ${product.name}`)}
          />
        </View>
      </DataTable.Cell>
    </DataTable.Row>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Gestion des Produits
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {filteredProducts.length} produit(s)
          </Text>
        </View>

        {/* Barre de recherche */}
        <Searchbar
          placeholder="Rechercher un produit..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        {/* Filtres */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Chip
              mode={selectedFilter === 'all' ? 'flat' : 'outlined'}
              onPress={() => setSelectedFilter('all')}
              style={styles.filterChip}
            >
              Tous
            </Chip>
            <Chip
              mode={selectedFilter === 'inStock' ? 'flat' : 'outlined'}
              onPress={() => setSelectedFilter('inStock')}
              style={styles.filterChip}
            >
              En stock
            </Chip>
            <Chip
              mode={selectedFilter === 'lowStock' ? 'flat' : 'outlined'}
              onPress={() => setSelectedFilter('lowStock')}
              style={styles.filterChip}
            >
              Stock faible
            </Chip>
            <Chip
              mode={selectedFilter === 'outOfStock' ? 'flat' : 'outlined'}
              onPress={() => setSelectedFilter('outOfStock')}
              style={styles.filterChip}
            >
              Rupture
            </Chip>
          </ScrollView>
        </View>

        {/* Liste des produits */}
        <Card style={styles.productsCard}>
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Produit</DataTable.Title>
                <DataTable.Title numeric>Prix</DataTable.Title>
                <DataTable.Title numeric>Stock</DataTable.Title>
                <DataTable.Title>Statut</DataTable.Title>
                <DataTable.Title>Actions</DataTable.Title>
              </DataTable.Header>

              {filteredProducts.map(renderProductRow)}
            </DataTable>
          </Card.Content>
        </Card>

        {/* Statistiques rapides */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.statValue}>
                {products.length}
              </Text>
              <Text variant="bodyMedium" style={styles.statLabel}>
                Total produits
              </Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.statValue}>
                {products.filter(p => p.stock === 0).length}
              </Text>
              <Text variant="bodyMedium" style={styles.statLabel}>
                En rupture
              </Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.statValue}>
                {products.filter(p => p.stock <= 10 && p.stock > 0).length}
              </Text>
              <Text variant="bodyMedium" style={styles.statLabel}>
                Stock faible
              </Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      {/* FAB pour ajouter un produit */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log('Ajouter un produit')}
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
  productsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 3,
  },
  productCell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  imagePlaceholder: {
    fontSize: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
  },
  productCategory: {
    color: '#7f8c8d',
    fontSize: 12,
  },
  statusChip: {
    height: 24,
  },
  actionButtons: {
    flexDirection: 'row',
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