import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Card, Button, IconButton, useTheme, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data pour le suivi de commande
const orderTracking = {
  id: '#ORD-2024-001',
  status: 'En transit',
  estimatedDelivery: '2024-01-18',
  currentStep: 3,
  steps: [
    {
      id: 1,
      title: 'Commande confirmée',
      description: 'Votre commande a été confirmée et est en cours de préparation',
      status: 'completed',
      date: '2024-01-15 14:30',
      icon: 'check-circle',
    },
    {
      id: 2,
      title: 'En préparation',
      description: 'Votre commande est en cours de préparation dans notre entrepôt',
      status: 'completed',
      date: '2024-01-16 09:15',
      icon: 'package-variant',
    },
    {
      id: 3,
      title: 'En transit',
      description: 'Votre commande est en route vers votre adresse de livraison',
      status: 'current',
      date: '2024-01-17 11:45',
      icon: 'truck',
    },
    {
      id: 4,
      title: 'Livraison',
      description: 'Votre commande sera livrée à votre adresse',
      status: 'pending',
      date: '2024-01-18 14:00',
      icon: 'home',
    },
  ],
  delivery: {
    method: 'Livraison express',
    estimatedDate: '2024-01-18',
    estimatedTime: '14:00 - 16:00',
    address: '123 Rue de la Paix, 75001 Paris',
    driver: 'Jean Martin',
    phone: '06 12 34 56 78',
  },
  items: [
    { name: 'T-shirt Premium Cotton', quantity: 1, price: 25000 },
    { name: 'Jeans Slim Fit', quantity: 2, price: 45000 },
  ],
};

export default function OrderTrackingScreen() {
  const theme = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshTracking = () => {
    setIsRefreshing(true);
    // Simulation de mise à jour
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const contactDriver = () => {
    // Simulation d'appel au chauffeur
    console.log('Appeler le chauffeur:', orderTracking.delivery.phone);
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'current':
        return '#2196F3';
      case 'pending':
        return '#9E9E9E';
      default:
        return '#9E9E9E';
    }
  };

  const getStepIconColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'current':
        return '#2196F3';
      case 'pending':
        return '#9E9E9E';
      default:
        return '#9E9E9E';
    }
  };

  const renderTrackingStep = (step: any, index: number) => (
    <View key={step.id} style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <View style={styles.stepIconContainer}>
          <IconButton
            icon={step.icon}
            size={24}
            iconColor={getStepIconColor(step.status)}
            style={[
              styles.stepIcon,
              { backgroundColor: step.status === 'current' ? '#E3F2FD' : 'transparent' }
            ]}
          />
          {index < orderTracking.steps.length - 1 && (
            <View style={[
              styles.stepLine,
              { backgroundColor: step.status === 'completed' ? '#4CAF50' : '#E0E0E0' }
            ]} />
          )}
        </View>
        <View style={styles.stepContent}>
          <Text variant="titleMedium" style={[
            styles.stepTitle,
            { color: step.status === 'pending' ? theme.colors.onSurfaceVariant : theme.colors.onSurface }
          ]}>
            {step.title}
          </Text>
          <Text variant="bodySmall" style={[
            styles.stepDescription,
            { color: theme.colors.onSurfaceVariant }
          ]}>
            {step.description}
          </Text>
          <Text variant="bodySmall" style={[
            styles.stepDate,
            { color: theme.colors.onSurfaceVariant }
          ]}>
            {step.date}
          </Text>
        </View>
        <Chip
          mode="outlined"
          style={[
            styles.statusChip,
            { backgroundColor: getStepStatusColor(step.status) }
          ]}
        >
          {step.status === 'completed' ? 'Terminé' : 
           step.status === 'current' ? 'En cours' : 'En attente'}
        </Chip>
      </View>
    </View>
  );

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
          Suivi de commande
        </Text>
        <IconButton
          icon="refresh"
          size={24}
          onPress={refreshTracking}
          loading={isRefreshing}
          iconColor={theme.colors.onSurface}
        />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Informations de la commande */}
        <Card style={[styles.orderCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
              Commande #{orderTracking.id}
            </Text>
            
            <View style={styles.orderInfo}>
              <View style={styles.infoRow}>
                <Text variant="bodyMedium" style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Statut
                </Text>
                <Chip
                  mode="outlined"
                  style={[styles.statusChip, { backgroundColor: '#2196F3' }]}
                >
                  {orderTracking.status}
                </Chip>
              </View>
              
              <View style={styles.infoRow}>
                <Text variant="bodyMedium" style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Livraison estimée
                </Text>
                <Text variant="bodyMedium" style={[styles.infoValue, { color: theme.colors.onSurface }]}>
                  {orderTracking.estimatedDelivery}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Étapes de suivi */}
        <Card style={[styles.trackingCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
              Progression de la livraison
            </Text>
            
            <View style={styles.stepsContainer}>
              {orderTracking.steps.map((step, index) => renderTrackingStep(step, index))}
            </View>
          </Card.Content>
        </Card>

        {/* Informations de livraison */}
        <Card style={[styles.deliveryCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
              Détails de livraison
            </Text>
            
            <View style={styles.deliveryInfo}>
              <View style={styles.deliveryRow}>
                <Text variant="bodyMedium" style={[styles.deliveryLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Méthode
                </Text>
                <Text variant="bodyMedium" style={[styles.deliveryValue, { color: theme.colors.onSurface }]}>
                  {orderTracking.delivery.method}
                </Text>
              </View>
              
              <View style={styles.deliveryRow}>
                <Text variant="bodyMedium" style={[styles.deliveryLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Heure estimée
                </Text>
                <Text variant="bodyMedium" style={[styles.deliveryValue, { color: theme.colors.onSurface }]}>
                  {orderTracking.delivery.estimatedTime}
                </Text>
              </View>
              
              <View style={styles.deliveryRow}>
                <Text variant="bodyMedium" style={[styles.deliveryLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Adresse
                </Text>
                <Text variant="bodyMedium" style={[styles.deliveryValue, { color: theme.colors.onSurface }]}>
                  {orderTracking.delivery.address}
                </Text>
              </View>
              
              <View style={styles.deliveryRow}>
                <Text variant="bodyMedium" style={[styles.deliveryLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Chauffeur
                </Text>
                <Text variant="bodyMedium" style={[styles.deliveryValue, { color: theme.colors.onSurface }]}>
                  {orderTracking.delivery.driver}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <Button
            mode="contained"
            icon="phone"
            onPress={contactDriver}
            style={styles.actionButton}
          >
            Contacter le chauffeur
          </Button>
          
          <Button
            mode="outlined"
            icon="map-marker"
            onPress={() => console.log('Voir la carte')}
            style={styles.actionButton}
          >
            Voir sur la carte
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
  orderCard: {
    marginBottom: 20,
    elevation: 3,
  },
  trackingCard: {
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
  statusChip: {
    height: 24,
  },
  stepsContainer: {
    gap: 20,
  },
  stepContainer: {
    marginBottom: 10,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepIconContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  stepIcon: {
    margin: 0,
  },
  stepLine: {
    width: 2,
    height: 30,
    marginTop: 5,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stepDescription: {
    marginBottom: 4,
  },
  stepDate: {
    fontSize: 12,
  },
  deliveryInfo: {
    gap: 10,
  },
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryLabel: {
    flex: 1,
  },
  deliveryValue: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
  actionsContainer: {
    gap: 10,
  },
  actionButton: {
    marginBottom: 5,
  },
}); 