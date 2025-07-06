import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Card, Button, Chip, DataTable, Searchbar, FAB, IconButton, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponsive } from '@/hooks/useResponsive';

const { width } = Dimensions.get('window');

// Mock data pour les utilisateurs
const users = [
  {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    phone: '06 12 34 56 78',
    status: 'Actif',
    joinDate: '2023-12-15',
    orders: 12,
    totalSpent: 1247.50,
    avatar: 'HTTPS://via.placeholder.com/40',
  },
  {
    id: 2,
    name: 'Marie Martin',
    email: 'marie.martin@email.com',
    phone: '06 98 76 54 32',
    status: 'Actif',
    joinDate: '2023-11-20',
    orders: 8,
    totalSpent: 856.30,
    avatar: 'HTTPS://via.placeholder.com/40',
  },
  {
    id: 3,
    name: 'Pierre Durand',
    email: 'pierre.durand@email.com',
    phone: '06 11 22 33 44',
    status: 'Inactif',
    joinDate: '2023-10-05',
    orders: 3,
    totalSpent: 299.99,
    avatar: 'HTTPS://via.placeholder.com/40',
  },
  {
    id: 4,
    name: 'Sophie Bernard',
    email: 'sophie.bernard@email.com',
    phone: '06 55 66 77 88',
    status: 'Actif',
    joinDate: '2024-01-02',
    orders: 5,
    totalSpent: 445.00,
    avatar: 'HTTPS://via.placeholder.com/40',
  },
  {
    id: 5,
    name: 'Lucas Moreau',
    email: 'lucas.moreau@email.com',
    phone: '06 99 88 77 66',
    status: 'Suspendu',
    joinDate: '2023-09-15',
    orders: 0,
    totalSpent: 0,
    avatar: 'HTTPS://via.placeholder.com/40',
  },
];

const statusOptions = [
  { label: 'Tous', value: 'all', color: '#9E9E9E' },
  { label: 'Actif', value: 'Actif', color: '#4CAF50' },
  { label: 'Inactif', value: 'Inactif', color: '#FF9800' },
  { label: 'Suspendu', value: 'Suspendu', color: '#F44336' },
];

export default function AdminUsersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const responsive = useResponsive();

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedStatus === 'all') return matchesSearch;
    return matchesSearch && user.status === selectedStatus;
  });

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.color : '#9E9E9E';
  };

  const toggleUserStatus = (userId: number, currentStatus: string) => {
    console.log(`Changer le statut de l'utilisateur ${userId} de ${currentStatus}`);
  };

  const renderUserRow = (user: any) => (
    <DataTable.Row key={user.id}>
      <DataTable.Cell>
        <View style={styles.userCell}>
          <Avatar.Text 
            size={responsive.getAdaptiveSize(32, 40)} 
            label={user.name.split(' ').map((n: string) => n[0]).join('')} 
          />
          <View style={styles.userInfo}>
            <Text 
              variant="bodyMedium" 
              style={[
                styles.userName,
                { fontSize: responsive.getAdaptiveFontSize(14, 16) }
              ]}
            >
              {user.name}
            </Text>
            <Text 
              variant="bodySmall" 
              style={[
                styles.userEmail,
                { fontSize: responsive.getAdaptiveFontSize(12, 14) }
              ]}
            >
              {user.email}
            </Text>
          </View>
        </View>
      </DataTable.Cell>
      <DataTable.Cell numeric>
        <Text style={{ fontSize: responsive.getAdaptiveFontSize(14, 16) }}>
          {user.orders}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell numeric>
        <Text style={{ fontSize: responsive.getAdaptiveFontSize(14, 16) }}>
          {user.totalSpent.toLocaleString()} CFA
        </Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <Chip
          mode="outlined"
          style={[
            styles.statusChip,
            { 
              backgroundColor: getStatusColor(user.status),
              height: responsive.getAdaptiveSize(24, 28),
            }
          ]}
        >
          {user.status}
        </Chip>
      </DataTable.Cell>
      <DataTable.Cell>
        <View style={styles.actionButtons}>
          <IconButton
            icon="eye"
            size={responsive.getAdaptiveSize(20, 24)}
            onPress={() => console.log(`Voir le profil de ${user.name}`)}
          />
          <IconButton
            icon={user.status === 'Actif' ? 'pause' : 'play'}
            size={responsive.getAdaptiveSize(20, 24)}
            iconColor={user.status === 'Actif' ? '#FF9800' : '#4CAF50'}
            onPress={() => toggleUserStatus(user.id, user.status)}
          />
        </View>
      </DataTable.Cell>
    </DataTable.Row>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[
          styles.header,
          { padding: responsive.getPadding('lg') }
        ]}>
          <Text 
            variant="headlineMedium" 
            style={[
              styles.title,
              { fontSize: responsive.getAdaptiveFontSize(24, 28) }
            ]}
          >
            Gestion des Utilisateurs
          </Text>
          <Text 
            variant="bodyMedium" 
            style={[
              styles.subtitle,
              { fontSize: responsive.getAdaptiveFontSize(14, 16) }
            ]}
          >
            {filteredUsers.length} utilisateur(s)
          </Text>
        </View>

        {/* Barre de recherche */}
        <Searchbar
          placeholder="Rechercher un utilisateur..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={[
            styles.searchBar,
            { 
              marginHorizontal: responsive.getMargin('lg'),
              marginBottom: responsive.getSpacing('lg'),
              borderRadius: responsive.getBorderRadius('lg'),
            }
          ]}
        />

        {/* Filtres par statut */}
        <View style={[
          styles.filtersContainer,
          { paddingHorizontal: responsive.getPadding('lg') }
        ]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {statusOptions.map((status) => (
              <Chip
                key={status.value}
                mode={selectedStatus === status.value ? 'flat' : 'outlined'}
                onPress={() => setSelectedStatus(status.value)}
                style={[
                  styles.filterChip,
                  { marginRight: responsive.getSpacing('sm') }
                ]}
              >
                {status.label}
              </Chip>
            ))}
          </ScrollView>
        </View>

        {/* Liste des utilisateurs */}
        <Card style={[
          styles.usersCard,
          { 
            marginHorizontal: responsive.getMargin('lg'),
            marginBottom: responsive.getSpacing('lg'),
            borderRadius: responsive.getBorderRadius('lg'),
          }
        ]}>
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>
                  <Text style={{ fontSize: responsive.getAdaptiveFontSize(14, 16) }}>
                    Utilisateur
                  </Text>
                </DataTable.Title>
                <DataTable.Title numeric>
                  <Text style={{ fontSize: responsive.getAdaptiveFontSize(14, 16) }}>
                    Commandes
                  </Text>
                </DataTable.Title>
                <DataTable.Title numeric>
                  <Text style={{ fontSize: responsive.getAdaptiveFontSize(14, 16) }}>
                    Total dépensé
                  </Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={{ fontSize: responsive.getAdaptiveFontSize(14, 16) }}>
                    Statut
                  </Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={{ fontSize: responsive.getAdaptiveFontSize(14, 16) }}>
                    Actions
                  </Text>
                </DataTable.Title>
              </DataTable.Header>

              {filteredUsers.map(renderUserRow)}
            </DataTable>
          </Card.Content>
        </Card>

        {/* Statistiques rapides */}
        <View style={[
          styles.statsContainer,
          { 
            paddingHorizontal: responsive.getPadding('lg'),
            gap: responsive.getSpacing('sm'),
          }
        ]}>
          <Card style={[
            styles.statCard,
            { borderRadius: responsive.getBorderRadius('lg') }
          ]}>
            <Card.Content>
              <Text 
                variant="titleLarge" 
                style={[
                  styles.statValue,
                  { fontSize: responsive.getAdaptiveFontSize(24, 28) }
                ]}
              >
                {users.length}
              </Text>
              <Text 
                variant="bodyMedium" 
                style={[
                  styles.statLabel,
                  { fontSize: responsive.getAdaptiveFontSize(14, 16) }
                ]}
              >
                Total utilisateurs
              </Text>
            </Card.Content>
          </Card>
          <Card style={[
            styles.statCard,
            { borderRadius: responsive.getBorderRadius('lg') }
          ]}>
            <Card.Content>
              <Text 
                variant="titleLarge" 
                style={[
                  styles.statValue,
                  { fontSize: responsive.getAdaptiveFontSize(24, 28) }
                ]}
              >
                {users.filter(u => u.status === 'Actif').length}
              </Text>
              <Text 
                variant="bodyMedium" 
                style={[
                  styles.statLabel,
                  { fontSize: responsive.getAdaptiveFontSize(14, 16) }
                ]}
              >
                Utilisateurs actifs
              </Text>
            </Card.Content>
          </Card>
          <Card style={[
            styles.statCard,
            { borderRadius: responsive.getBorderRadius('lg') }
          ]}>
            <Card.Content>
              <Text 
                variant="titleLarge" 
                style={[
                  styles.statValue,
                  { fontSize: responsive.getAdaptiveFontSize(24, 28) }
                ]}
              >
                {users.reduce((total, user) => total + user.totalSpent, 0).toLocaleString()} CFA
              </Text>
              <Text 
                variant="bodyMedium" 
                style={[
                  styles.statLabel,
                  { fontSize: responsive.getAdaptiveFontSize(14, 16) }
                ]}
              >
                Chiffre d'affaires
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Actions en masse */}
        <Card style={[
          styles.bulkActionsCard,
          { 
            marginHorizontal: responsive.getMargin('lg'),
            marginBottom: responsive.getSpacing('lg'),
            borderRadius: responsive.getBorderRadius('lg'),
          }
        ]}>
          <Card.Content>
            <Text 
              variant="titleMedium" 
              style={[
                styles.bulkActionsTitle,
                { fontSize: responsive.getAdaptiveFontSize(18, 20) }
              ]}
            >
              Actions en masse
            </Text>
            <View style={[
              styles.bulkActionsButtons,
              { gap: responsive.getSpacing('sm') }
            ]}>
              <Button
                mode="outlined"
                icon="email"
                style={[
                  styles.bulkActionButton,
                  { 
                    flex: 1,
                    height: responsive.getHeight('button'),
                    borderRadius: responsive.getBorderRadius('md'),
                  }
                ]}
                onPress={() => console.log('Envoyer email en masse')}
              >
                Email en masse
              </Button>
              <Button
                mode="outlined"
                icon="download"
                style={[
                  styles.bulkActionButton,
                  { 
                    flex: 1,
                    height: responsive.getHeight('button'),
                    borderRadius: responsive.getBorderRadius('md'),
                  }
                ]}
                onPress={() => console.log('Exporter les données')}
              >
                Exporter
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* FAB pour ajouter un utilisateur */}
      <FAB
        icon="plus"
        style={[
          styles.fab,
          { 
            margin: responsive.getMargin('md'),
            borderRadius: responsive.getBorderRadius('xl'),
          }
        ]}
        onPress={() => console.log('Ajouter un utilisateur')}
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
  usersCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 3,
  },
  userCell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
  },
  userEmail: {
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
  bulkActionsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
  },
  bulkActionsTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  bulkActionsButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  bulkActionButton: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 