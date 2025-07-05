import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import { Text, TextInput, Button, Card, Chip, Divider, Checkbox, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const { width } = Dimensions.get('window');

// Mock data pour le panier
const cartItems = [
  {
    id: 1,
    name: 'T-shirt Premium Cotton',
    price: 25000,
    quantity: 1,
    image: 'https://via.placeholder.com/60',
  },
  {
    id: 2,
    name: 'Jeans Slim Fit',
    price: 45000,
    quantity: 2,
    image: 'https://via.placeholder.com/60',
  },
];

const deliveryOptions = [
  { id: 'standard', name: 'Livraison standard', price: 2500, time: '3-5 jours' },
  { id: 'express', name: 'Livraison express', price: 5000, time: '1-2 jours' },
  { id: 'premium', name: 'Livraison premium', price: 8000, time: 'Même jour' },
];

export default function CheckoutScreen() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Côte d\'Ivoire',
  });
  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Pré-remplir les données si l'utilisateur est connecté
  useEffect(() => {
    if (user) {
      setDeliveryInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
        country: user.country || 'Côte d\'Ivoire',
      });
    }
  }, [user]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDeliveryOption = () => {
    return deliveryOptions.find(option => option.id === selectedDelivery);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const delivery = getDeliveryOption()?.price || 0;
    return subtotal + delivery;
  };

  const validateStep = (currentStep: number) => {
    const newErrors: {[key: string]: string} = {};

    if (currentStep === 1) {
      if (!deliveryInfo.firstName.trim()) newErrors.firstName = 'Le prénom est obligatoire';
      if (!deliveryInfo.lastName.trim()) newErrors.lastName = 'Le nom est obligatoire';
      if (!deliveryInfo.email.trim()) newErrors.email = 'L\'email est obligatoire';
      else if (!/\S+@\S+\.\S+/.test(deliveryInfo.email)) newErrors.email = 'Email invalide';
      if (!deliveryInfo.phone.trim()) newErrors.phone = 'Le téléphone est obligatoire';
      if (!deliveryInfo.address.trim()) newErrors.address = 'L\'adresse est obligatoire';
      if (!deliveryInfo.city.trim()) newErrors.city = 'La ville est obligatoire';
      if (!deliveryInfo.postalCode.trim()) newErrors.postalCode = 'Le code postal est obligatoire';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmitOrder = async () => {
    if (!acceptTerms) {
      Alert.alert('Erreur', 'Veuillez accepter les conditions générales');
      return;
    }

    setIsLoading(true);
    
    // Simulation de la soumission de commande
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    
    // Navigation vers la confirmation
    router.push('/order-confirmation');
  };

  const handleGoBack = () => {
    router.back();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <IconButton
        icon="arrow-left"
        size={24}
        onPress={handleGoBack}
        iconColor="#2c3e50"
      />
      <Text variant="titleLarge" style={styles.headerTitle}>
        Finaliser la commande
      </Text>
      <View style={{ width: 48 }} />
    </View>
  );

  const renderDeliveryForm = () => (
    <View style={styles.stepContainer}>
      <Text variant="titleLarge" style={styles.stepTitle}>
        Informations de livraison
      </Text>
      
      {user && (
        <Chip mode="outlined" style={styles.userInfoChip}>
          Connecté en tant que {user.firstName} {user.lastName}
        </Chip>
      )}
      
      <View style={styles.formRow}>
        <TextInput
          label="Prénom *"
          value={deliveryInfo.firstName}
          onChangeText={(text) => {
            setDeliveryInfo({...deliveryInfo, firstName: text});
            if (errors.firstName) setErrors({...errors, firstName: ''});
          }}
          mode="outlined"
          style={styles.halfInput}
          error={!!errors.firstName}
          right={errors.firstName ? <TextInput.Icon icon="alert" /> : undefined}
        />
        <TextInput
          label="Nom *"
          value={deliveryInfo.lastName}
          onChangeText={(text) => {
            setDeliveryInfo({...deliveryInfo, lastName: text});
            if (errors.lastName) setErrors({...errors, lastName: ''});
          }}
          mode="outlined"
          style={styles.halfInput}
          error={!!errors.lastName}
          right={errors.lastName ? <TextInput.Icon icon="alert" /> : undefined}
        />
      </View>

      <TextInput
        label="Email *"
        value={deliveryInfo.email}
        onChangeText={(text) => {
          setDeliveryInfo({...deliveryInfo, email: text});
          if (errors.email) setErrors({...errors, email: ''});
        }}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        error={!!errors.email}
        right={errors.email ? <TextInput.Icon icon="alert" /> : undefined}
      />

      <TextInput
        label="Téléphone *"
        value={deliveryInfo.phone}
        onChangeText={(text) => {
          setDeliveryInfo({...deliveryInfo, phone: text});
          if (errors.phone) setErrors({...errors, phone: ''});
        }}
        mode="outlined"
        style={styles.input}
        keyboardType="phone-pad"
        error={!!errors.phone}
        right={errors.phone ? <TextInput.Icon icon="alert" /> : undefined}
      />

      <TextInput
        label="Adresse *"
        value={deliveryInfo.address}
        onChangeText={(text) => {
          setDeliveryInfo({...deliveryInfo, address: text});
          if (errors.address) setErrors({...errors, address: ''});
        }}
        mode="outlined"
        style={styles.input}
        multiline
        numberOfLines={3}
        error={!!errors.address}
        right={errors.address ? <TextInput.Icon icon="alert" /> : undefined}
      />

      <View style={styles.formRow}>
        <TextInput
          label="Ville *"
          value={deliveryInfo.city}
          onChangeText={(text) => {
            setDeliveryInfo({...deliveryInfo, city: text});
            if (errors.city) setErrors({...errors, city: ''});
          }}
          mode="outlined"
          style={styles.halfInput}
          error={!!errors.city}
          right={errors.city ? <TextInput.Icon icon="alert" /> : undefined}
        />
        <TextInput
          label="Code postal *"
          value={deliveryInfo.postalCode}
          onChangeText={(text) => {
            setDeliveryInfo({...deliveryInfo, postalCode: text});
            if (errors.postalCode) setErrors({...errors, postalCode: ''});
          }}
          mode="outlined"
          style={styles.halfInput}
          keyboardType="numeric"
          error={!!errors.postalCode}
          right={errors.postalCode ? <TextInput.Icon icon="alert" /> : undefined}
        />
      </View>
    </View>
  );

  const renderDeliveryOptions = () => (
    <View style={styles.stepContainer}>
      <Text variant="titleLarge" style={styles.stepTitle}>
        Options de livraison
      </Text>
      
      {deliveryOptions.map((option) => (
        <Card
          key={option.id}
          style={[
            styles.deliveryCard,
            selectedDelivery === option.id && styles.selectedDeliveryCard
          ]}
          onPress={() => setSelectedDelivery(option.id)}
        >
          <Card.Content>
            <View style={styles.deliveryOption}>
              <View style={styles.deliveryInfo}>
                <Text variant="titleMedium" style={styles.deliveryName}>
                  {option.name}
                </Text>
                <Text variant="bodyMedium" style={styles.deliveryTime}>
                  {option.time}
                </Text>
              </View>
              <Text variant="titleMedium" style={styles.deliveryPrice}>
                {option.price.toLocaleString()} CFA
              </Text>
            </View>
          </Card.Content>
        </Card>
      ))}
    </View>
  );

  const renderOrderSummary = () => (
    <View style={styles.stepContainer}>
      <Text variant="titleLarge" style={styles.stepTitle}>
        Récapitulatif de la commande
      </Text>
      
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.summaryTitle}>
            Articles commandés
          </Text>
          
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.itemInfo}>
                <Text variant="bodyMedium" style={styles.itemName}>
                  {item.name}
                </Text>
                <Text variant="bodySmall" style={styles.itemQuantity}>
                  Quantité: {item.quantity}
                </Text>
              </View>
              <Text variant="bodyMedium" style={styles.itemPrice}>
                {(item.price * item.quantity).toLocaleString()} CFA
              </Text>
            </View>
          ))}
          
          <Divider style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">Sous-total</Text>
            <Text variant="bodyMedium">{calculateSubtotal().toLocaleString()} CFA</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">Livraison</Text>
            <Text variant="bodyMedium">{getDeliveryOption()?.price.toLocaleString()} CFA</Text>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text variant="titleMedium" style={styles.totalLabel}>
              Total
            </Text>
            <Text variant="titleMedium" style={styles.totalAmount}>
              {calculateTotal().toLocaleString()} CFA
            </Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.termsContainer}>
        <Checkbox
          status={acceptTerms ? 'checked' : 'unchecked'}
          onPress={() => setAcceptTerms(!acceptTerms)}
        />
        <Text variant="bodySmall" style={styles.termsText}>
          J'accepte les conditions générales de vente et la politique de confidentialité
        </Text>
      </View>
    </View>
  );

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((stepNumber) => (
        <View key={stepNumber} style={styles.stepDot}>
          <View style={[
            styles.dot,
            step >= stepNumber && styles.activeDot
          ]} />
          <Text variant="bodySmall" style={styles.stepLabel}>
            {stepNumber === 1 ? 'Livraison' : stepNumber === 2 ? 'Options' : 'Récapitulatif'}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderStepIndicator()}
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {step === 1 && renderDeliveryForm()}
        {step === 2 && renderDeliveryOptions()}
        {step === 3 && renderOrderSummary()}
      </ScrollView>

      {/* Navigation des étapes */}
      <View style={styles.bottomActions}>
        {step > 1 && (
          <Button
            mode="outlined"
            onPress={handlePreviousStep}
            style={styles.navButton}
            icon="arrow-left"
          >
            Précédent
          </Button>
        )}
        
        {step < 3 ? (
          <Button
            mode="contained"
            onPress={handleNextStep}
            style={styles.navButton}
            icon="arrow-right"
          >
            Suivant
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={handleSubmitOrder}
            loading={isLoading}
            disabled={isLoading || !acceptTerms}
            style={styles.submitButton}
            icon="check"
          >
            Confirmer la commande
          </Button>
        )}
      </View>
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
  userInfoChip: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  stepDot: {
    alignItems: 'center',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#bdc3c7',
    marginBottom: 5,
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
  stepLabel: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  stepContainer: {
    padding: 20,
  },
  stepTitle: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  formRow: {
    flexDirection: 'row',
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  input: {
    marginBottom: 15,
  },
  deliveryCard: {
    marginBottom: 10,
    elevation: 2,
  },
  selectedDeliveryCard: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  deliveryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryName: {
    fontWeight: 'bold',
  },
  deliveryTime: {
    color: '#7f8c8d',
  },
  deliveryPrice: {
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  summaryCard: {
    elevation: 3,
  },
  summaryTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  cartItem: {
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
    color: '#7f8c8d',
  },
  itemPrice: {
    fontWeight: 'bold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totalLabel: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  totalAmount: {
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  divider: {
    marginVertical: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  termsText: {
    flex: 1,
    marginLeft: 10,
    color: '#7f8c8d',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    gap: 10,
  },
  navButton: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
  },
}); 