import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button, Card, IconButton, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function EditProfileScreen() {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Côte d\'Ivoire',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
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

  const handleSave = async () => {
    if (!profileData.firstName.trim() || !profileData.lastName.trim() || !profileData.email.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      Alert.alert('Erreur', 'Veuillez saisir une adresse email valide');
      return;
    }

    setIsLoading(true);

    try {
      // Mettre à jour les données utilisateur
      updateUser({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.address,
        city: profileData.city,
        postalCode: profileData.postalCode,
        country: profileData.country,
      });

      Alert.alert('Succès', 'Profil mis à jour avec succès', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de mettre à jour le profil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec bouton de retour */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
        />
        <Text variant="titleLarge" style={styles.headerTitle}>
          Modifier le profil
        </Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Photo de profil */}
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Image 
              size={80} 
              source={{ uri: user?.avatar || 'https://via.placeholder.com/100' }} 
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text variant="titleMedium" style={styles.profileName}>
                {profileData.firstName} {profileData.lastName}
              </Text>
              <Text variant="bodyMedium" style={styles.profileEmail}>
                {profileData.email}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Formulaire */}
        <Card style={styles.formCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.formTitle}>
              Informations personnelles
            </Text>

            <View style={styles.formRow}>
              <TextInput
                label="Prénom *"
                value={profileData.firstName}
                onChangeText={(text) => setProfileData({...profileData, firstName: text})}
                mode="outlined"
                style={styles.halfInput}
              />
              <TextInput
                label="Nom *"
                value={profileData.lastName}
                onChangeText={(text) => setProfileData({...profileData, lastName: text})}
                mode="outlined"
                style={styles.halfInput}
              />
            </View>

            <TextInput
              label="Email *"
              value={profileData.email}
              onChangeText={(text) => setProfileData({...profileData, email: text})}
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              label="Téléphone"
              value={profileData.phone}
              onChangeText={(text) => setProfileData({...profileData, phone: text})}
              mode="outlined"
              style={styles.input}
              keyboardType="phone-pad"
            />

            <TextInput
              label="Adresse"
              value={profileData.address}
              onChangeText={(text) => setProfileData({...profileData, address: text})}
              mode="outlined"
              style={styles.input}
              multiline
              numberOfLines={3}
            />

            <View style={styles.formRow}>
              <TextInput
                label="Ville"
                value={profileData.city}
                onChangeText={(text) => setProfileData({...profileData, city: text})}
                mode="outlined"
                style={styles.halfInput}
              />
              <TextInput
                label="Code postal"
                value={profileData.postalCode}
                onChangeText={(text) => setProfileData({...profileData, postalCode: text})}
                mode="outlined"
                style={styles.halfInput}
                keyboardType="numeric"
              />
            </View>

            <TextInput
              label="Pays"
              value={profileData.country}
              onChangeText={(text) => setProfileData({...profileData, country: text})}
              mode="outlined"
              style={styles.input}
            />
          </Card.Content>
        </Card>

        {/* Boutons d'action */}
        <View style={styles.actionsContainer}>
          <Button
            mode="contained"
            onPress={handleSave}
            loading={isLoading}
            disabled={isLoading}
            style={styles.saveButton}
            icon="content-save"
          >
            Sauvegarder
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => router.back()}
            style={styles.cancelButton}
            icon="close"
          >
            Annuler
          </Button>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  profileCard: {
    marginBottom: 20,
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
    color: '#2c3e50',
  },
  profileEmail: {
    color: '#7f8c8d',
  },
  formCard: {
    marginBottom: 20,
    elevation: 3,
  },
  formTitle: {
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
  actionsContainer: {
    gap: 10,
  },
  saveButton: {
    marginBottom: 5,
  },
  cancelButton: {
    marginBottom: 5,
  },
}); 