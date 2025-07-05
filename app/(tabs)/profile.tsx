import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Card, Avatar, Button, List, Switch, Divider, useTheme, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeMode } from '@/contexts/ThemeContext';

// Mock data pour l'utilisateur
const userProfile = {
  name: 'Jean Dupont',
  email: 'jean.dupont@email.com',
  phone: '+33 6 12 34 56 78',
  avatar: 'https://via.placeholder.com/100',
  address: '123 Rue de la Paix, 75001 Paris',
  memberSince: 'Janvier 2024',
  totalOrders: 12,
  totalSpent: 2345.67,
};

// Mock data pour les commandes récentes
const recentOrders = [
  {
    id: '#ORD-2024-001',
    date: '2024-01-15',
    status: 'Livrée',
    total: 129.99,
    items: ['iPhone 15 Pro', 'Coque de protection'],
  },
  {
    id: '#ORD-2024-002',
    date: '2024-01-10',
    status: 'En cours',
    total: 89.50,
    items: ['Nike Air Max', 'Chaussettes sport'],
  },
  {
    id: '#ORD-2024-003',
    date: '2024-01-05',
    status: 'Livrée',
    total: 45.99,
    items: ['Livre "React Native"'],
  },
];

export default function ProfileScreen() {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useThemeMode();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(isDark);
  const [locationEnabled, setLocationEnabled] = useState(true);

  // Synchroniser le mode sombre avec le contexte
  useEffect(() => {
    setDarkModeEnabled(isDark);
  }, [isDark]);

  const handleLogout = () => {
    logout();
    router.replace('/(tabs)');
  };

  const handleToggleNotifications = (value: boolean) => {
    setNotificationsEnabled(value);
    if (value) {
      Alert.alert('Notifications', 'Les notifications sont maintenant activées');
    }
  };

  const handleToggleDarkMode = (value: boolean) => {
    setDarkModeEnabled(value);
    toggleTheme();
  };

  const handleToggleLocation = (value: boolean) => {
    setLocationEnabled(value);
    if (value) {
      Alert.alert('Localisation', 'L\'accès à la localisation est maintenant activé');
    }
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header du profil */}
        <Card style={[styles.profileCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Image 
              size={80} 
              source={{ uri: userProfile.avatar }} 
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text variant="headlineSmall" style={[styles.profileName, { color: theme.colors.onSurface }]}>
                {userProfile.name}
              </Text>
              <Text variant="bodyMedium" style={[styles.profileEmail, { color: theme.colors.onSurfaceVariant }]}>
                {userProfile.email}
              </Text>
              <Text variant="bodySmall" style={[styles.profileMember, { color: theme.colors.onSurfaceVariant }]}>
                Membre depuis {userProfile.memberSince}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Statistiques */}
        <View style={styles.statsContainer}>
          <Card style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Text variant="titleLarge" style={[styles.statNumber, { color: theme.colors.primary }]}>
                {userProfile.totalOrders}
              </Text>
              <Text variant="bodyMedium" style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                Commandes
              </Text>
            </Card.Content>
          </Card>
          
          <Card style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Text variant="titleLarge" style={[styles.statNumber, { color: theme.colors.primary }]}>
                {userProfile.totalSpent.toLocaleString()} CFA
              </Text>
              <Text variant="bodyMedium" style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                Total dépensé
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Informations personnelles */}
        <Card style={[styles.sectionCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                Informations personnelles
              </Text>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => router.push('/edit-profile')}
                iconColor={theme.colors.primary}
              />
            </View>
            
            <List.Item
              title="Nom complet"
              description={userProfile.name}
              left={(props) => <List.Icon {...props} icon="account" />}
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            />
            
            <List.Item
              title="Email"
              description={userProfile.email}
              left={(props) => <List.Icon {...props} icon="email" />}
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            />
            
            <List.Item
              title="Téléphone"
              description={userProfile.phone}
              left={(props) => <List.Icon {...props} icon="phone" />}
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            />
            
            <List.Item
              title="Adresse"
              description={userProfile.address}
              left={(props) => <List.Icon {...props} icon="map-marker" />}
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            />
          </Card.Content>
        </Card>

        {/* Commandes récentes */}
        <Card style={[styles.sectionCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Commandes récentes
            </Text>
            
            {recentOrders.map((order, index) => (
              <View key={order.id}>
                <List.Item
                  title={order.id}
                  description={`${order.date} • ${order.items.join(', ')}`}
                  right={() => (
                    <View style={styles.orderRight}>
                      <Text variant="bodyMedium" style={[styles.orderTotal, { color: theme.colors.onSurface }]}>
                        {order.total.toLocaleString()} CFA
                      </Text>
                      <Text variant="bodySmall" style={[styles.orderStatus, { color: getStatusColor(order.status) }]}>
                        {order.status}
                      </Text>
                    </View>
                  )}
                  titleStyle={{ color: theme.colors.onSurface }}
                  descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
                />
                {index < recentOrders.length - 1 && <Divider />}
              </View>
            ))}
            
            <Button
              mode="outlined"
              onPress={() => router.push('/orders')}
              style={styles.viewAllButton}
            >
              Voir toutes les commandes
            </Button>
          </Card.Content>
        </Card>

        {/* Paramètres */}
        <Card style={[styles.sectionCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Paramètres
            </Text>
            
            <List.Item
              title="Notifications push"
              description="Recevoir les notifications"
              left={(props) => <List.Icon {...props} icon="bell" />}
              right={() => (
                <Switch
                  value={notificationsEnabled}
                  onValueChange={handleToggleNotifications}
                />
              )}
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            />
            
            <List.Item
              title="Mode sombre"
              description="Activer le thème sombre"
              left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => (
                <Switch
                  value={darkModeEnabled}
                  onValueChange={handleToggleDarkMode}
                />
              )}
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            />
            
            <List.Item
              title="Localisation"
              description="Autoriser l'accès à la localisation"
              left={(props) => <List.Icon {...props} icon="map-marker" />}
              right={() => (
                <Switch
                  value={locationEnabled}
                  onValueChange={handleToggleLocation}
                />
              )}
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            />
          </Card.Content>
        </Card>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <Button
            mode="outlined"
            icon="cog"
            onPress={() => console.log('Paramètres avancés')}
            style={styles.actionButton}
          >
            Paramètres avancés
          </Button>
          
          <Button
            mode="outlined"
            icon="help-circle"
            onPress={() => console.log('Aide et support')}
            style={styles.actionButton}
          >
            Aide et support
          </Button>
          
          <Button
            mode="outlined"
            icon="logout"
            onPress={handleLogout}
            style={[styles.actionButton, styles.logoutButton]}
            textColor={theme.colors.error}
          >
            Se déconnecter
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    margin: 20,
    elevation: 3,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    marginBottom: 5,
  },
  profileMember: {
    fontStyle: 'italic',
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
  statNumber: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statLabel: {
    textAlign: 'center',
    marginTop: 5,
  },
  sectionCard: {
    margin: 20,
    marginTop: 0,
    elevation: 3,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderTotal: {
    fontWeight: 'bold',
  },
  orderStatus: {
    fontWeight: '500',
  },
  viewAllButton: {
    marginTop: 15,
  },
  actionsContainer: {
    padding: 20,
    gap: 10,
  },
  actionButton: {
    marginBottom: 5,
  },
  logoutButton: {
    borderColor: '#F44336',
  },
}); 